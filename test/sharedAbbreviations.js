"use strict";
var convert = require("../lib"),
  assert = require("assert"),
  fs = require("fs"),
  path = require("path"),
  shared = require("../scripts/sharedAbbreviations"),
  tests = {};

function close(expected, actual, msg) {
  assert.ok(Math.abs(actual - expected) / Math.abs(expected) < 1e-12, msg + ": expected " + expected + ", got " + actual);
}

// Cross-measure sharing is a decision: every shared abbreviation is listed in
// scripts/sharedAbbreviations.js, and nothing else is shared.
tests["exactly the listed abbreviations are shared between measures"] = function () {
  var byAbbr = {};
  convert()
    .list()
    .forEach(function (u) {
      var l = (byAbbr[u.abbr] = byAbbr[u.abbr] || []);
      if (l.indexOf(u.measure) < 0) l.push(u.measure);
    });
  var actual = {};
  Object.keys(byAbbr).forEach(function (a) {
    if (byAbbr[a].length > 1) actual[a] = byAbbr[a].sort();
  });
  var expected = {};
  Object.keys(shared).forEach(function (a) {
    expected[a] = shared[a].slice().sort();
  });
  assert.deepStrictEqual(actual, expected);
};

tests["no abbreviation is defined twice inside one measure"] = function () {
  var seen = {};
  convert()
    .list()
    .forEach(function (u) {
      var k = u.measure + "\u0000" + u.abbr;
      assert.ok(!seen[k], u.abbr + " is defined twice in " + u.measure);
      seen[k] = true;
    });
};

tests["the five force-per-length abbreviations are shared by LineLoad and Stiffness"] = function () {
  assert.deepStrictEqual(Object.keys(shared).sort(), ["N/m", "N/mm", "kN/m", "lbf/ft", "lbf/in"]);
  Object.keys(shared).forEach(function (a) {
    assert.deepStrictEqual(shared[a], ["LineLoad", "Stiffness"]);
  });
};

// Ambiguous abbreviation, no measure: a clear error, never a silent pick.
Object.keys(shared).forEach(function (a) {
  tests["from(" + a + ") without a measure throws, naming the measures"] = function () {
    assert.throws(
      function () {
        convert(1).from(a);
      },
      function (e) {
        return (
          /Ambiguous unit/.test(e.message) &&
          e.message.indexOf(a) >= 0 &&
          /LineLoad/.test(e.message) &&
          /Stiffness/.test(e.message) &&
          /Pass the measure/.test(e.message)
        );
      }
    );
  };
  tests["describe(" + a + ") without a measure throws"] = function () {
    assert.throws(function () {
      convert().describe(a);
    }, /Ambiguous unit/);
  };
  tests["describe(" + a + ", measure) reports the measure"] = function () {
    assert.strictEqual(convert().describe(a, "LineLoad").measure, "LineLoad");
    assert.strictEqual(convert().describe(a, "Stiffness").measure, "Stiffness");
  };
});

tests["measure-aware calls convert line load and stiffness independently"] = function () {
  // Same numbers, same dimension and factors, but each measure resolves its own unit.
  close(175.12683524647636, convert(1).from("lbf/in", "LineLoad").to("N/m", "LineLoad"), "line load");
  close(175.12683524647636, convert(1).from("lbf/in", "Stiffness").to("N/m", "Stiffness"), "stiffness");
  close(14.593902937206363, convert(1).from("lbf/ft", "Stiffness").to("N/m", "Stiffness"), "lbf/ft stiffness");
  assert.strictEqual(convert(1).from("kN/m", "Stiffness").to("N/mm", "Stiffness"), 1);
  assert.strictEqual(convert(1).from("kip/ft", "LineLoad").to("lbf/ft", "LineLoad"), 1000);
};

tests[".to resolves a shared abbreviation inside the origin's measure"] = function () {
  close(175.12683524647636, convert(1).from("lbf/in", "Stiffness").to("N/m"), "stiffness");
  close(1e6, convert(1).from("kN/mm", "Stiffness").to("N/m"), "kN/mm");
};

tests["a unit that is not in the named measure is unsupported"] = function () {
  assert.throws(function () {
    convert(1).from("kip/in", "LineLoad");
  }, /Unsupported unit kip\/in/);
};

