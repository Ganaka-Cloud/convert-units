var convert = require('../lib')
  , assert = require('assert')
  , tests = {}
  , ACCURACY = 1/1000
  , percentError = require('../lib/percentError');

tests['J/kg/C to J/kg/C'] = function () {
  assert.strictEqual( convert(1).from('J/kg/C').to('J/kg/C') , 1);
};

tests['J/kg/C to J/kg/K'] = function () {
  assert.strictEqual( convert(1).from('J/kg/C').to('J/kg/K') , 1);
};

tests['J/kg/K to J/kg/C'] = function () {
  assert.strictEqual( convert(1).from('J/kg/K').to('J/kg/C') , 1);
};

tests['J/kg/C to kJ/kg/C'] = function () {
  assert.strictEqual( convert(1).from('J/kg/C').to('kJ/kg/C') , 1/1000);
};

tests['kJ/kg/C to J/kg/C'] = function () {
  assert.strictEqual( convert(1).from('kJ/kg/C').to('J/kg/C') , 1000);
};

tests['J/kg/C to kJ/kg/K'] = function () {
  assert.strictEqual( convert(1).from('J/kg/C').to('kJ/kg/K') , 1/1000);
};

tests['kJ/kg/K to J/kg/C'] = function () {
  assert.strictEqual( convert(1).from('kJ/kg/K').to('J/kg/C') , 1000);
};

tests['J/kg/C to mJ/kg/C'] = function () {
  assert.strictEqual( convert(1).from('J/kg/C').to('mJ/kg/C') , 0.001);
};

tests['mJ/kg/C to J/kg/C'] = function () {
  assert.strictEqual( convert(1).from('mJ/kg/C').to('J/kg/C') , 1000);
};

tests['J/kg/C to mJ/kg/K'] = function () {
  assert.strictEqual( convert(1).from('J/kg/C').to('mJ/kg/K') , 0.001);
};

tests['mJ/kg/K to J/kg/C'] = function () {
  assert.strictEqual( convert(1).from('mJ/kg/K').to('J/kg/C') , 1000);
};

tests['J/kg/C to J/g/C'] = function () {
  assert.strictEqual( convert(1).from('J/kg/C').to('J/g/C') , 1000);
};

tests['J/g/C to J/kg/C'] = function () {
  assert.strictEqual( convert(1).from('J/g/C').to('J/kg/C') , 0.001);
};

tests['J/kg/C to kgf-m/kg/C'] = function () {
  var expected = 9.80665
    , actual = convert(1).from('J/kg/C').to('kgf-m/kg/C');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['kgf-m/kg/C to J/kg/C'] = function () {
  var expected = 1/9.80665
    , actual = convert(1).from('kgf-m/kg/C').to('J/kg/C');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['Btu/lbm/F to Btu/lbm/F'] = function () {
  assert.strictEqual( convert(1).from('Btu/lbm/F').to('Btu/lbm/F') , 1);
};

// Cross-system: 1 Btu/lbm/F = 4186.8 J/kg/C (by definition of the BTU)
tests['J/kg/C to Btu/lbm/F'] = function () {
  var expected = 1/4186.8
    , actual = convert(1).from('J/kg/C').to('Btu/lbm/F');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['Btu/lbm/F to J/kg/C'] = function () {
  var expected = 4186.8
    , actual = convert(1).from('Btu/lbm/F').to('J/kg/C');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

module.exports = tests;
