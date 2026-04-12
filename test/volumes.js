var convert = require('../lib')
  , assert = require('assert')
  , tests = {}
  , ACCURACY = 1/1000
  , percentError = require('../lib/percentError');

tests['l to l'] = function () {
  assert.strictEqual( convert(2).from('l').to('l') , 2);
};

tests['mm3 to l'] = function () {
  assert.strictEqual( convert(1000000).from('mm3').to('l') , 1);
};

tests['cm3 to l'] = function () {
  assert.strictEqual( convert(100).from('cm3').to('l') , 1/10);
};

tests['dl to l'] = function () {
  assert.strictEqual( convert(2).from('dl').to('l') , 0.2);
};

tests['cl to l'] = function () {
  assert.strictEqual( convert(25).from('cl').to('l') , 0.25);
};

tests['ml to l'] = function () {
  assert.strictEqual( convert(100).from('ml').to('l') , 1/10);
};

tests['m3 to l'] = function () {
  assert.strictEqual( convert(1).from('m3').to('l') , 1000);
};

tests['km3 to l'] = function () {
  assert.strictEqual( convert(1).from('km3').to('l') , 1000000000000);
};

tests['l to ml'] = function () {
  assert.strictEqual( convert(1).from('l').to('ml') , 1000);
};

tests['dl to ml'] = function () {
  assert.strictEqual( convert(10).from('dl').to('ml') , 1000);
};

tests['cl to ml'] = function () {
  assert.strictEqual( convert(100).from('cl').to('ml') , 1000);
};

tests['ml to ml'] = function () {
  assert.strictEqual( convert(13).from('ml').to('ml') , 13);
};



tests['fl-oz to fl-oz'] = function () {
  assert.strictEqual( convert(62).from('fl-oz').to('fl-oz') , 62);
};

tests['fl-oz to tbsp'] = function () {
  assert.strictEqual( convert(4).from('fl-oz').to('Tbs') , 8);
};

tests['Tbs to fl-oz'] = function () {
  assert.strictEqual( convert(2).from('Tbs').to('fl-oz') , 1);
};

tests['Tbs to Tbs'] = function () {
  assert.strictEqual( convert(140).from('Tbs').to('Tbs') , 140);
};

// When converting between systems, expect < 0.1% error
tests['tsp to l'] = function () {
  var expected = 1.75
    , actual = convert(355).from('tsp').to('l');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['in3 to l'] = function () {
  var expected = 0.0163871
    , actual = convert(1).from('in3').to('l');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['in3 to fl-oz'] = function () {
  var expected = 0.554113
    , actual = convert(1).from('in3').to('fl-oz');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['m3 to yd3'] = function () {
  var expected = 1.30795
    , actual = convert(1).from('m3').to('yd3');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['ft3 to cm3'] = function () {
  var expected = 28316.8
    , actual = convert(1).from('ft3').to('cm3');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['pnt to ml'] = function () {
  var expected = 2366
    , actual = convert(5).from('pnt').to('ml');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['ml to gal'] = function () {
  var expected = 2.609
    , actual = convert(9876).from('ml').to('gal');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['gal to l'] = function () {
  var expected = 37.85
    , actual = convert(10).from('gal').to('l');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

// New imperial units: gill, bbl-oil, bbl-beer, bu, pk, fl-oz-UK
// imperial anchor = fl-oz
tests['gill to fl-oz'] = function () {
  assert.strictEqual( convert(1).from('gill').to('fl-oz') , 4);
};

tests['fl-oz to gill'] = function () {
  assert.strictEqual( convert(4).from('fl-oz').to('gill') , 1);
};

tests['bbl-oil to gal'] = function () {
  assert.strictEqual( convert(1).from('bbl-oil').to('gal') , 42);
};

tests['bbl-beer to gal'] = function () {
  assert.strictEqual( convert(1).from('bbl-beer').to('gal') , 31);
};

tests['bu to pk'] = function () {
  assert.strictEqual( convert(1).from('bu').to('pk') , 4);
};

tests['pk to bu'] = function () {
  assert.strictEqual( convert(4).from('pk').to('bu') , 1);
};

tests['bu to gal'] = function () {
  var expected = 9.30918
    , actual = convert(1).from('bu').to('gal');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['fl-oz-UK to fl-oz'] = function () {
  var expected = 0.96076
    , actual = convert(1).from('fl-oz-UK').to('fl-oz');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

// New volume units
tests['UK-gal to fl-oz'] = function () {
  var expected = 160 * 0.96076
    , actual = convert(1).from('UK-gal').to('fl-oz');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['UK-pt to fl-oz'] = function () {
  var expected = 20 * 0.96076
    , actual = convert(1).from('UK-pt').to('fl-oz');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['UK-gill to fl-oz'] = function () {
  var expected = 5 * 0.96076
    , actual = convert(1).from('UK-gill').to('fl-oz');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['jigger to fl-oz'] = function () {
  assert.strictEqual( convert(1).from('jigger').to('fl-oz') , 1.5);
};

tests['fl-dr to fl-oz'] = function () {
  assert.strictEqual( convert(1).from('fl-dr').to('fl-oz') , 1/8);
};

tests['bdft to in3'] = function () {
  var expected = 144
    , actual = convert(1).from('bdft').to('in3');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

module.exports = tests;
