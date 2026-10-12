var convert = require('../lib')
  , assert = require('assert')
  , tests = {};

// J/K, eV/K and ft*lbf/degR are all energy per temperature interval: plain ratios, no offset.
function rel(expected, actual) {
  return Math.abs(expected - actual) / Math.abs(expected);
}

tests['J/K to J/K'] = function () {
  assert.strictEqual( convert(1).from('J/K').to('J/K') , 1);
};

// eV = 1.602 176 634e-19 J exactly (SI 2019)
tests['ev/K to J/K'] = function () {
  assert.ok( rel(1.602176634e-19, convert(1).from('ev/K').to('J/K')) < 1e-12 );
};

tests['J/K to ev/K'] = function () {
  assert.ok( rel(1/1.602176634e-19, convert(1).from('J/K').to('ev/K')) < 1e-12 );
};

tests['ft-lb/R to ft-lb/R'] = function () {
  assert.strictEqual( convert(1).from('ft-lb/R').to('ft-lb/R') , 1);
};

// 1 ft*lbf/degR = 1.3558179483314004 J / (5/9 K) = 2.44047230699652 J/K
tests['ft-lb/R to J/K'] = function () {
  assert.ok( rel(2.44047230699652, convert(1).from('ft-lb/R').to('J/K')) < 1e-12 );
};

tests['J/K to ft-lb/R'] = function () {
  assert.ok( rel(1/2.44047230699652, convert(1).from('J/K').to('ft-lb/R')) < 1e-12 );
};

module.exports = tests;
