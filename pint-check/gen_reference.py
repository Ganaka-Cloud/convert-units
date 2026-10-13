#!/usr/bin/env python3
"""Generate pint-check/reference.json from pint-check/unit-map.json.

Linear measures record each unit's factor to SI base units; test/pint.js checks
every unit pair against the ratio of those factors. Measures with an offset or
logarithmic unit record explicit conversions at several values instead.

Usage: python -I pint-check/gen_reference.py   (pint pinned in requirements.txt)
"""

import json
import sys
from pathlib import Path

import pint

HERE = Path(__file__).resolve().parent
MAP_PATH = HERE / "unit-map.json"
OUT_PATH = HERE / "reference.json"

# Spread around the temperature and log zero points; small enough that e**(2v) (neper) stays finite.
NONLINEAR_VALUES = [-40, 0, 1, 37.5, 100]

ureg = pint.UnitRegistry()
Q_ = ureg.Quantity


def pint_expr(spec):
    return spec if isinstance(spec, str) else spec.get("pint")


def main():
    unit_map = json.loads(MAP_PATH.read_text(encoding="utf-8"))
    errors = []
    measures = {}

    for measure, units in unit_map["measures"].items():
        parsed = {}
        for abbr, spec in units.items():
            expr = pint_expr(spec)
            if expr is None:
                continue
            try:
                parsed[abbr] = Q_(expr)
            except Exception as e:
                errors.append(f"{measure}/{abbr}: cannot parse {expr!r}: {e}")
        if not parsed:
            continue

        if all(q._is_multiplicative for q in parsed.values()):
            factors, base = {}, None
            for abbr, q in parsed.items():
                b = q.to_base_units()
                if base is None:
                    base = b.units
                elif b.units != base:
                    errors.append(f"{measure}/{abbr}: base units {b.units} differ from {base}")
                    continue
                factors[abbr] = float(b.magnitude)
            measures[measure] = {"base": str(base), "factors": factors}
        else:
            cases = []
            for a, qa in parsed.items():
                for b, qb in parsed.items():
                    for v in NONLINEAR_VALUES:
                        try:
                            r = Q_(v * qa.magnitude, qa.units).to(qb.units).magnitude / qb.magnitude
                        except Exception as e:
                            errors.append(f"{measure}: {a} -> {b}: {e}")
                            continue
                        cases.append([a, b, v, float(r)])
            measures[measure] = {"cases": cases}

    if errors:
        print("\n".join(errors), file=sys.stderr)
        sys.exit(1)

    out = {"pint": pint.__version__, "measures": measures}
    OUT_PATH.write_text(json.dumps(out, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
    n_units = sum(len(m.get("factors", {})) for m in measures.values())
    n_cases = sum(len(m.get("cases", [])) for m in measures.values())
    print(f"pint {pint.__version__}: {len(measures)} measures, {n_units} linear units, {n_cases} nonlinear cases")


if __name__ == "__main__":
    main()
