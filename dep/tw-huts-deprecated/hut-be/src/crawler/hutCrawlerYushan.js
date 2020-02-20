var async = require('async');
var moment = require('moment');
var request = require('request');
var cheerio = require('cheerio');

var parser = (nameZh, capacity, body, year, month) => {
	var selectorRemaining = nameZh.indexOf('營地') === -1 ? 'span.style11 font' : 'span.style12 font';
	var $ = cheerio.load(body);
	var calendarDivId = 'ctl00_ContentPlaceHolder1_CalendarReport';

	var gg = [];
	$(`#${calendarDivId} tr`).each( (i, ele) => {
		if (i >= 3 && i <= 8) {
			$(ele).find('td > a').each( (i, ele) => {
					var registered = $(ele).parent('td').find(selectorRemaining).text();
					var applying = $(ele).parent('td').find('span.style14 font').text();
					gg.push({
						date: moment().year(year).month(month).date(gg.length+1).format(),
						remaining: registered === '' ? capacity : capacity - parseInt(registered),
						applying: applying === '' ? 0 : parseInt(applying),
						isDrawn: true
					});
			});
		}
	});
	return gg;
};

var crawlThisMonth = (ddlLocation, nameZh, capacity) => {
	var url = `https://mountain.ysnp.gov.tw/chinese/Location_Detail.aspx?pg=01&w=1&n=1005&s=${ddlLocation}`;
	return new Promise( (resolve, reject) => {
		request(url, (err, res, body) => {
			if (err) {
				reject()
			}	else{
				resolve({
					body: body,
					data: parser(nameZh, capacity, body, moment().year(), moment().month())
				});
			}
		});
	})
}

var crawlNextMonth = (ddlLocation, nameZh, capacity, body) => {
	var $ = cheerio.load(body);
	var url = `https://mountain.ysnp.gov.tw/chinese/Location_Detail.aspx?pg=01&w=1&n=1005&s=${ddlLocation}`;
	return new Promise( (resolve, reject) => {
		request({
			'method': 'POST',
			'url': url,
			'form': {
				'__EVENTTARGET': 'ctl00$ContentPlaceHolder1$CalendarReport',
				'__EVENTARGUMENT': $('table#ctl00_ContentPlaceHolder1_CalendarReport table tr td:nth-child(3) a').attr('href').substring(68, 68 + 5),
				'__VIEWSTATE': $('#__VIEWSTATE').val(),
				'__VIEWSTATEGENERATOR': $('#__VIEWSTATEGENERATOR').val(),
				'__EVENTVALIDATION': $('#__EVENTVALIDATION').val()
			}
		}, (err, res, body) => {
			if (err) {
				reject();
			}else {
				var nextMonth = moment().add(1, 'M');
				resolve({
					data: parser(nameZh, capacity, body, nextMonth.year(), nextMonth.month())
				});
			}
		});
	})
}

// var crawlBeforeDraw = (date, ddlLocation, capacity) => {
// 	var url = 'https://mountain.ysnp.gov.tw/chinese/LocationAppIndex.aspx?pg=01&w=1&n=1003';
// 	return new Promise( (resolve, reject) => {
// 		request(url, (err, res, body) => {
// 			var $ = cheerio.load(body);
// 			// var date = moment().add(7 + capacityStatus.length, 'd');
// 			request({
// 				'method': 'POST',
// 				'url': url,
// 				'form': {
// 					'ctl00_ContentPlaceHolder1_ToolkitScriptManager1_HiddenField': '',
// 					'__EVENTTARGET': '',
// 					'__EVENTARGUMENT': '',
// 					'__VIEWSTATE': $('#__VIEWSTATE').val(),
// 					'__VIEWSTATEGENERATOR': $('#__VIEWSTATEGENERATOR').val(),
// 					'__VIEWSTATEENCRYPTED': $('#__VIEWSTATEENCRYPTED').val(),
// 					'__EVENTVALIDATION': $('#__EVENTVALIDATION').val(),
// 					'ctl00$ContentPlaceHolder1$txtSDate': date.format('YYYY/MM/DD'),
// 					'ctl00$ContentPlaceHolder1$ddlLocation': ddlLocation,
// 					'ctl00$ContentPlaceHolder1$btnSearch.x': 6,
// 					'ctl00$ContentPlaceHolder1$btnSearch.y': 19,
// 					'ctl00$ContentPlaceHolder1$gvIndex$ctl13$ddlPager': 1
// 				}
// 			}, (err, res, body) => {
// 				if (err) throw err;
// 				$ = cheerio.load(body);
// 				var applying = $('#ctl00_ContentPlaceHolder1_lblPeople').text();
// 				// capacityStatus.push({
// 				// 	'date': date.format(),
// 				// 	'remaining': capacity,
// 				// 	'applying': parseInt(applying),
// 				// 	'isDrawn': false
// 				// });
// 				// cb(null);
// 				resolve({
// 					'date': date.format(),
// 					'remaining': capacity,
// 					'applying': parseInt(applying),
// 					'isDrawn': false
// 				})
// 			});
// 		});
// 	})
// }

