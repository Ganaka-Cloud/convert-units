var convert = require('../lib')
  , assert = require('assert')
  , tests = {}
  , ACCURACY = 1/1000
  , percentError = require('../lib/percentError');

function close(expected, actual) {
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
}

tests['1/C to 1/C'] = function () {
  assert.strictEqual( convert(1).from('1/C').to('1/C') , 1);
};

tests['1/C to 1/K'] = function () {
  assert.strictEqual( convert(1).from('1/C').to('1/K') , 1);
};

tests['1/K to 1/C'] = function () {
  assert.strictEqual( convert(1e-5).from('1/K').to('1/C') , 1e-5);
};

tests['1/K to 1/K'] = function () {
  assert.strictEqual( convert(1).from('1/K').to('1/K') , 1);
};

tests['/F to /F'] = function () {
  assert.strictEqual( convert(1).from('/F').to('/F') , 1);
};

tests['/F to /R'] = function () {
  assert.strictEqual( convert(1).from('/F').to('/R') , 1);
};

tests['/R to /F'] = function () {
  assert.strictEqual( convert(1).from('/R').to('/F') , 1);
};

// 1 K^-1 = 5/9 degF^-1
tests['1/K to /F'] = function () {
  close(5/9, convert(1).from('1/K').to('/F'));
};

tests['1/C to /F'] = function () {
  close(5/9, convert(1).from('1/C').to('/F'));
};

tests['/F to 1/K'] = function () {
  close(1.8, convert(1).from('/F').to('1/K'));
};

tests['/F to 1/C'] = function () {
  close(1.8, convert(1).from('/F').to('1/C'));
};

tests['/R to 1/K'] = function () {
  close(1.8, convert(1).from('/R').to('1/K'));
};

// A coefficient is per unit temperature interval, so it carries no scale offset:
// NIST SP 811 App. B.8 gives 1 degF (interval) = 5.555 556 E-01 K, 1 degC (interval) = 1 K,
// and 1 degR (interval) = 5.555 556 E-01 K. Hence x /degF = 1.8x 1/K.
tests['/F to 1/K is exactly 9/5'] = function () {
  assert.ok(Math.abs(convert(1).from('/F').to('1/K') - 1.8) < 1e-12);
  assert.ok(Math.abs(convert(1).from('/R').to('1/C') - 1.8) < 1e-12);
};

// Published pairs (amesweb.info Linear-Thermal-Expansion-Coefficient-Metals, room
// temperature table, columns 10^-6/degC and 10^-6/degF), rounded to 0.1 in the source.
var PUBLISHED = [
  ['Steel A36', 11.7, 6.5],
  ['Steel 4140', 12.3, 6.8],
  ['Stainless 304', 17.2, 9.6],
  ['Aluminum 6061', 23.6, 13.1],
  ['Copper C11000', 17.0, 9.4],
  ['Brass C26000', 19.9, 11.1],
];
PUBLISHED.forEach(function (row) {
  var perC = row[1] * 1e-6, perF = row[2] * 1e-6;
  tests[row[0] + ' CTE per C to per F matches published'] = function () {
    // 0.1 rounding of the published /F value allows up to ~0.8% error
    assert.ok(Math.abs(convert(perC).from('1/C').to('/F') - perF) / perF < 0.01);
  };
  tests[row[0] + ' CTE per F to per C matches published'] = function () {
    assert.ok(Math.abs(convert(perF).from('/F').to('1/C') - perC) / perC < 0.01);
  };
});

// The coefficient is not an absolute-temperature reciprocal: no offset, so zero stays zero.
tests['zero CTE stays zero across scales'] = function () {
  assert.strictEqual(convert(0).from('/F').to('1/K'), 0);
  assert.strictEqual(convert(0).from('1/K').to('/F'), 0);
};

module.exports = tests;
