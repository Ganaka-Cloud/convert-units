var convert = require('../lib')
  , assert = require('assert')
  , tests = {}
  , ACCURACY = 1/1000
  , percentError = require('../lib/percentError');

tests['kg/m3 to kg/m3'] = function () {
  assert.strictEqual( convert(1).from('kg/m3').to('kg/m3') , 1);
};

// Metric intra-system (anchor = kg/m3 = kg/m^3)

tests['g/cm3 to kg/m3'] = function () {
  // 1 g/cm^3 = 1000 kg/m^3
  assert.strictEqual( convert(1).from('g/cm3').to('kg/m3') , 1000);
};

tests['kg/m3 to g/cm3'] = function () {
  // 1 kg/m^3 = 0.001 g/cm^3
  assert.strictEqual( convert(1).from('kg/m3').to('g/cm3') , 0.001);
};

tests['g/m3 to kg/m3'] = function () {
  // 1 g/m^3 = 0.001 kg/m^3
  assert.strictEqual( convert(1).from('g/m3').to('kg/m3') , 0.001);
};

tests['kg/m3 to g/m3'] = function () {
  // 1 kg/m^3 = 1000 g/m^3
  assert.strictEqual( convert(1).from('kg/m3').to('g/m3') , 1000);
};

tests['kg/m3 to t/mm3'] = function () {
  assert.strictEqual( convert(1).from('kg/m3').to('t/mm3') , 1e-12);
};

tests['t/mm3 to kg/m3'] = function () {
  assert.strictEqual( convert(1).from('t/mm3').to('kg/m3') , 1000000000000);
};

tests['kg/l to kg/m3'] = function () {
  // 1 kg/l = 1000 kg/m^3
  assert.strictEqual( convert(1).from('kg/l').to('kg/m3') , 1000);
};

tests['kg/m3 to kg/l'] = function () {
  // 1 kg/m^3 = 0.001 kg/l
  assert.strictEqual( convert(1).from('kg/m3').to('kg/l') , 0.001);
};

tests['kg/m3 to g/l'] = function () {
  assert.strictEqual( convert(1).from('kg/m3').to('g/l') , 1);
};

tests['g/l to kg/m3'] = function () {
  assert.strictEqual( convert(1).from('g/l').to('kg/m3') , 1);
};

// Imperial intra-system (anchor = tlpcy)

tests['lbpcft to lbpcft'] = function () {
  assert.strictEqual( convert(1).from('lbpcft').to('lbpcft') , 1);
};

