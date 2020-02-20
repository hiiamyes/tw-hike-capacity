var moment = require('moment');
var request = require('request');
var cheerio = require('cheerio');

var crawlgg = (nameZh, formArgu, date) => {
	return new Promise( (resolve, reject) => {
		request({
			'method': 'POST',
			'url': url[nameZh],
			'form': {
				'__EVENTVALIDATION': formArgu.eventValidation,
				'__VIEWSTATE': formArgu.viewState,
				'ctl00$ContentPlaceHolder1$DropDownListHouse': DropDownListHouse[nameZh],
				'ctl00$ContentPlaceHolder1$DropDownListyyyy': `${moment(date).year()}`,
				'ctl00$ContentPlaceHolder1$DropDownListMM': `${moment(date).format('MM')}`,
				'ctl00$ContentPlaceHolder1$ButtonActQuery': '查詢'
			}
		}, (err, res, body) => {
			if (err) {
				reject();
			}else{
				var gg = [];
				var lol = 'ContentPlaceHolder1_DataGrid_AskFor_';
				var $ = cheerio.load(body);
				for (var i = 0; i < 31; i++) {
					if ($(`#${lol}AnlessCount_${i}`).text()) {
						var remaining = parseInt($(`#${lol}AnlessCount_${i}`).text());
						var applying = parseInt($(`#${lol}CheckCount_${i}`).text()) + parseInt($(`#${lol}AskCount_${i}`).text());
						gg.push({
							date: moment(date).date(i+1).format(),
							remaining: remaining,
							applying: applying,
							isDrawn: true
						});
					}
				}
				resolve(gg);
			}
		});
	})
}

const url = {
	'檜谷山莊': 'http://recreation.forest.gov.tw/askformonhouse/AskSearchHouse.aspx?AskDeptID=06',
	'檜谷營地': 'http://recreation.forest.gov.tw/askformonhouse/AskSearchHouse.aspx?AskDeptID=06',
	'向陽山屋': 'http://recreation.forest.gov.tw/askformonhouse/AskSearchHouse.aspx?AskDeptID=07',
	'嘉明湖避難山屋': 'http://recreation.forest.gov.tw/askformonhouse/AskSearchHouse.aspx?AskDeptID=07'
}

const DropDownListHouse = {
	'檜谷山莊': 'C',
	'檜谷營地': 'E',
	'向陽山屋': 'A',
	'嘉明湖避難山屋': 'B'
}

var getFormArgu = () => {
	return new Promise( (resolve, reject) => {
		request.get('http://recreation.forest.gov.tw/askformonhouse/AskSearchHouse.aspx?AskDeptID=07', (err, res, body) => {
			if (err) {
				reject();
			}else {
				$ = cheerio.load(body);
				var eventValidation = $('#__EVENTVALIDATION').val();
				var viewState = $('#__VIEWSTATE').val();
				resolve({eventValidation, viewState});
			}
		})
	});
}

exports.crawl = (nameZh) => {
	return new Promise( (resolve, reject) => {
		getFormArgu()
		.then(formArgu => {
			return Promise.all([
				crawlgg(nameZh, formArgu, moment()), // this month
				crawlgg(nameZh, formArgu, moment().add(1,'M')) // next month
			])
		})
		.then(values => {
			var capacityStatus = values[0].concat(values[1]);
			capacityStatus = capacityStatus.slice(moment().date() + 7, moment().date() + 7 + 23)
			resolve(capacityStatus);
		})
	});
};
