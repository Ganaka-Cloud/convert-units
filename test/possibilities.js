var convert = require('../lib')
  , assert = require('assert-diff')
  , tests = {};

assert.options.strict = true;

function getCurrencyCodes() {
  try {
    const defs = require('../lib/definitions/currency');
    return Object.keys(defs.currency);
  } catch (_) {
    return [];
  }
}

tests['l possibilities'] = function () {
  var actual = convert().from('l').possibilities()
    , expected = [ 'mm3', 'cm3', 'ml', 'cl', 'dl', 'l', 'kl', 'm3', 'km3', 'tsp', 'Tbs', 'in3', 'fl-oz', 'cup', 'pnt', 'qt', 'gal', 'ft3', 'yd3', 'gill', 'bbl-oil', 'bbl-beer', 'bu', 'pk', 'fl-oz-UK' ];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['kg possibilities'] = function () {
  var actual = convert().from('kg').possibilities()
    , expected = [ 'μg', 'mg', 'g', 'kg', 'mt', 'u', 'Da', 'oz', 'lb', 't', 'stone', 'grain', 'slug' ];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['m possibilities'] = function () {
  var actual = convert().from('m').possibilities()
    , expected = [ 'nm', 'μm', 'mm', 'cm', 'm', 'km', 'Å', 'ly', 'AU', 'pc', 'in', 'yd', 'ft-us', 'ft', 'mi', 'nMi', 'fathom', 'furlong', 'chain' ];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['each possibilities'] = function () {
  var actual = convert().possibilities('Each')
    , expected = [ 'ea', 'dz' ];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['mass possibilities'] = function () {
  var actual = convert().possibilities('Mass')
    , expected = [ 'μg', 'mg', 'g', 'kg', 'mt', 'u', 'Da', 'oz', 'lb', 't', 'stone', 'grain', 'slug' ];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['volume possibilities'] = function () {
  var actual = convert().possibilities('Volume')
    , expected = [ 'mm3', 'cm3', 'ml', 'cl', 'dl', 'l', 'kl', 'm3', 'km3', 'tsp', 'Tbs', 'in3', 'fl-oz', 'cup', 'pnt', 'qt', 'gal', 'ft3', 'yd3', 'gill', 'bbl-oil', 'bbl-beer', 'bu', 'pk', 'fl-oz-UK' ];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['volume flow rate possibilities'] = function () {
  var actual = convert().possibilities('VolumeFlowRate')
    , expected = [ 'mm3/s', 'cm3/s', 'ml/s', 'cl/s', 'dl/s', 'l/s', 'l/min', 'l/h', 'kl/s', 'kl/min', 'kl/h', 'm3/s', 'm3/min', 'm3/h', 'km3/s', 'tsp/s', 'Tbs/s', 'in3/s', 'in3/min', 'in3/h', 'fl-oz/s', 'fl-oz/min', 'fl-oz/h', 'cup/s', 'pnt/s', 'pnt/min', 'pnt/h', 'qt/s', 'gal/s', 'gal/min', 'gal/h', 'ft3/s', 'ft3/min', 'ft3/h', 'yd3/s', 'yd3/min', 'yd3/h' ];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['length possibilities'] = function () {
  var actual = convert().possibilities('Length')
    , expected = [ 'nm', 'μm', 'mm', 'cm', 'm', 'km', 'Å', 'ly', 'AU', 'pc', 'in', 'yd', 'ft-us', 'ft', 'mi', 'nMi', 'fathom', 'furlong', 'chain' ];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['temperature possibilities'] = function () {
  var actual = convert().possibilities('Temperature')
    , expected = ['C', 'K', 'F', 'R'];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['time possibilities'] = function () {
  var actual = convert().possibilities('Time')
    , expected = ['ns', 'μs', 'ms', 's', 'min', 'h', 'd', 'week', 'month', 'year', 'fortnight', 'shake', 'svedberg', 'yr-julian'];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['digital possibilities'] = function() {
  var actual = convert().possibilities('Digital')
    , expected = [ 'b', 'Kb', 'Mb', 'Gb', 'Tb', 'B', 'KB', 'MB', 'GB', 'TB' ];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['partsPer possibilities'] = function() {
  var actual = convert().possibilities('PartsPer')
    , expected = [ 'ppm', 'ppb', 'ppt', 'ppq' ];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['pressure possibilities'] = function() {
  var actual = convert().possibilities('Pressure')
    , expected = [ 'Pa', 'kPa', 'MPa', 'GPa', 'hPa', 'bar', 'torr', 'atm', 'mmHg', 'cmH2O', 'mbar', 'psi', 'ksi', 'inHg', 'inH2O'];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['speed possibilities'] = function() {
  var actual = convert().possibilities('Speed')
    , expected = [ 'm/s', 'km/h', 'm/h', 'knot', 'ft/s'];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['current possibilities'] = function() {
  var actual = convert().possibilities('Current')
    , expected = [ 'A', 'mA', 'kA'];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['voltage possibilities'] = function() {
  var actual = convert().possibilities('Voltage')
    , expected = [ 'V', 'mV', 'kV'];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['power possibilities'] = function() {
  var actual = convert().possibilities('Power')
    , expected = [ 'W', 'mW', 'kW', 'MW', 'GW', 'hp-mech', 'hp-met', 'hp-elec', 'hp-boiler', 'tonRef'];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['reactive power possibilities'] = function() {
  var actual = convert().possibilities('ReactivePower')
    , expected = [ 'VAR', 'mVAR', 'kVAR', 'MVAR', 'GVAR'];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['apparent power possibilities'] = function() {
  var actual = convert().possibilities('ApparentPower')
    , expected = [ 'VA', 'mVA', 'kVA', 'MVA', 'GVA'];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['energy possibilities'] = function() {
  var actual = convert().possibilities('Energy')
    , expected = [ 'Wh', 'mWh', 'kWh', 'MWh', 'GWh', 'J', 'kJ', 'cal', 'kcal', 'erg', 'eV', 'keV', 'MeV', 'therm', 'quad', 'toe', 'Btu(IT)'];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['reactive energy possibilities'] = function() {
  var actual = convert().possibilities('ReactiveEnergy')
    , expected = [ 'VARh', 'mVARh', 'kVARh', 'MVARh', 'GVARh'];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['frequency possibilities'] = function() {
  var actual = convert().possibilities('Frequency')
    , expected = [ 'Hz', 'mHz', 'kHz', 'MHz', 'GHz', 'THz', 'rpm', 'deg/s', 'rad/s'];
  assert.deepEqual(actual.sort(), expected.sort())
};

tests['illuminance possibilities'] = function() {
    var actual = convert().possibilities('Illuminance')
      , expected = [ 'lx', 'ft-cd'];
    assert.deepEqual(actual.sort(), expected.sort())
};

tests['acceleration possibilities'] = function() {
  var actual = convert().possibilities('Acceleration')
    , expected = [ 'km/s2', 'm/s2', 'dm/s2', 'cm/s2', 'mm/s2', 'g-force', 'in/s2', 'ft/s2', 'yd/s2', 'mi/s2', 'g-force:US'];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['area-moment possibilities'] = function() {
  var actual = convert().possibilities('Area-moment')
    , expected = [ 'm4', 'cm4', 'mm4', 'in4', 'ft4'];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['area possibilities'] = function() {
  var actual = convert().possibilities('Area')
    , expected = [ 'mm2', 'cm2', 'm2', 'ha', 'km2', 'in2', 'yd2', 'ft2', 'ac', 'mi2'];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['force possibilities'] = function() {
  var actual = convert().possibilities('Force')
    , expected = [ 'dyn', 'N', 'daN', 'kN', 'kgf', 'tfM', 'pond', 'kp', 'lbf', 'kipf', 'pdl', 'tfs', 'tfl'];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['moment possibilities'] = function() {
  var actual = convert().possibilities('Moment')
    , expected = [ 'μNm', 'Nmm', 'Ncm', 'Nm', 'kNm', 'kgfm', 'tfMm', 'tfsm', 'tflm', 'lbf-in', 'lbf-ft', 'pdl-ft', 'pdl-in'];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['mass-moment possibilities'] = function() {
  var actual = convert().possibilities('Mass-moment')
    , expected = [ 'kgm2', 'kgcm2', 'kgmm2', 'kgfms2', 'lb-in2', 'lb-ft2', 'lbf-ins2', 'lbf-fts2'];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['section-modulus possibilities'] = function() {
  var actual = convert().possibilities('Section-modulus')
    , expected = [ 'zm3', 'zcm3', 'zmm3', 'zin3', 'zft3'];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['thermal-expansion possibilities'] = function() {
  var actual = convert().possibilities('Thermal-expansion')
    , expected = [ 'mm/mm', 'cm/cm', 'm/m', 'in/in', 'yd/yd', 'ft-us/ft-us', 'ft/ft'];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['thermal-conductivity possibilities'] = function() {
  var actual = convert().possibilities('Thermal-conductivity')
    , expected = [ 'W/mm/C', 'W/cm/C', 'mW/m/C', 'cW/m/C', 'W/m/C', 'kW/m/C', 'W/m/K', 'kW/m/K', 'Btu.in/hr/sq.ft/F', 'Btu.in/s/sq.ft/F', 'Btu/hr/ft/F'];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['specific-heat-capacity possibilities'] = function() {
  var actual = convert().possibilities('Specific-heat-capacity')
    , expected = [ 'J/g/C', 'J/kg/C', 'mJ/kg/C', 'kJ/kg/C', 'mJ/kg/K', 'J/kg/K', 'kJ/kg/K', 'kgf-m/kg/C', 'Btu/lbm/F'];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['stefan-boltzmann possibilities'] = function() {
  var actual = convert().possibilities('Stefan-Boltzmann')
    , expected = [ 'W/m2/K4', 'Btu/hr/sq.ft/R4'];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['stress-intensity-factor possibilities'] = function() {
  var actual = convert().possibilities('Stress-Intensity-Factor')
    , expected = [ 'Pa-sqrt(m)', 'kPa-sqrt(m)', 'hPa-sqrt(m)', 'MPa-sqrt(m)', 'psi-sqrt(in)', 'ksi-sqr(in)'];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['j-integral possibilities'] = function() {
  var actual = convert().possibilities('J-integral')
    , expected = [ 'J/sqm', 'kJ/sqm', 'ft-lbs/sqin'];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['crack-growth-rate-corrparam possibilities'] = function() {
  var actual = convert().possibilities('Crack-growth-rate-CorrParam')
    , expected = [ 'MPam/h'];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['percent possibilities'] = function() {
  var actual = convert().possibilities('Percent')
    , expected = [ 'percent'];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['density possibilities'] = function() {
  var actual = convert().possibilities('Density')
    , expected = [ 'gpcc', 'gpcm', 'kgpcm', 'tpcmm', 'kgpl', 'gpl', 'ozpcin', 'ozpcft', 'ozspg', 'ozlpg', 'tspcy', 'tlpcy', 'lbpcin', 'lbpcft', 'lbpcy', 'lbspg', 'lblpg', 'slpcft'];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['boltzmann possibilities'] = function() {
  var actual = convert().possibilities('Boltzmann')
    , expected = [ 'J/K', 'ev/K', 'ft-lb/R'];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['linearcte possibilities'] = function() {
  var actual = convert().possibilities('LinearCTE')
    , expected = [ '/C', '/F', '/K', '/R'];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['pace possibilities'] = function() {
  var actual = convert().possibilities('Pace')
    , expected = [ 'min/km', 's/m', 'min/mi', 's/ft'];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['angle possibilities'] = function() {
  var actual = convert().possibilities('Angle')
    , expected = [ 'rad', 'deg', 'grad', 'arcmin', 'arcsec'];
  assert.deepEqual(actual.sort(), expected.sort());
};

tests['all possibilities'] = function () {
  var actual = convert().possibilities()
    // Please keep these sorted for maintainability
    , expected = [
        '/C', '/F', '/K', '/R',
        'A', 'B', 'Btu(IT)', 'Btu.in/hr/sq.ft/F', 'Btu.in/s/sq.ft/F', 'Btu/hr/ft/F', 'Btu/hr/sq.ft/R4', 'Btu/lbm/F',
        'C', 'F', 'GB', 'GHz', 'GPa', 'GVA', 'GVAR', 'GVARh', 'GW', 'GWh', 'Gb',
        'Hz', 'J', 'J/K', 'J/g/C', 'J/kg/C', 'J/kg/K', 'J/sqm',
        'K', 'KB', 'Kb', 'MB', 'MHz', 'MPa', 'MPa-sqrt(m)', 'MPam/h', 'MVA', 'MVAR', 'MVARh', 'MW', 'MWh', 'Mb',
        'N', 'Ncm', 'Nm', 'Nmm',
        'Pa', 'Pa-sqrt(m)', 'R', 'TB', 'THz', 'Tb', 'Tbs', 'Tbs/s',
        'V', 'VA', 'VAR', 'VARh',
        'W', 'W/cm/C', 'W/m/C', 'W/m/K', 'W/m2/K4', 'W/mm/C', 'Wh',
        'ac', 'arcmin', 'arcsec', 'atm',
        'AU',
        'Å',
        'b', 'bar', 'bbl-beer', 'bbl-oil', 'bu',
        'cW/m/C', 'cal', 'chain', 'cl', 'cl/s', 'cmH2O', 'cm', 'cm/cm', 'cm/s2', 'cm2', 'cm3', 'cm3/s', 'cm4',
        'cup', 'cup/s',
        'Da', 'd', 'daN', 'deg', 'deg/s', 'dl', 'dl/s', 'dm/s2', 'dyn', 'dz',
        'ea', 'eV', 'erg', 'ev/K',
        'fl-oz', 'fl-oz-UK', 'fl-oz/h', 'fl-oz/min', 'fl-oz/s', 'fortnight', 'ft', 'ft-cd', 'ft-lb/R', 'ft-lbs/sqin', 'ft-us', 'ft-us/ft-us', 'ft/ft', 'ft/s', 'ft/s2', 'ft2', 'ft3', 'ft3/h', 'ft3/min', 'ft3/s', 'ft4', 'fathom', 'furlong',
        'g', 'g-force', 'g-force:US', 'gal', 'gal/h', 'gal/min', 'gal/s', 'gill', 'gpcc', 'gpcm', 'gpl', 'grad', 'grain',
        'h', 'hPa', 'hPa-sqrt(m)', 'ha', 'hp-boiler', 'hp-elec', 'hp-mech', 'hp-met',
        'in', 'in/in', 'inH2O', 'inHg', 'in/s2', 'in2', 'in3', 'in3/h', 'in3/min', 'in3/s', 'in4',
        'kA', 'kHz', 'kJ', 'kJ/kg/C', 'kJ/kg/K', 'kJ/sqm', 'kN', 'kNm', 'kPa', 'kPa-sqrt(m)', 'kV', 'kVA', 'kVAR', 'kVARh', 'kW', 'kW/m/C', 'kW/m/K', 'kWh', 'kp', 'kcal', 'keV',
        'kg', 'kgcm2', 'kgf', 'kgf-m/kg/C', 'kgfm', 'kgfms2', 'kgm2', 'kgmm2', 'kgpcm', 'kgpl', 'kipf',
        'kl', 'kl/h', 'kl/min', 'kl/s', 'km', 'km/h', 'km/s2', 'km2', 'km3', 'km3/s', 'knot', 'ksi', 'ksi-sqr(in)',
        'l', 'l/h', 'l/min', 'l/s', 'lb', 'lb-ft2', 'lb-in2', 'lbf', 'lbf-ft', 'lbf-fts2', 'lbf-in', 'lbf-ins2', 'lblpg', 'lbpcft', 'lbpcin', 'lbpcy', 'lbspg', 'ly', 'lx',
        'm', 'm/h', 'm/m', 'm/s', 'm/s2', 'm2', 'm3', 'm3/h', 'm3/min', 'm3/s', 'm4', 'mA', 'mHz', 'mJ/kg/C', 'mJ/kg/K', 'mV', 'mVA', 'mVAR', 'mVARh', 'mW', 'mW/m/C', 'mWh', 'mbar', 'mg', 'mi', 'mi/s2', 'mi2', 'min', 'min/km', 'min/mi', 'ml', 'ml/s', 'mm', 'mm/mm', 'mm/s2', 'mm2', 'mm3', 'mm3/s', 'mm4', 'mmHg', 'month', 'ms', 'mt',
        'MeV',
        'nMi', 'nm', 'ns',
        'oz', 'ozlpg', 'ozpcft', 'ozpcin', 'ozspg',
        'pc', 'pdl', 'pdl-ft', 'pdl-in', 'percent', 'pk', 'pnt', 'pnt/h', 'pnt/min', 'pnt/s', 'pond', 'ppb', 'ppm', 'ppq', 'ppt', 'psi', 'psi-sqrt(in)',
        'qt', 'qt/s', 'quad',
        'rad', 'rad/s', 'rpm',
        's', 's/ft', 's/m', 'shake', 'slpcft', 'slug', 'stone', 'svedberg',
        't', 'tfM', 'tfMm', 'tfl', 'tflm', 'tfs', 'tfsm', 'therm', 'tlpcy', 'toe', 'tonRef', 'torr', 'tpcmm', 'tsp', 'tsp/s', 'tspcy',
        'u',
        'week',
        'yd', 'yd/s2', 'yd/yd', 'yd2', 'yd3', 'yd3/h', 'yd3/min', 'yd3/s', 'year', 'yr-julian',
        'zcm3', 'zft3', 'zin3', 'zm3', 'zmm3', 'μNm', 'μg', 'μm', 'μs',
        'Ah', 'mAh', 'c', 'mC', 'μC', 'nC', 'pC',
        'Pa*s', 'P', 'cP',
        'm2/s', 'St', 'cSt',
        'N*m', 'kN*m', 'MN*m', 'lbf*ft', 'ozf*in',
        'N/m', 'mN/m', 'dyn/cm',
        'Gy', 'Sv', 'mGy', 'mSv', 'μGy', 'μSv', 'RAD', 'rem',
        'Bq', 'kBq', 'MBq', 'GBq', 'Ci', 'mCi', 'μCi', 'Rd',
        'Wb', 'mWb', 'μWb', 'Mx',
        'T', 'mT', 'μT', 'nT', 'G',
        'A/m', 'kA/m', 'Oe',
        'cd/m2', 'sb', 'La', 'fL',
        'sr', 'deg2',
        'V/m', 'kV/m', 'MV/m', 'mV/m',
        'mol/s', 'mol/min', 'mmol/s', 'μmol/s',
        'dBW', 'dBm',
        'dB', 'Np'
  ];
  // merge currency codes
  expected = expected.concat(getCurrencyCodes());
  try {
    assert.deepEqual(actual.sort(), expected.sort());
  }
  catch (e) {
    // This gets too long, and gets truncated
    process.stderr.write(e + '\n');
    throw e;
  }
};

module.exports = tests;
