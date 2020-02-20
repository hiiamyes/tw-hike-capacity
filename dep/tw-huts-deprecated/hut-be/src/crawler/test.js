const hutCrawlerSheiPa = require('./hutCrawlerSheiPa.js');
const hutCrawlerTaroko = require('./hutCrawlerTaroko.js');
const hutCrawlerYushan = require('./hutCrawlerYushan.js');
const hutCrawlerTianchi = require('./hutCrawlerTianchi.js');
const hutCrawlerTaiwanForestRecreation = require('./hutCrawlerTaiwanForestRecreation.js');

// 七卡
// hutCrawlerSheiPa.crawl(10, (err, capacityStatus) =>{
//   console.log(capacityStatus);
// });

// 黑水塘
// hutCrawlerTaroko.crawl(124, (err, capacityStatus) =>{
  // console.log(capacityStatus);
// });

// hutCrawlerTaroko.crawl({
//   rooms: 152 // 南湖
// }, (err, capacityStatus) => {
//   console.log(capacityStatus);
// });

// hutCrawlerYushan.crawl(1, '排雲山莊', 92).then(capacityStatus => {
  // console.log(capacityStatus);
// })

// hutCrawlerTianchi.crawl().then(capacityStatus => {
//   console.log(capacityStatus);
// })

hutCrawlerTaiwanForestRecreation.crawl('嘉明湖避難山屋').then(capacityStatus => {
  console.log(capacityStatus);
})
