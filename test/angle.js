var convert = require('../lib')
  , assert = require('assert')
  , tests = {}
  , ACCURACY = 1/1000
  , percentError = require('../lib/percentError');

tests['deg to deg'] = function () {
  assert.strictEqual( convert(1).from('deg').to('deg') , 1);
};

tests['deg to rad'] = function () {
  var expected = Math.PI/180
    , actual = convert(1).from('deg').to('rad');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['rad to deg'] = function () {
  var expected = 180/Math.PI
    , actual = convert(1).from('rad').to('deg');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['deg to grad'] = function () {
  var expected = 10/9
    , actual = convert(1).from('deg').to('grad');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['grad to deg'] = function () {
  var expected = 9/10
    , actual = convert(1).from('grad').to('deg');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['deg to arcmin'] = function () {
  assert.strictEqual( convert(1).from('deg').to('arcmin') , 60);
};

tests['arcmin to deg'] = function () {
  assert.strictEqual( convert(1).from('arcmin').to('deg') , 1/60);
};

tests['deg to arcsec'] = function () {
  assert.strictEqual( convert(1).from('deg').to('arcsec') , 3600);
};

tests['arcsec to deg'] = function () {
  assert.strictEqual( convert(1).from('arcsec').to('deg') , 1/3600);
};

tests['arcmin to arcsec'] = function () {
  assert.strictEqual( convert(1).from('arcmin').to('arcsec') , 60);
};

tests['arcsec to arcmin'] = function () {
  assert.strictEqual( convert(1).from('arcsec').to('arcmin') , 1/60);
};

tests['rad to grad'] = function () {
  var expected = 200/Math.PI
    , actual = convert(1).from('rad').to('grad');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['grad to rad'] = function () {
  var expected = Math.PI/200
    , actual = convert(1).from('grad').to('rad');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

// New units: rev (revolution), mil (NATO mil)
tests['rev to deg'] = function () {
  assert.strictEqual( convert(1).from('rev').to('deg') , 360);
};

tests['deg to rev'] = function () {
  var expected = 1/360
    , actual = convert(1).from('deg').to('rev');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['mil to deg'] = function () {
  var expected = 360/6400
    , actual = convert(1).from('mil').to('deg');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['rev to mil'] = function () {
  assert.ok( Math.abs(convert(1).from('rev').to('mil') - 6400) < 1e-9 );
};

// The radian is the base unit (SI), so these convert directly through it.
tests['180 deg is exactly pi rad'] = function () {
  assert.strictEqual( convert(180).from('deg').to('rad') , Math.PI);
};

tests['1 rev is exactly 2 pi rad'] = function () {
  assert.strictEqual( convert(1).from('rev').to('rad') , 2 * Math.PI);
};

tests['rad to rad'] = function () {
  assert.strictEqual( convert(1.5).from('rad').to('rad') , 1.5);
};

tests['exact fractions of pi in rad'] = function () {
  var close = function (e, a) { assert.ok( Math.abs(a - e) / e < 1e-15, e + ' vs ' + a ); };
  close(Math.PI / 200, convert(1).from('grad').to('rad'));
  close(Math.PI / 10800, convert(1).from('arcmin').to('rad'));
  close(Math.PI / 648000, convert(1).from('arcsec').to('rad'));
  close(2 * Math.PI / 6400, convert(1).from('mil').to('rad'));
};

tests['round trips through rad'] = function () {
  ['deg', 'grad', 'arcmin', 'arcsec', 'rev', 'mil'].forEach(function (u) {
    [1, 7.3, 90, 180, 1234.5].forEach(function (v) {
      var back = convert(convert(v).from(u).to('rad')).from('rad').to(u);
      assert.ok( Math.abs(back - v) / v < 1e-14, u + ' ' + v + ' -> ' + back );
    });
  });
};

module.exports = tests;
