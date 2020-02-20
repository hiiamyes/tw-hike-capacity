import React from 'react';
import moment from 'moment';

const Chart = (props) => {
  if (props.s.date) {
    return (
      <div className='chart'>
        <div className='day'>{moment(props.s.date).format('D')}</div>
        <div className='bar-container'>
          <div className='bar'>
            <div className='count-remaining'>{props.s.remaining}</div>
            <div
              className='remaining'
              style={{height: `${props.s.remaining/props.capacity*100}%`}}></div>
          </div>
          <div className='bar'>
            <div className='count-applying'>{props.s.applying}</div>
            <div
              className='applying'
              style={{height: `${props.s.applying/props.maxApplying*100}%`}}></div>
          </div>
        </div>
        <div className='baseline'></div>
      </div>
    );
  }else{
    return (
      <div className='chart' style={{visibility: 'hidden'}}>
        <div className='bar-container'>
          <div className='bar'>
            <div className='count'>10</div>
            <div className='remaining'></div>
          </div>
          <div className='bar'>
            <div className='count'>20</div>
            <div className='applying'></div>
          </div>
        </div>
        <div className='day'>gg</div>
      </div>
    );
  }
};

export default Chart;
