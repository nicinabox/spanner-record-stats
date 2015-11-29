import _ from 'lodash'
import moment from 'moment'
import data from './data/mini.json'

var dataset

dataset = _.sortBy(data, 'mileage')
dataset = _.reject(dataset, ({mileage}) => !mileage)
dataset = _.map(dataset, ({mileage, date}) => [moment(new Date(date)).unix(), mileage])

// console.log(JSON.stringify(dataset, null, 2));

var csv = [['date', 'mileage']].concat(dataset).map((d) => d.join(',')).join('\n')
console.log(csv);
