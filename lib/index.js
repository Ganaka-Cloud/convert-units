"use strict";

const keys = require("lodash.keys");
const each = require("lodash.foreach");

const measures = {
  Length: require("./definitions/length"),
  Acceleration: require("./definitions/acceleration"),
  "Area-moment": require("./definitions/area-moment"),
  Area: require("./definitions/area"),
  Force: require("./definitions/force"),
  Mass: require("./definitions/mass"),
  Moment: require("./definitions/moment"),
  "Mass-moment": require("./definitions/mass-moment"),
  "Section-modulus": require("./definitions/section-modulus"),
  "Thermal-expansion": require("./definitions/thermal-expansion"),
  "Thermal-conductivity": require("./definitions/thermal-conductivity"),
  "Specific-heat-capacity": require("./definitions/specific-heat-capacity"),
  "Stefan-Boltzmann": require("./definitions/Stefan-Boltzmann"),
  "Stress-Intensity-Factor": require("./definitions/stress-intensity-factor"),
  "J-integral": require("./definitions/J-integral"),
  "Crack-growth-rate-CorrParam": require("./definitions/crack-growth-rate-CorrParam"),
  Percent: require("./definitions/percentage"),
  Density: require("./definitions/density"),
  Boltzmann: require("./definitions/Boltzmann"),
  Volume: require("./definitions/volume"),
  Each: require("./definitions/each"),
  Temperature: require("./definitions/temperature"),
  LinearCTE: require("./definitions/linearCTE"),
  Time: require("./definitions/time"),
  Digital: require("./definitions/digital"),
  PartsPer: require("./definitions/partsPer"),
  Speed: require("./definitions/speed"),
  Pace: require("./definitions/pace"),
  Pressure: require("./definitions/pressure"),
  Current: require("./definitions/current"),
  Voltage: require("./definitions/voltage"),
  Power: require("./definitions/power"),
  ReactivePower: require("./definitions/reactivePower"),
  ApparentPower: require("./definitions/apparentPower"),
  Energy: require("./definitions/energy"),
  ReactiveEnergy: require("./definitions/reactiveEnergy"),
  VolumeFlowRate: require("./definitions/volumeFlowRate"),
  Illuminance: require("./definitions/illuminance"),
  Frequency: require("./definitions/frequency"),
  Angle: require("./definitions/angle"),
  Currency: require("./definitions/currency"),
  Charge: require("./definitions/charge"),
  Viscosity: require("./definitions/viscosity"),
  "Kinematic-viscosity": require("./definitions/kinematic-viscosity"),
  Torque: require("./definitions/torque"),
  "Surface-tension": require("./definitions/surface-tension"),
  "Radiation-dose": require("./definitions/radiation-dose"),
  "Radiation-activity": require("./definitions/radiation-activity"),
  "Magnetic-flux": require("./definitions/magnetic-flux"),
  "Magnetic-flux-density": require("./definitions/magnetic-flux-density"),
  "Magnetic-field-strength": require("./definitions/magnetic-field-strength"),
  Luminance: require("./definitions/luminance"),
  "Solid-angle": require("./definitions/solid-angle"),
  "Electric-field": require("./definitions/electric-field"),
  "Substance-flow": require("./definitions/substance-flow"),
  "Logarithmic-power": require("./definitions/logarithmic-power"),
  "Logarithmic-ratio": require("./definitions/logarithmic-ratio"),
  Resistance: require("./definitions/resistance"),
  Conductance: require("./definitions/conductance"),
  Capacitance: require("./definitions/capacitance"),
  Inductance: require("./definitions/inductance"),
  "Luminous-flux": require("./definitions/luminous-flux"),
  "Luminous-intensity": require("./definitions/luminous-intensity"),
  "Amount-of-substance": require("./definitions/amount-of-substance"),
  "Catalytic-activity": require("./definitions/catalytic-activity"),
  Action: require("./definitions/action"),
  "Molar-heat": require("./definitions/molar-heat"),
  "Magnetic-moment": require("./definitions/magnetic-moment"),
  Wavenumber: require("./definitions/wavenumber"),
  Permittivity: require("./definitions/permittivity"),
  Permeability: require("./definitions/permeability"),
  "Force-per-charge2": require("./definitions/force-per-charge2"),
  "Spectral-power": require("./definitions/spectral-power"),
  "Temperature-length": require("./definitions/temperature-length"),
};

class Converter {
  constructor(numerator, denominator) {
    if (denominator) this.val = numerator / denominator;
    else this.val = numerator;
    this.origin = null;
    this.destination = null;
  }

  /**
   * Lets the converter know the source unit abbreviation
   */
  from(from) {
    if (this.destination) throw new Error(".from must be called before .to");

    this.origin = this.getUnit(from);

    if (!this.origin) {
      this.throwUnsupportedUnitError(from);
    }

    return this;
  }