// var crawlBeforeDraw = (ddlLocation, capacity) => {
// 	var url = 'https://mountain.ysnp.gov.tw/chinese/LocationAppIndex.aspx?pg=01&w=1&n=1003';
// 	return new Promise( (resolve, reject) => {
// 		async.eachSeries([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], (itmes, cb) => {
// 			request(url, (err, res, body) => {
// 				var $ = cheerio.load(body);
// 				var date = moment().add(7 + capacityStatus.length, 'd');
// 				request({
// 					'method': 'POST',
// 					'url': url,
// 					'form': {
// 						'ctl00_ContentPlaceHolder1_ToolkitScriptManager1_HiddenField': '',
// 						'__EVENTTARGET': '',
// 						'__EVENTARGUMENT': '',
// 						'__VIEWSTATE': $('#__VIEWSTATE').val(),
// 						'__VIEWSTATEGENERATOR': $('#__VIEWSTATEGENERATOR').val(),
// 						'__VIEWSTATEENCRYPTED': $('#__VIEWSTATEENCRYPTED').val(),
// 						'__EVENTVALIDATION': $('#__EVENTVALIDATION').val(),
// 						'ctl00$ContentPlaceHolder1$txtSDate': date.format('YYYY/MM/DD'),
// 						'ctl00$ContentPlaceHolder1$ddlLocation': ddlLocation,
// 						'ctl00$ContentPlaceHolder1$btnSearch.x': 6,
// 						'ctl00$ContentPlaceHolder1$btnSearch.y': 19,
// 						'ctl00$ContentPlaceHolder1$gvIndex$ctl13$ddlPager': 1
// 					}
// 				}, (err, res, body) => {
// 					if (err) throw err;
// 					$ = cheerio.load(body);
// 					var applying = $('#ctl00_ContentPlaceHolder1_lblPeople').text();
// 					capacityStatus.push({
// 						'date': date.format(),
// 						'remaining': capacity,
// 						'applying': parseInt(applying),
// 						'isDrawn': false
// 					});
// 					cb(null);
// 				});
// 			});
// 		},
// 		(err) => {
// 			if (err) throw err;
// 			resolve();
// 		});
// 	})
// }


exports.crawl = (ddlLocation, nameZh, capacity) => {
	var capacityStatus = [];
	return new Promise( (resolve, reject) => {
		crawlThisMonth(ddlLocation, nameZh, capacity)
		.then( (value) => {
			capacityStatus = value.data;
			return crawlNextMonth(ddlLocation, nameZh, capacity, value.body);
		})
		.then( (value) => {
			var begin = moment().date() - 1 + 7;
			var end = begin + 24;
			capacityStatus = capacityStatus.concat(value.data).slice(begin, end);
			resolve(capacityStatus);
			// Promise.all()
			// return crawlBeforeDraw(ddlLocation, capacity);
		})
		.catch(err => reject())
		// .then(() => {
			// resolve(capacityStatus);
		// })
	})
};
