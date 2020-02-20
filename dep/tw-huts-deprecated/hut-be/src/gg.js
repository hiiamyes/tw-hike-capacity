var moment = require('moment');

// var today = moment().year(2016).month(4).date(25);
var today = moment().date(25);
var dateDiff = today.diff(moment(), 'd');

console.log(today.format(), moment().format(), dateDiff);
