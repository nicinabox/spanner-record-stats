import { last, takeRight, partialRight, sortBy, reject, compose } from 'lodash'
import expect from 'unexpected'
import milesPerDaySet from '../lib/milesPerDaySet'
import currentProjectedMileage from '../lib/currentProjectedMileage'

var sortRecords = (records) => sortBy(reject(records, ({mileage}) => !mileage), 'mileage')
var percent     = (n, p) => n * (p / 100)
var bounds      = (n, variance) => n + variance
var lower       = (mi) => bounds(mi, -variance(mi))
var upper       = (mi) => bounds(mi, variance(mi))
var cpm         = (records) => currentProjectedMileage(lastSeason(records), last(records))

var projectedAccuracy = (actual, projected) => (actual - projected) / actual * 100

var lastSeason  = compose(partialRight(takeRight, 5), milesPerDaySet)
var variance    = partialRight(percent, 1)

var runSuite = function (name, actualMileage, rawRecords) {
  describe(name, function () {
    var records = sortRecords(rawRecords)

    it('cpm should be within 1%', function () {
      expect(projectedAccuracy(actualMileage, cpm(records)), 'to be within', -1, 1)
    })

    it('should be in range', function () {
      expect(cpm(records), 'to be within', lower(actualMileage), upper(actualMileage))
    })
  })
}

runSuite('mini', 137854, require('../data/mini.json'))
runSuite('guzzi', 7554, require('../data/guzzi.json'))
runSuite('suzuki', 4413, require('../data/suzuki.json'))
