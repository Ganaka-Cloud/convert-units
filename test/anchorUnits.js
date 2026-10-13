"use strict";
// Every anchor unit names a unit that exists in its own measure and system, so generated
// registries (latexUnitTypes siunit/imperialunit) never point at a missing key.
var fs = require("fs"),
  path = require("path"),
  assert = require("assert"),
  tests = {};

var index = fs.readFileSync(path.join(__dirname, "..", "lib", "index.js"), "utf8");
var re = /^\s*["']?([\w-]+)["']?\s*:\s*require\("\.\/definitions\/([\w-]+)"\)/gm;
var m;
while ((m = re.exec(index)) !== null) {
  (function (measure, file) {
    var def = require("../lib/definitions/" + file);
    Object.keys(def._anchors || {}).forEach(function (system) {
      var units = def[system];
      // A system with no units (Percent's empty imperial) has nothing to anchor.
      if (!units || Object.keys(units).length === 0) return;
      tests[measure + " " + system + " anchor unit exists"] = function () {
        assert.ok(
          Object.prototype.hasOwnProperty.call(units, def._anchors[system].unit),
          def._anchors[system].unit + " is not a " + system + " unit of " + measure
        );
      };
    });
  })(m[1], m[2]);
}

module.exports = tests;
