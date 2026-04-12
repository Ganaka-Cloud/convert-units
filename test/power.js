var convert = require('../lib')
  , assert = require('assert')
  , tests = {}
  , ACCURACY = 1/1000
  , percentError = require('../lib/percentError');

tests['W to W'] = function () {
  assert.strictEqual( convert(1).from('W').to('W') , 1);
};

tests['mW to mW'] = function () {
  assert.strictEqual( convert(1).from('mW').to('mW') , 1);
};

tests['kW to kW'] = function () {
  assert.strictEqual( convert(1).from('kW').to('kW') , 1);
};

tests['MW to MW'] = function () {
  assert.strictEqual( convert(1).from('MW').to('MW') , 1);
};

tests['GW to GW'] = function () {
  assert.strictEqual( convert(1).from('GW').to('GW') , 1);
};

tests['W to mW'] = function () {
  assert.strictEqual( convert(1).from('W').to('mW') , 1000);
};

tests['W to kW'] = function () {
  assert.strictEqual( convert(1).from('W').to('kW') , 0.001);
};

tests['W to MW'] = function () {
  assert.strictEqual( convert(1).from('W').to('MW') , 0.000001);
};

tests['W to GW'] = function () {
  assert.strictEqual( convert(1).from('W').to('GW') , 0.000000001);
};

tests['GW to mW'] = function () {
  assert.strictEqual( convert(1).from('GW').to('mW'), 1000000000000);
}

tests['MW to mW'] = function () {
  assert.strictEqual( convert(1).from('MW').to('mW'), 1000000000);
}

tests['kW to mW'] = function () {
  assert.strictEqual( convert(1).from('kW').to('mW'), 1000000);
}

tests['mW to kW'] = function () {
  assert.strictEqual( convert(1).from('mW').to('kW'), 0.000001);
}

tests['mW to W'] = function () {
  assert.strictEqual( convert(1).from('mW').to('W'), 0.001);
}

tests['kW to W'] = function () {
  assert.strictEqual( convert(1).from('kW').to('W'), 1000);
}

// New units: hp-mech, hp-met, hp-elec, hp-boiler, tonRef
tests['hp-mech to W'] = function () {
  assert.strictEqual( convert(1).from('hp-mech').to('W') , 745.69987);
};

tests['W to hp-mech'] = function () {
  var expected = 1
    , actual = convert(745.69987).from('W').to('hp-mech');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['hp-met to W'] = function () {
  assert.strictEqual( convert(1).from('hp-met').to('W') , 735.49875);
};

tests['hp-elec to W'] = function () {
  assert.strictEqual( convert(1).from('hp-elec').to('W') , 746);
};

tests['hp-boiler to W'] = function () {
  assert.strictEqual( convert(1).from('hp-boiler').to('W') , 9809.5);
};

tests['tonRef to W'] = function () {
  assert.strictEqual( convert(1).from('tonRef').to('W') , 3516.8528);
};

tests['hp-mech to kW'] = function () {
  var expected = 0.74569987
    , actual = convert(1).from('hp-mech').to('kW');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

module.exports = tests;
