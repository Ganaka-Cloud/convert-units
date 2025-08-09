var convert = require('../lib')
  , assert = require('assert')
  , tests = {}
  , ACCURACY = 1/1000
  , percentError = require('../lib/percentError');

tests['W/m/C to W/m/C'] = function () {
  assert.strictEqual( convert(1).from('W/m/C').to('W/m/C') , 1);
};

tests['W/m/C to W/m/K'] = function () {
  assert.strictEqual( convert(1).from('W/m/C').to('W/m/K') , 1);
};

tests['W/m/K to W/m/C'] = function () {
  assert.strictEqual( convert(1).from('W/m/K').to('W/m/C') , 1);
};

tests['W/m/C to kW/m/C'] = function () {
  assert.strictEqual( convert(1).from('W/m/C').to('kW/m/C') , 1/1000);
};

tests['kW/m/C to W/m/C'] = function () {
  assert.strictEqual( convert(1).from('kW/m/C').to('W/m/C') , 1000);
};

tests['W/m/C to kW/m/K'] = function () {
  assert.strictEqual( convert(1).from('W/m/C').to('kW/m/K') , 1/1000);
};

tests['kW/m/K to W/m/C'] = function () {
  assert.strictEqual( convert(1).from('kW/m/K').to('W/m/C') , 1000);
};

tests['W/m/C to W/cm/C'] = function () {
  assert.strictEqual( convert(1).from('W/m/C').to('W/cm/C') , 100);
};

tests['W/cm/C to W/m/C'] = function () {
  assert.strictEqual( convert(1).from('W/cm/C').to('W/m/C') , 0.01);
};

tests['W/m/C to W/mm/C'] = function () {
  assert.strictEqual( convert(1).from('W/m/C').to('W/mm/C') , 1000);
};

tests['W/mm/C to W/m/C'] = function () {
  assert.strictEqual( convert(1).from('W/mm/C').to('W/m/C') , 0.001);
};

tests['W/m/C to mW/m/C'] = function () {
  assert.strictEqual( convert(1).from('W/m/C').to('mW/m/C') , 1000);
};

tests['mW/m/C to W/m/C'] = function () {
  assert.strictEqual( convert(1).from('mW/m/C').to('W/m/C') , 1/1000);
};

tests['W/m/C to cW/m/C'] = function () {
  assert.strictEqual( convert(1).from('W/m/C').to('cW/m/C') , 100);
};

tests['cW/m/C to W/m/C'] = function () {
  assert.strictEqual( convert(1).from('cW/m/C').to('W/m/C') , 1/100);
};

tests['Btu.in/hr/sq.ft/F to Btu.in/hr/sq.ft/F'] = function () {
  assert.strictEqual( convert(1).from('Btu.in/hr/sq.ft/F').to('Btu.in/hr/sq.ft/F') , 1);
};

tests['Btu.in/hr/sq.ft/F to Btu.in/s/sq.ft/F'] = function () {
  assert.strictEqual( convert(1).from('Btu.in/hr/sq.ft/F').to('Btu.in/s/sq.ft/F') , 3636.3636363636365);
};

tests['Btu.in/s/sq.ft/F to Btu.in/hr/sq.ft/F'] = function () {
  assert.strictEqual( convert(1).from('Btu.in/s/sq.ft/F').to('Btu.in/hr/sq.ft/F') , 1/3636.3636363636365);
};

tests['Btu.in/hr/sq.ft/F to Btu/hr/ft/F'] = function () {
  assert.strictEqual( convert(1).from('Btu.in/hr/sq.ft/F').to('Btu/hr/ft/F') , 12);
};

tests['Btu/hr/ft/F to Btu.in/hr/sq.ft/F'] = function () {
  assert.strictEqual( convert(1).from('Btu/hr/ft/F').to('Btu.in/hr/sq.ft/F') , 1/12);
};

// When converting between systems, expect < 0.1% error
tests['W/m/C to Btu.in/hr/sq.ft/F'] = function () {
  var expected = 0.04814910043035666
    , actual = convert(1).from('W/m/C').to('Btu.in/hr/sq.ft/F');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['Btu.in/hr/sq.ft/F to W/m/C'] = function () {
  var expected = 20.768819999999998
    , actual = convert(1).from('Btu.in/hr/sq.ft/F').to('W/m/C');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

module.exports = tests;
