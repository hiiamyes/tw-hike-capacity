const moment = require('moment');
const async = require('async');
const request = require('request');
const cheerio = require('cheerio');

var getFormThisMonth = ($, rooms) => {
  return {
    __EVENTVALIDATION: $('#__EVENTVALIDATION').val(),
    __VIEWSTATE: $('#__VIEWSTATE').val(),
    ctl00$ContentPlaceHolder1$rooms: rooms,
    ctl00$ScriptManager1: 'ctl00$ScriptManager1|ctl00$ContentPlaceHolder1$btnsearch',
    ctl00$ContentPlaceHolder1$btnsearch: '查詢'
  }
}

var getFormNextMonth = ($, rooms) => {
  return {
    __EVENTVALIDATION: $('#__EVENTVALIDATION').val(),
    __VIEWSTATE: $('#__VIEWSTATE').val(),
    ctl00$ContentPlaceHolder1$ddlMonth: moment().month() + 2,
    ctl00$ContentPlaceHolder1$ddlYear: moment().year(),
    ctl00$ContentPlaceHolder1$hidMonth: moment().month() + 2,
    ctl00$ContentPlaceHolder1$hidYear: moment().year(),
    ctl00$ContentPlaceHolder1$rooms: rooms,
    ctl00$ScriptManager1: 'ctl00$ScriptManager1|ctl00$ContentPlaceHolder1$btnsearch',
    ctl00$ContentPlaceHolder1$btnsearch: '查詢'
  }
}

var parser = ($) => {
  var capacityStatus = [];
  for (var i = 1; i <= 42; i++) {
    var index = `0${i}`.substr(-2);
    var gg = `#ContentPlaceHolder1_cc_${index} a`
    if ($(gg).length) {
      var remaining = parseInt($(`${gg} span:nth-of-type(1)`).text());
      var waiting = parseInt($(`${gg} span:nth-of-type(2)`).text());
      var applying = parseInt($(`${gg} span:nth-of-type(3)`).text());
      capacityStatus.push({
        // 'date': moment().add(8 + capacityStatus.length, 'day').format(),
        'remaining': remaining,
        'applying': applying + waiting,
        'isDrawn': true,
      });
    }
  }
  return capacityStatus;
}

/**
 * hutCrawlerSheiPa.crawl(rooms, (err, capacityStatus) => {});
 */
exports.crawl = (rooms, cb) => {
  var url = 'http://npm.cpami.gov.tw/bed_1.aspx';
  async.waterfall([
    (cb) => {
      request.get(url, function(err, res, body){
        if (err) {
          cb('err', null);
        }else {
          $ = cheerio.load(body);
          cb(null, $);
        }
      })
    },
    ($, cb) => {
      request.post({
        url: url,
        form: getFormThisMonth($, rooms)
      }, function(err, res, body){
        if (err) {
          cb('err', null);
        }else {
          $ = cheerio.load(body);
          cb(null, $, parser($));
        }
      })
    },
    ($, capacityStatus, cb) => {
      request.post({
        url: url,
        form: getFormNextMonth($, rooms)
      }, function(err, res, body){
        if (err) {
          cb('err', null);
        }else {
          $ = cheerio.load(body);
          cb(null, capacityStatus.concat(parser($)));
        }
      })
    }
  ],
  (err, capacityStatus) => {
    if (err) {
      cb('err', null);
    }else {
      capacityStatus = capacityStatus.map( (c,i) => {
        c.date = moment().add(8+i, 'day').format();
        return c
      })
      cb(null, capacityStatus);
    }
  })
}
