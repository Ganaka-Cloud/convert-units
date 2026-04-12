var convert = require('../lib')
  , assert = require('assert')
  , tests = {}
  , ACCURACY = 1/1000
  , percentError = require('../lib/percentError');

tests['lb to lb'] = function () {
  assert.strictEqual( convert(1).from('lb').to('lb') , 1);
};

tests['lb to oz'] = function () {
  assert.strictEqual( convert(1).from('lb').to('oz') , 16);
};

tests['oz to lb'] = function () {
  assert.strictEqual( convert(1).from('oz').to('lb') , 1/16);
};

tests['oz to oz'] = function () {
  assert.strictEqual( convert(6).from('oz').to('oz') , 6);
};

tests['kg to kg'] = function () {
  assert.strictEqual( convert(1).from('kg').to('kg') , 1);
};

tests['kg to g'] = function () {
  assert.strictEqual( convert(1).from('kg').to('g') , 1000);
};

tests['g to kg'] = function () {
  assert.strictEqual( convert(1).from('g').to('kg') , 1/1000);
};

tests['g to g'] = function () {
  assert.strictEqual( convert(100).from('g').to('g') , 100);
};

// When converting between systems, expect < 0.1% error
tests['kg to lb'] = function () {
  var expected = 0.453592
    , actual = convert(1).from('lb').to('kg');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['g to lb'] = function () {
  var expected = 0.00220462
    , actual = convert(1).from('g').to('lb');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['lb to g'] = function () {
  var expected = 1360.78
    , actual = convert(3).from('lb').to('g');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['g to lb'] = function () {
  var expected = 3
    , actual = convert(1360.78).from('g').to('lb');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

// New units: u/Da (metric, anchor=g); slug, stone, grain (imperial, anchor=lb)
// u = 1.66053906660e-24 g (anchor is g)
// stone = 14 lb, grain = 1/7000 lb, slug = 32.174 lb
tests['u to g'] = function () {
  var expected = 1.66053906660e-24
    , actual = convert(1).from('u').to('g');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['Da to g'] = function () {
  var expected = 1.66053906660e-24
    , actual = convert(1).from('Da').to('g');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['u to Da'] = function () {
  var expected = 1
    , actual = convert(1).from('u').to('Da');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['stone to lb'] = function () {
  assert.strictEqual( convert(1).from('stone').to('lb') , 14);
};

tests['lb to stone'] = function () {
  assert.strictEqual( convert(14).from('lb').to('stone') , 1);
};

tests['grain to lb'] = function () {
  var expected = 1/7000
    , actual = convert(1).from('grain').to('lb');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['slug to lb'] = function () {
  var expected = 32.174
    , actual = convert(1).from('slug').to('lb');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['stone to kg'] = function () {
  var expected = 6.35029
    , actual = convert(1).from('stone').to('kg');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

// New units: pg, ng (metric); ct (metric); ozt, lbt, cwt, dr, dwt, long-ton, short-ton (imperial)
tests['pg to g'] = function () {
  assert.strictEqual( convert(1).from('pg').to('g') , 1e-12);
};

tests['ng to g'] = function () {
  assert.strictEqual( convert(1).from('ng').to('g') , 1e-9);
};

tests['ct to g'] = function () {
  assert.strictEqual( convert(1).from('ct').to('g') , 0.2);
};

tests['g to ct'] = function () {
  assert.strictEqual( convert(0.2).from('g').to('ct') , 1);
};

tests['ozt to lb'] = function () {
  var expected = 31.1035/453.592
    , actual = convert(1).from('ozt').to('lb');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['cwt to lb'] = function () {
  assert.strictEqual( convert(1).from('cwt').to('lb') , 100);
};

tests['long-ton to lb'] = function () {
  assert.strictEqual( convert(1).from('long-ton').to('lb') , 2240);
};

tests['short-ton to lb'] = function () {
  assert.strictEqual( convert(1).from('short-ton').to('lb') , 2000);
};

tests['dr to lb'] = function () {
  var expected = 1/256
    , actual = convert(1).from('dr').to('lb');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['lbt to ozt'] = function () {
  var expected = 12
    , actual = convert(1).from('lbt').to('ozt');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

module.exports = tests;
