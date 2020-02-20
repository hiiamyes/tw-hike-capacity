import React from 'react';
import moment from 'moment';

const TitleBar = (props) => {

  const urlApply = {
    '雪霸國家公園': 'http://npm.cpami.gov.tw/',
    '玉山國家公園': 'https://mountain.ysnp.gov.tw/chinese/CP_how01.aspx?pg=03&w=1&n=3001',
    '太魯閣國家公園': 'http://npm.cpami.gov.tw/',
    '台灣山林悠遊網': 'http://recreation.forest.gov.tw/askformonhouse/AskForPaperMain.aspx',
    '南投林區管理處': 'http://tconline.forest.gov.tw/order/'
  }
  return (
    <div id='titlebar'>
      <div className='title'>{props.hut[0].nameZh}</div>
      <div className='info'>
        <div className='bed-count'>床位：{props.hut[0].capacity}</div>
        <div className='update-time'>更新時間：{moment(props.hut[0].capacityStatuses.dateCrawl).format('MM/DD HH:mm')}</div>
      </div>
      <a
        href={urlApply[props.hut[0].admin]}
        target='_blank'
        className='apply'>前往申請</a>
    </div>
  );
};

export default TitleBar;
