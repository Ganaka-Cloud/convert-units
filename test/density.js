var convert = require('../lib')
  , assert = require('assert')
  , tests = {}
  , ACCURACY = 1/1000
  , percentError = require('../lib/percentError');

tests['kgpcm to kgpcm'] = function () {
  assert.strictEqual( convert(1).from('kgpcm').to('kgpcm') , 1);
};

// Metric

tests['kgpcm to gpcc'] = function () {
  assert.strictEqual( convert(1).from('kgpcm').to('gpcc') , 1000);
};

tests['gpcc to kgpcm'] = function () {
  assert.strictEqual( convert(1).from('gpcc').to('kgpcm') , 0.001);
};

tests['kgpcm to gpcm'] = function () {
  assert.strictEqual( convert(1).from('kgpcm').to('gpcm') , 1000);
};

tests['gpcm to kgpcm'] = function () {
  assert.strictEqual( convert(1).from('gpcm').to('kgpcm') , 0.001);
};

tests['kgpcm to tpcmm'] = function () {
  assert.strictEqual( convert(1).from('kgpcm').to('tpcmm') , 1e-12);
};

tests['tpcmm to kgpcm'] = function () {
  assert.strictEqual( convert(1).from('tpcmm').to('kgpcm') , 1000000000000);
};

tests['kgpcm to kgpl'] = function () {
  assert.strictEqual( convert(1).from('kgpcm').to('kgpl') , 1000);
};

tests['kgpl to kgpcm'] = function () {
  assert.strictEqual( convert(1).from('kgpl').to('kgpcm') , 0.001);
};

tests['kgpcm to gpl'] = function () {
  assert.strictEqual( convert(1).from('kgpcm').to('gpl') , 1);
};

tests['gpl to kgpcm'] = function () {
  assert.strictEqual( convert(1).from('gpl').to('kgpcm') , 1);
};

tests['lbpcft to lbpcft'] = function () {
  assert.strictEqual( convert(1).from('lbpcft').to('lbpcft') , 1);
};

tests['lbpcft to lbpcin'] = function () {
  assert.strictEqual( convert(1).from('lbpcft').to('lbpcin') , 1728.000001328863);
};

tests['lbpcin to lbpcft'] = function () {
  assert.strictEqual( convert(1).from('lbpcin').to('lbpcft') , 0.0005787037032586702);
};

tests['lbpcft to lbpcy'] = function () {
  assert.strictEqual( convert(1).from('lbpcft').to('lbpcy') , 0.03703703703705357);
};

tests['lbpcy to lbpcft'] = function () {
  assert.strictEqual( convert(1).from('lbpcy').to('lbpcft') , 26.99999999998795);
};

// Imperial intra-system

tests['lbpcft to ozpcin'] = function () {
  assert.strictEqual( convert(1).from('lbpcft').to('ozpcin') , 107.99999999869821);
};

tests['ozpcin to lbpcft'] = function () {
  assert.strictEqual( convert(1).from('ozpcin').to('lbpcft') , 0.009259259259370867);
};


tests['lbpcft to ozpcft'] = function () {
  assert.strictEqual( convert(1).from('lbpcft').to('ozpcft') , 0.06250000000037667);
};

tests['ozpcft to lbpcft'] = function () {
  assert.strictEqual( convert(1).from('ozpcft').to('lbpcft') , 15.999999999903572);
};


tests['lbpcft to ozspg'] = function () {
  var expected = 0.4675324675347363
    , actual = convert(1).from('lbpcft').to('ozspg');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['ozspg to lbpcft'] = function () {
  var expected = 2.1388888888785096
    , actual = convert(1).from('ozspg').to('lbpcft');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};


tests['lbpcft to ozlpg'] = function () {
  var expected = 0.38930221618591004
    , actual = convert(1).from('lbpcft').to('ozlpg');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['ozlpg to lbpcft'] = function () {
  var expected = 2.5686984518024247
    , actual = convert(1).from('ozlpg').to('lbpcft');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};


tests['lbpcft to lbspg'] = function () {
  var expected = 7.480519480808717
    , actual = convert(1).from('lbpcft').to('lbspg');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['lbspg to lbpcft'] = function () {
  var expected = 0.13368055555038674
    , actual = convert(1).from('lbspg').to('lbpcft');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};


tests['lbpcft to lblpg'] = function () {
  var expected = 6.22883545920839
    , actual = convert(1).from('lbpcft').to('lblpg');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['lblpg to lbpcft'] = function () {
  var expected = 0.16054365323162478
    , actual = convert(1).from('lblpg').to('lbpcft');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};


tests['lbpcft to slpcft'] = function () {
  var expected = 32.174048556911856
    , actual = convert(1).from('lbpcft').to('slpcft');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['slpcft to lbpcft'] = function () {
  var expected = 0.031080950171102198
    , actual = convert(1).from('slpcft').to('lbpcft');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};


tests['lbpcft to tspcy'] = function () {
  assert.strictEqual( convert(1).from('lbpcft').to('tspcy') , 74.07407407410713);
};

tests['tspcy to lbpcft'] = function () {
  assert.strictEqual( convert(1).from('tspcy').to('lbpcft') , 0.013499999999993975);
};


tests['lbpcft to tlpcy'] = function () {
  assert.strictEqual( convert(1).from('lbpcft').to('tlpcy') , 82.962962963);
};

tests['tlpcy to lbpcft'] = function () {
  assert.strictEqual( convert(1).from('tlpcy').to('lbpcft') , 0.012053571428566048);
};

// Cross-system

tests['kgpcm to lbpcft'] = function () {
  var expected = 0.0624279606
    , actual = convert(1).from('kgpcm').to('lbpcft');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['lbpcft to kgpcm'] = function () {
  var expected = 16.01846337374285
    , actual = convert(1).from('lbpcft').to('kgpcm');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

module.exports = tests;
