import expect from 'unexpected'
import average from '../lib/average'
import standardDeviation from '../lib/standardDeviation'
import confidenceInterval from '../lib/confidenceInterval'
import elapsedDays from '../lib/elapsedDays'

describe('formulas', function () {
  var set = [1, 2, 3, 4, 5]

  it('elapsed days', function () {
    expect(elapsedDays('2013-09-10T00:00:00.000Z', '2014-03-03T00:00:00.000Z'),
      'to be', 174)
  })

  it('average', function () {
    expect(average(set), 'to equal', 3)
  })

  it('standard deviation', function () {
    expect(standardDeviation(set).toFixed(3), 'to equal', '1.414')
  })

  it('confidence interval', function () {
    expect(confidenceInterval(set).toFixed(3), 'to equal', '1.240')
  })
})
