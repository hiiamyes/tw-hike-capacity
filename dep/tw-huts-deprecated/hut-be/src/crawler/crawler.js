var async = require('async');
var moment = require('moment');
var request = require('request');
var cheerio = require('cheerio');
var hutCrawlerTaiwanForestRecreation = require('./hutCrawlerTaiwanForestRecreation.js');
var hutCrawlerSheiPa = require('./hutCrawlerSheiPa.js');
var hutCrawlerTaroko = require('./hutCrawlerTaroko.js');
var hutCrawlerYushan = require('./hutCrawlerYushan.js');
var hutCrawlerTianchi = require('./hutCrawlerTianchi.js');

var cc = (hut) => {
  return new Promise( (resolve, reject) => {
    switch (hut.admin) {
      case '台灣山林悠遊網':
        hutCrawlerTaiwanForestRecreation.crawl(hut.nameZh)
        .then(capacityStatus => {
          resolve(capacityStatus);
        })
        .catch( () => resolve())
        break;
      case '雪霸國家公園':
        hutCrawlerSheiPa.crawl(hut.rooms, (err, capacityStatus) => {
          if (err) {
            reject();
          }else{
            resolve(capacityStatus);
          }
        });
        break;
      case '太魯閣國家公園':
        hutCrawlerTaroko.crawl(hut.rooms, (err, capacityStatus) => {
          if (err) {
            reject();
          }else{
            resolve(capacityStatus);
          }
        });
        break;
      case '玉山國家公園':
        hutCrawlerYushan.crawl(hut.ddlLocation, hut.nameZh, hut.capacity)
        .then(capacityStatus => {
          resolve(capacityStatus);
        })
        .catch( () => reject());
        break;
      case '南投林區管理處':
        hutCrawlerTianchi.crawl().then(capacityStatus => {
          resolve(capacityStatus);
        });
        break;
    }
  })
}

var updateDB = (collection, hutNameZh, capacityStatus) => {
  return new Promise( (resolve, reject) => {
    collection.updateOne({
      'nameZh': hutNameZh
    }, {
      $set: {
        'capacityStatuses': {
          'dateCrawl': moment().format(),
          'status': capacityStatus
        }
      }
    }, (err, r) => {
      if (err) {
        reject();
      }else{
        resolve();
      }
    });
  })
}

exports.crawl = (collection, huts) => {
  var crawlOnce = () => {
    huts.forEach( hut => {
      if (hut.isApplicable) {
        cc(hut)
        .then(capacityStatus => {
          return updateDB(collection, hut.nameZh, capacityStatus)
        })
        .then(() => {
          console.log(`success crawling ${hut.nameZh}`);
        })
        .catch(() => {
          console.log(`fail crawling ${hut.nameZh}`);
        })
      }
    })
  }

  var reCrawlTime = 1 * 60 * 60 * 1000; // 1hr
  crawlOnce();
  setInterval(crawlOnce, reCrawlTime);
}
