import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from 'containers/App/actions';

import moment from 'moment';
import _ from 'lodash';

import styles from './styles.css';
import classNames from 'classnames/bind';
let cx = classNames.bind(styles);

import HorizontalLayout from 'components/HorizontalLayout';
import VerticalLayout from 'components/VerticalLayout';

const daysTitleEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const daysTitle = ['日', '一', '二', '三', '四', '五', '六'];

const startDay = moment().startOf('week');
const endDay = moment().startOf('week').add(2, 'months').endOf('week');
const days = [...new Array(endDay.diff(startDay, 'days') + 1)].map((d, i) =>
  moment(startDay).add(i, 'day').format());

class Calendar extends React.Component {
  constructor(props) {
    super(props);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return !this.props.huts.equals(nextProps.huts);
  // }

  render() {
    const language = this.props.reducer.get('language');
    const huts = this.props.huts.filter(h => h.get('isSelected'));

    return (
      <div className={cx('calendar')}>
        <div className={cx('header')}>
          {(language === 'zh' ? daysTitle : daysTitleEn).map((dt, i) => {
            return <div key={i} className={cx('dayTitle')}>{dt}</div>;
          })}
        </div>
        <div className={cx('dayContainer')}>
          {days.map((day, i) => {
            return (
              <div key={i} className={cx('dayContent')}>
                <div className={cx('day')}>
                  <span style={{ display: moment(day).date() === 1 ? '' : 'none' }}>
                    {`${moment(day).format('MMM')} `}
                  </span>
                  <div className={cx('date', { today: moment(day).isSame(moment(), 'day') })}>
                    <span>{moment(day).date()}</span>
                  </div>
                </div>
                <VerticalLayout className={cx('huts')}>
                  {huts.map((hut, iHut) => {
                    const bed = hut
                      .get('beds')
                      .find(b => b.get('date') === moment(day).format('YYYY-MM-DD'));
                    const name = hut.get(language === 'zh' ? 'name' : 'nameEn');
                    return (
                      <VerticalLayout key={iHut} className={cx('hut')}>
                        <a href={hut.get('url')} target="_blank" className={cx('name')}>
                          {bed ? name : ''}
                        </a>
                        <HorizontalLayout className={cx('count')}>
                          <div
                            className={cx('remaining', { gone: bed && bed.get('remaining') === 0 })}
                            alt="剩餘床位數"
                          >
                            {bed ? bed.get('remaining') : ''}
                          </div>
                          <div className={cx('applying')} alt="申請中人數">
                            {bed ? bed.get('applying') : ''}
                          </div>
                        </HorizontalLayout>
                      </VerticalLayout>
                    );
                  })}
                </VerticalLayout>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ AppReducer }) {
  return {
    reducer: AppReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
