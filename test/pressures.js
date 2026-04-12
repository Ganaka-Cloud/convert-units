var convert = require('../lib')
  , assert = require('assert')
  , tests = {}
  , ACCURACY = 1/1000
  , percentError = require('../lib/percentError');


tests['Pa to Pa'] = function () {
  assert.strictEqual( convert(1).from('Pa').to('Pa') , 1);
};

tests['Pa to kPa'] = function () {
  assert.strictEqual( convert(2000).from('Pa').to('kPa') , 2);
};

tests['kPa to Pa'] = function () {
  assert.strictEqual( convert(1).from('kPa').to('Pa') , 1000);
};

tests['kPa to hPa'] = function () {
  assert.strictEqual( convert(20).from('kPa').to('hPa') , 200);
};

tests['kPa to MPa'] = function () {
  assert.strictEqual( convert(8000).from('kPa').to('MPa') , 8);
};

tests['kPa to bar'] = function () {
  assert.strictEqual( convert(6000).from('kPa').to('bar') , 60);
};

tests['kPa to torr'] = function () {
    var expected = 3990.33
      , actual = convert(532).from('kPa').to('torr');
    assert.ok( percentError(expected, actual) < ACCURACY
      , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['psi to psi'] = function () {
  assert.strictEqual( convert(10).from('psi').to('psi') , 10);
};

tests['psi to ksi'] = function () {
  assert.strictEqual( convert(10000).from('psi').to('ksi') , 10);
};

tests['Pa to psi'] = function () {
    var expected = 1.450377
      , actual = convert(10000).from('Pa').to('psi');
    assert.ok( percentError(expected, actual) < ACCURACY
      , 'Expected: ' + expected +', Actual: ' + actual);
  assert.strictEqual( convert(1).from('GB').to('B') , 1073741824);
};

tests['torr to ksi'] = function () {
    var expected = 1
      , actual = convert(51714.931860168974).from('torr').to('ksi');
    assert.ok( percentError(expected, actual) < ACCURACY
      , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['psi to hPa'] = function () {
    var expected = 689.47573
      , actual = convert(10).from('psi').to('hPa');
    assert.ok( percentError(expected, actual) < ACCURACY
      , 'Expected: ' + expected +', Actual: ' + actual);
};

// New units: atm, mmHg, cmH2O, mbar (metric); inHg, inH2O (imperial)
tests['atm to kPa'] = function () {
  assert.strictEqual( convert(1).from('atm').to('kPa') , 101.325);
};

tests['kPa to atm'] = function () {
  var expected = 1
    , actual = convert(101.325).from('kPa').to('atm');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['mmHg to kPa'] = function () {
  assert.strictEqual( convert(1).from('mmHg').to('kPa') , 0.133322);
};

tests['cmH2O to kPa'] = function () {
  assert.strictEqual( convert(1).from('cmH2O').to('kPa') , 0.0980665);
};

tests['mbar to kPa'] = function () {
  assert.strictEqual( convert(1).from('mbar').to('kPa') , 0.1);
};

tests['inHg to kPa'] = function () {
  var expected = 3.38639
    , actual = convert(1).from('inHg').to('kPa');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['inH2O to kPa'] = function () {
  var expected = 0.249089
    , actual = convert(1).from('inH2O').to('kPa');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['inHg to psi'] = function () {
  var expected = 0.491154
    , actual = convert(1).from('inHg').to('psi');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

// New pressure units: cmHg, Ba (barye), at (technical atmosphere)
tests['cmHg to kPa'] = function () {
  var expected = 1.33322
    , actual = convert(1).from('cmHg').to('kPa');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['mmHg to cmHg'] = function () {
  var expected = 0.1
    , actual = convert(1).from('mmHg').to('cmHg');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['Ba to Pa'] = function () {
  var expected = 0.1
    , actual = convert(1).from('Ba').to('Pa');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['at to kPa'] = function () {
  var expected = 98.0665
    , actual = convert(1).from('at').to('kPa');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

module.exports = tests;
