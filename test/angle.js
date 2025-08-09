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

module.exports = tests;