tests["an unknown measure throws"] = function () {
  assert.throws(function () {
    convert(1).from("N/m", "Nope");
  }, /Unsupported measure Nope/);
};

tests["converting between measures sharing an abbreviation is incompatible"] = function () {
  assert.throws(function () {
    convert(1).from("kip/in", "Stiffness").to("kip/ft");
  }, /Cannot convert incompatible measures/);
};

tests["a unique abbreviation works without a measure, with or without one"] = function () {
  close(1000, convert(1).from("kg").to("g"), "kg");
  close(1000, convert(1).from("kg", "Mass").to("g", "Mass"), "kg with measure");
  assert.strictEqual(convert().describe("kip/in").measure, "Stiffness");
};

tests["toBest on a shared abbreviation stays inside the measure"] = function () {
  var best = convert(5000).from("N/m", "Stiffness").toBest();
  assert.ok(best && best.unit);
};

tests["possibilities for a shared abbreviation come from the origin's measure"] = function () {
  var p = convert().from("N/m", "Stiffness").possibilities();
  assert.ok(p.indexOf("kip/in") >= 0 && p.indexOf("kip/ft") < 0);
  p = convert().from("N/m", "LineLoad").possibilities();
  assert.ok(p.indexOf("kip/ft") >= 0 && p.indexOf("kip/in") < 0);
};

tests["list(measure) reports the measure for every unit"] = function () {
  var l = convert().list("Stiffness");
  assert.strictEqual(l.length, 8);
  l.forEach(function (u) {
    assert.strictEqual(u.measure, "Stiffness");
  });
};

// Registry: both new measures, with exact to_anchor, LaTeX and the siunit/imperialunit pair.
var DIST = path.join(__dirname, "..", "dist");
tests["registry emits Stiffness and Rotational-stiffness"] = function () {
  var reg = JSON.parse(fs.readFileSync(path.join(DIST, "units-registry.json"), "utf8")).measures;
  var s = reg.Stiffness,
    r = reg["Rotational-stiffness"];
  assert.ok(s && r);
  assert.strictEqual(s.units["N/m"].to_anchor, 1);
  assert.strictEqual(s.units["kN/mm"].to_anchor, 1000000);
  assert.strictEqual(s.units["kip/in"].to_anchor, 1000);
  assert.strictEqual(s.units["kip/in"].latex, "$kip.in^{-1}$");
  assert.strictEqual(s.units["N/m"].latex, reg.LineLoad.units["N/m"].latex);
  assert.strictEqual(s.units["N/m"].system, "metric");
  assert.strictEqual(r.units["kip*ft/rad"].to_anchor, 12000);
  assert.strictEqual(r.units["N*m/rad"].latex, "$N\\cdot m.rad^{-1}$");
  assert.strictEqual(r.units["lbf*in/rad"].latex, "$lbf\\cdot in.rad^{-1}$");
  assert.strictEqual(Object.keys(s.units).length, 8);
  assert.strictEqual(Object.keys(r.units).length, 7);
  assert.strictEqual(s.anchors.metric.unit, "N/m");
  assert.strictEqual(r.anchors.imperial.unit, "lbf*in/rad");
};
tests["registry keeps LineLoad's own units next to Stiffness's"] = function () {
  var reg = JSON.parse(fs.readFileSync(path.join(DIST, "units-registry.json"), "utf8")).measures;
  assert.strictEqual(reg.LineLoad.units["lbf/ft"].to_anchor, 1);
  assert.strictEqual(reg.Stiffness.units["lbf/ft"].to_anchor, 1 / 12);
};
tests["latexUnitTypes carries siunit and imperialunit for both measures"] = function () {
  var t = JSON.parse(fs.readFileSync(path.join(DIST, "latexUnitTypes.json"), "utf8")).latexUnitTypes;
  function find(n) {
    return t.filter(function (x) {
      return x.name === n;
    })[0];
  }
  assert.deepStrictEqual([find("Stiffness").siunit, find("Stiffness").imperialunit], ["N/m", "lbf/in"]);
  assert.deepStrictEqual(
    [find("Rotational-stiffness").siunit, find("Rotational-stiffness").imperialunit],
    ["N*m/rad", "lbf*in/rad"]
  );
  assert.deepStrictEqual([find("LineLoad").siunit, find("LineLoad").imperialunit], ["N/m", "lbf/ft"]);
};

module.exports = tests;