tests['lbpcft to lbpcin'] = function () {
  // 1 lb/ft^3 = 1/1728 lb/in^3 (since 1 ft^3 = 1728 in^3)
  var expected = 1/1728
    , actual = convert(1).from('lbpcft').to('lbpcin');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['lbpcin to lbpcft'] = function () {
  // 1 lb/in^3 = 1728 lb/ft^3
  var expected = 1728
    , actual = convert(1).from('lbpcin').to('lbpcft');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['lbpcft to lbpcy'] = function () {
  // 1 lb/ft^3 = 27 lb/yd^3 (since 1 yd^3 = 27 ft^3)
  var expected = 27
    , actual = convert(1).from('lbpcft').to('lbpcy');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['lbpcy to lbpcft'] = function () {
  // 1 lb/yd^3 = 1/27 lb/ft^3
  var expected = 1/27
    , actual = convert(1).from('lbpcy').to('lbpcft');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

// Imperial intra-system

tests['lbpcft to ozpcin'] = function () {
  // 1 lb/ft^3: 1 ft^3=1728 in^3, 1 lb=16 oz => 1 lb/ft^3 = 16/1728 oz/in^3 = 1/108
  var expected = 1/108
    , actual = convert(1).from('lbpcft').to('ozpcin');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['ozpcin to lbpcft'] = function () {
  // 1 oz/in^3 = 108 lb/ft^3
  var expected = 108
    , actual = convert(1).from('ozpcin').to('lbpcft');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};


tests['lbpcft to ozpcft'] = function () {
  // 1 lb/ft^3 = 16 oz/ft^3
  var expected = 16
    , actual = convert(1).from('lbpcft').to('ozpcft');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['ozpcft to lbpcft'] = function () {
  // 1 oz/ft^3 = 1/16 lb/ft^3
  var expected = 1/16
    , actual = convert(1).from('ozpcft').to('lbpcft');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};


tests['lbpcft to ozspg'] = function () {
  // 1 lb/ft^3: 1 ft^3=7.48052 gal-US, 1 lb=16 oz => 16/7.48052 oz/gal-US = 2.139
  var expected = 2.139
    , actual = convert(1).from('lbpcft').to('ozspg');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['ozspg to lbpcft'] = function () {
  var expected = 1/2.139
    , actual = convert(1).from('ozspg').to('lbpcft');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};


tests['lbpcft to ozlpg'] = function () {
  // 1 lb/ft^3: 1 ft^3=6.22884 gal-UK, 1 lb=16 oz => 16/6.22884 = 2.5687
  var expected = 2.5687
    , actual = convert(1).from('lbpcft').to('ozlpg');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['ozlpg to lbpcft'] = function () {
  var expected = 1/2.5687
    , actual = convert(1).from('ozlpg').to('lbpcft');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};


tests['lbpcft to lbspg'] = function () {
  // 1 lb/ft^3: 1 ft^3=7.48052 gal-US => 1/7.48052 lb/gal-US = 0.13368
  var expected = 0.13368
    , actual = convert(1).from('lbpcft').to('lbspg');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['lbspg to lbpcft'] = function () {
  var expected = 7.48052
    , actual = convert(1).from('lbspg').to('lbpcft');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};


tests['lbpcft to lblpg'] = function () {
  // 1 lb/ft^3: 1 ft^3=6.22884 gal-UK => 1/6.22884 = 0.16054
  var expected = 0.16054
    , actual = convert(1).from('lbpcft').to('lblpg');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['lblpg to lbpcft'] = function () {
  var expected = 6.22884
    , actual = convert(1).from('lblpg').to('lbpcft');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};


tests['lbpcft to slpcft'] = function () {
  // 1 slug = 14.5939 kg / 0.453592 kg/lb = 32.174 lb
  // 1 lb/ft^3 = 1/32.174 slug/ft^3
  var expected = 1/32.174
    , actual = convert(1).from('lbpcft').to('slpcft');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['slpcft to lbpcft'] = function () {
  var expected = 32.174
    , actual = convert(1).from('slpcft').to('lbpcft');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};


tests['lbpcft to tspcy'] = function () {
  // 1 lb/ft^3: 1 yd^3=27 ft^3, 1 short ton=2000 lb => 27/2000 = 0.0135 short ton/yd^3
  var expected = 27/2000
    , actual = convert(1).from('lbpcft').to('tspcy');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['tspcy to lbpcft'] = function () {
  var expected = 2000/27
    , actual = convert(1).from('tspcy').to('lbpcft');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};


tests['lbpcft to tlpcy'] = function () {
  // 1 lb/ft^3: 1 yd^3=27 ft^3, 1 long ton=2240 lb => 27/2240 = 0.012054 long ton/yd^3
  var expected = 27/2240
    , actual = convert(1).from('lbpcft').to('tlpcy');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['tlpcy to lbpcft'] = function () {
  var expected = 2240/27
    , actual = convert(1).from('tlpcy').to('lbpcft');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

// Cross-system

tests['kg/m3 to lbpcft'] = function () {
  // 1 kg/m^3 = 0.062428 lb/ft^3 (Pint reference)
  var expected = 0.0624279606
    , actual = convert(1).from('kg/m3').to('lbpcft');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['lbpcft to kg/m3'] = function () {
  // 1 lb/ft^3 = 16.0185 kg/m^3 (Pint reference)
  var expected = 16.01846337374285
    , actual = convert(1).from('lbpcft').to('kg/m3');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['g/cm3 to lbpcft'] = function () {
  // 1 g/cm^3 = 1000 kg/m^3 = 62.428 lb/ft^3
  var expected = 62.4279606
    , actual = convert(1).from('g/cm3').to('lbpcft');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

module.exports = tests;
