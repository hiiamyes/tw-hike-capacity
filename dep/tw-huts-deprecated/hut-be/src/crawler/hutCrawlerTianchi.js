var moment = require('moment');
var request = require('request');
var cheerio = require('cheerio');

var crawlByMonth = (date, cb) => {
  return new Promise( (resolve, reject) => {
    var capacityStatus = [];
    var year = date.year();
    var month = `0${date.month() + 1}`.slice(-2);
    var url = `http://tconline.forest.gov.tw/order/?year=${year}&month=${month}`;

    request(url, (err, res, body) => {
      if (err) console.log(err);
      var $ = cheerio.load(body);
      $('.in_calendar_date').each( (i, ele) => {
        var status = $(ele).closest('table').find('td').eq(1).clone();
        status.find('br').replaceWith(',');
        status = status.text().split(',');
        var remaining = parseInt(status[0].split(':')[1]);
        var today = moment().year(year).month(date.month()).date(i + 1);
        var dateDiff = today.diff(moment(), 'd');
        if (dateDiff >= 7 && dateDiff <= 45) {
          if (!Number.isInteger(remaining)) {
            return capacityStatus.push({
              'date': today.format(),
              'remaining': 0,
              'applying': 0,
              'isDrawn': dateDiff <= 29
            });
          } else {
            var applying = parseInt(status[1].split(':')[1]);
            var isDrawn = status[2];
            return capacityStatus.push({
              'date': today.format(),
              'remaining': remaining,
              'applying': applying,
              'isDrawn': isDrawn === '已抽名單'
            });
          }
        }
      });
      resolve(capacityStatus);
    });
  });
};

exports.crawl = () => {
  return new Promise( (resolve, reject) => {
    Promise.all([
      crawlByMonth(moment().add(7, 'd')), // this month
      crawlByMonth(moment().add(7, 'd').add(1, 'M')), // next month
      crawlByMonth(moment().add(7, 'd').add(2, 'M')) // next next month
    ])
    .then( (values) => {
      var capacityStatus = [].concat.apply([], values);
      resolve(capacityStatus);
    })
  })
}
