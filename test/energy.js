var convert = require('../lib')
  , assert = require('assert')
  , tests = {}
  , ACCURACY = 1/1000
  , percentError = require('../lib/percentError');

tests['Wh to Wh'] = function () {
  assert.strictEqual( convert(1).from('Wh').to('Wh') , 1);
};

tests['mWh to mWh'] = function () {
  assert.strictEqual( convert(1).from('mWh').to('mWh') , 1);
};

tests['kWh to kWh'] = function () {
  assert.strictEqual( convert(1).from('kWh').to('kWh') , 1);
};

tests['MWh to MWh'] = function () {
  assert.strictEqual( convert(1).from('MWh').to('MWh') , 1);
};

tests['GWh to GWh'] = function () {
  assert.strictEqual( convert(1).from('GWh').to('GWh') , 1);
};

tests['J to J'] = function () {
  assert.strictEqual( convert(1).from('J').to('J') , 1);
};

tests['kJ to kJ'] = function () {
  assert.strictEqual( convert(1).from('kJ').to('kJ') , 1);
};

tests['Wh to J'] = function () {
  assert.strictEqual( convert(1).from('Wh').to('J') , 3600);
};

tests['Wh to mWh'] = function () {
  assert.strictEqual( convert(1).from('Wh').to('mWh') , 1000);
};

tests['Wh to kWh'] = function () {
  assert.strictEqual( convert(1).from('Wh').to('kWh') , 0.001);
};

tests['Wh to MWh'] = function () {
  assert.strictEqual( convert(1).from('Wh').to('MWh') , 0.000001);
};

tests['Wh to GWh'] = function () {
  assert.strictEqual( convert(1).from('Wh').to('GWh') , 0.000000001);
};

tests['GWh to mWh'] = function () {
  assert.strictEqual( convert(1).from('GWh').to('mWh'), 1000000000000);
}

tests['GWh to J'] = function () {
  assert.strictEqual( convert(1).from('GWh').to('J'), 3600000000000);
}

tests['MWh to mWh'] = function () {
  assert.strictEqual( convert(1).from('MWh').to('mWh'), 1000000000);
}

tests['kWh to mWh'] = function () {
  assert.strictEqual( convert(1).from('kWh').to('mWh'), 1000000);
}

tests['mWh to kWh'] = function () {
  assert.strictEqual( convert(1).from('mWh').to('kWh'), 0.000001);
}

tests['mWh to Wh'] = function () {
  assert.strictEqual( convert(1).from('mWh').to('Wh'), 0.001);
}

tests['kWh to Wh'] = function () {
  assert.strictEqual( convert(1).from('kWh').to('Wh'), 1000);
}

tests['kWh to kJ'] = function () {
  assert.strictEqual( convert(1).from('kWh').to('kJ'), 3600);
}

// New units: cal, kcal, erg, eV, keV, MeV, therm, quad, toe
tests['cal to J'] = function () {
  assert.strictEqual( convert(1).from('cal').to('J') , 4.184);
};

tests['J to cal'] = function () {
  var expected = 1
    , actual = convert(4.184).from('J').to('cal');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['kcal to J'] = function () {
  assert.strictEqual( convert(1).from('kcal').to('J') , 4184);
};

tests['kcal to cal'] = function () {
  assert.strictEqual( convert(1).from('kcal').to('cal') , 1000);
};

tests['erg to J'] = function () {
  assert.strictEqual( convert(1).from('erg').to('J') , 1e-7);
};

tests['eV to J'] = function () {
  assert.strictEqual( convert(1).from('eV').to('J') , 1.602176634e-19);
};

tests['keV to eV'] = function () {
  var expected = 1000
    , actual = convert(1).from('keV').to('eV');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['MeV to keV'] = function () {
  var expected = 1000
    , actual = convert(1).from('MeV').to('keV');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['therm to J'] = function () {
  assert.strictEqual( convert(1).from('therm').to('J') , 1.05506e8);
};

tests['quad to therm'] = function () {
  var expected = 1e10
    , actual = convert(1).from('quad').to('therm');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['toe to J'] = function () {
  assert.strictEqual( convert(1).from('toe').to('J') , 4.1868e10);
};

// New energy units: Eh (hartree), Ry (rydberg), tTNT, ft-lb
tests['Eh to J'] = function () {
  var expected = 4.3597447222071e-18
    , actual = convert(1).from('Eh').to('J');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['Ry to J'] = function () {
  var expected = 2.1798723611e-18
    , actual = convert(1).from('Ry').to('J');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['Eh to Ry'] = function () {
  var expected = 2
    , actual = convert(1).from('Eh').to('Ry');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['tTNT to J'] = function () {
  var expected = 4.184e9
    , actual = convert(1).from('tTNT').to('J');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['ft-lb to J'] = function () {
  var expected = 1.3558179483
    , actual = convert(1).from('ft-lb').to('J');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

// Cross-system: metric (J) <-> imperial (Btu(IT))
// 1 Btu(IT) = 1055.056 J  (ISO 31-4 / NIST)
tests['Btu(IT) to J'] = function () {
  var expected = 1055.056
    , actual = convert(1).from('Btu(IT)').to('J');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['J to Btu(IT)'] = function () {
  var expected = 1 / 1055.056
    , actual = convert(1).from('J').to('Btu(IT)');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['kJ to Btu(IT)'] = function () {
  var expected = 1000 / 1055.056
    , actual = convert(1).from('kJ').to('Btu(IT)');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['cal to Btu(IT)'] = function () {
  // 1 cal = 4.184 J; 4.184/1055.056 Btu
  var expected = 4.184 / 1055.056
    , actual = convert(1).from('cal').to('Btu(IT)');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

module.exports = tests;
