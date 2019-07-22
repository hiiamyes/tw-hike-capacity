const axios = require("axios");
const cheerio = require("cheerio");

const urls = {
  sheipa: "https://npm.cpami.gov.tw/bed_1.aspx",
  taroko: "https://npm.cpami.gov.tw/bed_4.aspx"
};

const getHuts = async admin => {
  const url = urls[admin];
  let { data } = await axios.get(url);
  $ = cheerio.load(data);
  let index = 0;
  let huts = [];
  while (true) {
    let name = $(`#ContentPlaceHolder1_Repeater_List_name_${index}`);
    let room = $(`#ContentPlaceHolder1_Repeater_List_HiddenField1_${index}`);
    if (name.length === 0) break;
    huts.push({
      admin,
      url,
      name: name.text(),
      room: Number.parseInt(room.val())
    });
    index++;
  }
  return huts;
};

module.exports = getHuts;
