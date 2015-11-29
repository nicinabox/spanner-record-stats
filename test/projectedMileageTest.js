import { last, takeRight, partialRight, sortBy, reject, compose } from 'lodash'
import expect from 'unexpected'
import milesPerDaySet from '../lib/milesPerDaySet'
import currentProjectedMileage from '../lib/currentProjectedMileage'
import rawMiniRecords from '../data/mini.json'
import rawGuzziRecords from '../data/guzzi.json'
import rawSuzukiRecords from '../data/suzuki.json'

var sortRecords = (records) => sortBy(reject(records, ({mileage}) => !mileage), 'mileage')
var percent     = (n, p) => n * (p / 100)
var bounds      = (n, variance) => n + variance
var lower       = (mi) => bounds(mi, -variance(mi))
var upper       = (mi) => bounds(mi, variance(mi))
var cpm         = (records) => currentProjectedMileage(lastSeason(records), last(records))
var lastSeason  = compose(partialRight(takeRight, 4), milesPerDaySet)
var variance    = partialRight(percent, 1)

describe('mini', function () {
  const ACTUAL_MILEAGE = 137854
  var records = sortRecords(rawMiniRecords)

  it('cpm should be within 1%', function () {
    expect(cpm(records), 'to be within', lower(ACTUAL_MILEAGE), upper(ACTUAL_MILEAGE))
  });
});

describe('guzzi', function () {
  const ACTUAL_MILEAGE = 7554
  var records = sortRecords(rawGuzziRecords)

  it('cpm should be within 1%', function () {
    expect(cpm(records), 'to be within', lower(ACTUAL_MILEAGE), upper(ACTUAL_MILEAGE))
  });
});

describe('suzuki', function () {
  const ACTUAL_MILEAGE = 4413
  var records = sortRecords(rawSuzukiRecords)

  it('cpm should be within 1%', function () {
    expect(cpm(records), 'to be within', lower(ACTUAL_MILEAGE), upper(ACTUAL_MILEAGE))
  });
});
