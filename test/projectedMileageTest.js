import { last, takeRight, partialRight, sortBy, reject, compose } from 'lodash'
import expect from 'unexpected'
import milesPerDaySet from '../lib/milesPerDaySet'
import currentProjectedMileage from '../lib/currentProjectedMileage'
import rawMiniRecords from '../data/mini.json'
import rawGuzziRecords from '../data/guzzi.json'
import rawSuzukiRecords from '../data/suzuki.json'

var lastSeason = compose(partialRight(takeRight, 4), milesPerDaySet)

var sortRecords = (records) => {
  return sortBy(reject(records, ({mileage}) => !mileage), 'mileage')
}

var percent = (n, p) => {
  return n * (p / 100)
}

var bounds = (n, variance) => {
  return n + variance
}

var variance = partialRight(percent, 1)

var lower = (mi) => bounds(mi, -variance(mi))
var upper = (mi) => bounds(mi, variance(mi))

var cpm = (records) => {
  return currentProjectedMileage(lastSeason(records), last(records))
}

describe('mini', function () {
  const ACTUAL_MILEAGE = 137854
  var records = sortRecords(rawMiniRecords)

  it('should be within 1%', function () {
    expect(cpm(records), 'to be within', lower(ACTUAL_MILEAGE), upper(ACTUAL_MILEAGE))
  });
});

describe('guzzi', function () {
  const ACTUAL_MILEAGE = 7554
  var records = sortRecords(rawGuzziRecords)

  it('should be within 1%', function () {
    expect(cpm(records), 'to be within', lower(ACTUAL_MILEAGE), upper(ACTUAL_MILEAGE))
  });
});

describe('suzuki', function () {
  const ACTUAL_MILEAGE = 4413
  var records = sortRecords(rawSuzukiRecords)

  it('should be within 1%', function () {
    expect(cpm(records), 'to be within', lower(ACTUAL_MILEAGE), upper(ACTUAL_MILEAGE))
  });
});
