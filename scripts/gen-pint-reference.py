#!/usr/bin/env python3
"""
gen-pint-reference.py
Generates scripts/pint-reference.json by computing 1 unit → anchor conversions
using Python's Pint library for overlapping units with convert-units.

Usage:
    pip install pint
    python scripts/gen-pint-reference.py
"""

import json
import os

try:
    import pint
except ImportError:
    print("ERROR: pint not installed. Run: pip install pint")
    raise SystemExit(1)

ureg = pint.UnitRegistry()
Q_ = ureg.Quantity

# Map of convert-units abbreviations to pint unit names and their anchor (SI base unit).
# Format: abbr -> (pint_unit_name, anchor_pint_unit, anchor_abbr_in_convert_units)
OVERLAPPING_UNITS = {
    # Length (anchor: m)
    "nm": ("nanometer", "meter", "m"),
    "μm": ("micrometer", "meter", "m"),
    "mm": ("millimeter", "meter", "m"),
    "cm": ("centimeter", "meter", "m"),
    "m":  ("meter",      "meter", "m"),
    "km": ("kilometer",  "meter", "m"),

    # Mass (anchor: g)
    "mcg": ("microgram",  "gram", "g"),
    "mg":  ("milligram",  "gram", "g"),
    "g":   ("gram",       "gram", "g"),
    "kg":  ("kilogram",   "gram", "g"),
    "mt":  ("metric_ton", "gram", "g"),
    "oz":  ("ounce",      "gram", "g"),
    "lb":  ("pound",      "gram", "g"),
    "t":   ("short_ton",  "gram", "g"),

    # Pressure (anchor: Pa)
    "Pa":   ("pascal",              "pascal", "Pa"),
    "kPa":  ("kilopascal",          "pascal", "Pa"),
    "MPa":  ("megapascal",          "pascal", "Pa"),
    "hPa":  ("hectopascal",         "pascal", "Pa"),
    "bar":  ("bar",                 "pascal", "Pa"),
    "psi":  ("psi",                 "pascal", "Pa"),
    "atm":  ("atmosphere",          "pascal", "Pa"),

    # Energy (anchor: J)
    "mJ":   ("millijoule",         "joule", "J"),
    "J":    ("joule",              "joule", "J"),
    "kJ":   ("kilojoule",          "joule", "J"),
    "MJ":   ("megajoule",          "joule", "J"),
    "GJ":   ("gigajoule",          "joule", "J"),
    "Wh":   ("watt_hour",          "joule", "J"),
    "kWh":  ("kilowatt_hour",      "joule", "J"),
    "cal":  ("calorie",            "joule", "J"),
    "kcal": ("kilocalorie",        "joule", "J"),

    # Force (anchor: N)
    "mN":   ("millinewton",        "newton", "N"),
    "N":    ("newton",             "newton", "N"),
    "kN":   ("kilonewton",         "newton", "N"),
    "MN":   ("meganewton",         "newton", "N"),
    "lbf":  ("pound_force",        "newton", "N"),

    # Power (anchor: W)
    "mW":   ("milliwatt",          "watt", "W"),
    "W":    ("watt",               "watt", "W"),
    "kW":   ("kilowatt",           "watt", "W"),
    "MW":   ("megawatt",           "watt", "W"),
    "GW":   ("gigawatt",           "watt", "W"),

    # Frequency (anchor: Hz)
    "mHz":  ("millihertz",         "hertz", "Hz"),
    "Hz":   ("hertz",              "hertz", "Hz"),
    "kHz":  ("kilohertz",          "hertz", "Hz"),
    "MHz":  ("megahertz",          "hertz", "Hz"),
    "GHz":  ("gigahertz",          "hertz", "Hz"),
    "THz":  ("terahertz",          "hertz", "Hz"),

    # Time (anchor: s)
    "ns":   ("nanosecond",         "second", "s"),
    "μs":   ("microsecond",        "second", "s"),
    "ms":   ("millisecond",        "second", "s"),
    "s":    ("second",             "second", "s"),
    "min":  ("minute",             "second", "s"),
    "h":    ("hour",               "second", "s"),
    "d":    ("day",                "second", "s"),

    # Angle (anchor: rad)
    "rad":  ("radian",             "radian", "rad"),
    "deg":  ("degree",             "radian", "rad"),
    "arcmin": ("arcminute",        "radian", "rad"),
    "arcsec": ("arcsecond",        "radian", "rad"),
}

results = {}

for abbr, (pint_name, anchor_pint, anchor_abbr) in OVERLAPPING_UNITS.items():
    try:
        val = Q_(1, pint_name).to(anchor_pint).magnitude
        results[abbr] = {
            "pint_unit": pint_name,
            "anchor_unit": anchor_abbr,
            "anchor_pint": anchor_pint,
            "to_anchor": val,
        }
    except Exception as e:
        results[abbr] = {
            "pint_unit": pint_name,
            "anchor_unit": anchor_abbr,
            "anchor_pint": anchor_pint,
            "to_anchor": None,
            "error": str(e),
        }

output_path = os.path.join(os.path.dirname(__file__), "pint-reference.json")
with open(output_path, "w") as f:
    json.dump(results, f, indent=2)

print("Generated scripts/pint-reference.json with {} units".format(len(results)))