  /**
   * Converts the unit and returns the value
   */
  to(to) {
    if (!this.origin) throw new Error(".to must be called after .from");

    this.destination = this.getUnit(to);

    let result;

    if (!this.destination) {
      this.throwUnsupportedUnitError(to);
    }

    // Don't change the value if origin and destination are the same
    if (this.origin.abbr === this.destination.abbr) {
      return this.val;
    }

    // You can't go from liquid to mass, for example
    if (this.destination.measure !== this.origin.measure) {
      throw new Error(
        "Cannot convert incompatible measures of " +
          this.destination.measure +
          " and " +
          this.origin.measure
      );
    }

    /**
     * Convert from the source value to its anchor inside the system
     */
    result = this.val * this.origin.unit.to_anchor;

    /**
     * For some changes it's a simple shift (C to K)
     * So we'll add it when convering into the unit (later)
     * and subtract it when converting from the unit
     */
    if (this.origin.unit.anchor_shift) {
      result -= this.origin.unit.anchor_shift;
    }

    /**
     * Convert from one system to another through the anchor ratio. Some conversions
     * aren't ratio based or require more than a simple shift. We can provide a custom
     * transform here to provide the direct result
     */
    if (this.origin.system !== this.destination.system) {
      const transform =
        measures[this.origin.measure]._anchors[this.origin.system].transform;
      if (typeof transform === "function") {
        result = transform(result);
      } else {
        result *= measures[this.origin.measure]._anchors[this.origin.system].ratio;
      }
    }

    /**
     * This shift has to be done after the system conversion business
     */
    if (this.destination.unit.anchor_shift) {
      result += this.destination.unit.anchor_shift;
    }

    /**
     * Convert to another unit inside the destination system
     */
    return result / this.destination.unit.to_anchor;
  }

  /**
   * Converts the unit to the best available unit.
   */
  toBest(options) {
    if (!this.origin) throw new Error(".toBest must be called after .from");

    const normalizedOptions = Object.assign(
      {
        exclude: [],
        cutOffNumber: 1,
      },
      options
    );

    let best;
    // Looks through every possibility for the 'best' available unit.
    each(this.possibilities(), (possibility) => {
      const unit = this.describe(possibility);
      const isIncluded = normalizedOptions.exclude.indexOf(possibility) === -1;

      if (isIncluded && unit.system === this.origin.system) {
        const result = this.to(possibility);
        if (!best || (result >= normalizedOptions.cutOffNumber && result < best.val)) {
          best = {
            val: result,
            unit: possibility,
            singular: unit.singular,
            plural: unit.plural,
          };
        }
      }
    });

    return best;
  }

  /**
   * Finds the unit — uses a lazy-initialized static cache for O(1) lookups
   */
  getUnit(abbr) {
    if (!Converter._unitCache) {
      const cache = {};
      each(measures, (systems, measure) => {
        each(systems, (units, system) => {
          if (system === "_anchors") return false;

          each(units, (unit, unitAbbr) => {
            cache[unitAbbr] = {
              abbr: unitAbbr,
              measure: measure,
              system: system,
              unit: unit,
            };
          });
        });
      });
      Converter._unitCache = cache;
    }

    return Converter._unitCache[abbr] || null;
  }

  static _describe(resp) {
    return {
      abbr: resp.abbr,
      measure: resp.measure,
      system: resp.system,
      singular: resp.unit.name.singular,
      plural: resp.unit.name.plural,
    };
  }

  /**
   * An alias for getUnit
   */
  describe(abbr) {
    const resp = Converter.prototype.getUnit.call(this, abbr);
    let desc = null;

    try {
      desc = Converter._describe(resp);
    } catch (err) {
      this.throwUnsupportedUnitError(abbr);
    }

    return desc;
  }

  /**
   * Detailed list of all supported units
   */
  list(measure) {
    let list = [];

    each(measures, (systems, testMeasure) => {
      if (measure && measure !== testMeasure) return;

      each(systems, (units, system) => {
        if (system === "_anchors") return false;

        each(units, (unit, abbr) => {
          list = list.concat(
            Converter._describe({
              abbr: abbr,
              measure: testMeasure,
              system: system,
              unit: unit,
            })
          );
        });
      });
    });

    return list;
  }

  throwUnsupportedUnitError(what) {
    let validUnits = [];

    each(measures, (systems) => {
      each(systems, (units, system) => {
        if (system === "_anchors") return false;

        validUnits = validUnits.concat(keys(units));
      });
    });

    throw new Error(
      "Unsupported unit " + what + ", use one of: " + validUnits.join(", ")
    );
  }

  /**
   * Returns the abbreviated measures that the value can be
   * converted to.
   */
  possibilities(measure) {
    let possibilities = [];
    if (!this.origin && !measure) {
      each(keys(measures), (measureKey) => {
        each(measures[measureKey], (units, system) => {
          if (system === "_anchors") return false;

          possibilities = possibilities.concat(keys(units));
        });
      });
    } else {
      const useMeasure = measure || this.origin.measure;
      each(measures[useMeasure], (units, system) => {
        if (system === "_anchors") return false;

        possibilities = possibilities.concat(keys(units));
      });
    }

    return possibilities;
  }

  /**
   * Returns the abbreviated measures that the value can be
   * converted to.
   */
  measures() {
    return keys(measures);
  }
}

Converter._unitCache = null;

const convert = (value) => new Converter(value);

module.exports = convert;
