const moment = require('moment');

/* current date/time */
var date = moment();

var timestamp = 1434;
var date = moment(timestamp);

var timestampNow = moment().valueOf();

console.log(date.format('YYYY-MM-DD'));
console.log(date.subtract(1, 'year').fromNow());

