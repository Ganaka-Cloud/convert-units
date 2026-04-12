var convert = require('../lib')
  , assert = require('assert')
  , tests = {};

tests['measures'] = function () {
  var actual = convert().measures()
    , expected = [ 'Length', 'Acceleration', 'Area-moment', 'Area', 'Force', 'Mass', 'Moment', 'Mass-moment', 'Section-modulus', 'Thermal-expansion', 'Thermal-conductivity', 'Specific-heat-capacity', 'Stefan-Boltzmann', 'Stress-Intensity-Factor', 'J-integral', 'Crack-growth-rate-CorrParam', 'Percent', 'Density', 'Boltzmann', 'Volume', 'Each', 'Temperature', 'LinearCTE', 'Time', 'Digital', 'PartsPer', 'Speed', 'Pace', 'Pressure', 'Current', 'Voltage', 'Power', 'ReactivePower', 'ApparentPower', 'Energy', 'ReactiveEnergy', 'VolumeFlowRate', 'Illuminance', 'Frequency', 'Angle', 'Currency', 'Charge', 'Viscosity', 'Kinematic-viscosity', 'Torque', 'Surface-tension', 'Radiation-dose', 'Radiation-activity', 'Magnetic-flux', 'Magnetic-flux-density', 'Magnetic-field-strength', 'Luminance', 'Solid-angle', 'Electric-field', 'Substance-flow', 'Logarithmic-power', 'Logarithmic-ratio', 'Resistance', 'Conductance', 'Capacitance', 'Inductance', 'Luminous-flux', 'Luminous-intensity', 'Amount-of-substance', 'Catalytic-activity' ];
  assert.deepEqual(actual, expected);
};

module.exports = tests;
