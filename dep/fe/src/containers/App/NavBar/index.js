import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';

import styles from './styles.css';
import classNames from 'classnames/bind';
let cx = classNames.bind(styles);

import tutorial from './tutorial.png';
import tutorialEn from './tuto-en.png';
import HorizontalLayout from 'components/HorizontalLayout';
import VerticalLayout from 'components/VerticalLayout';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    const firstVisit = localStorage.getItem('firstVisit');
    this.state = {
      toggleTutorial: firstVisit === null,
    };
    if (!firstVisit) localStorage.setItem('firstVisit', 'y');
  }

  render() {
    const { onClick, onToggleClick, tour } = this.props;
    const language = this.props.AppReducer.get('language');
    const { setIn } = this.props.actions;
    return (
      <div className={cx('nav-bar')} onClick={() => onClick()}>
        <div
          className={cx('toggle')}
          onClick={e => {
            onToggleClick();
            e.stopPropagation();
          }}
        >
          <i className="fa fa-bars" aria-hidden="true" />
        </div>
        <h3>{`${language === 'zh' ? '台灣山屋餘額查詢網' : 'Mountain Huts Taiwan'}`}</h3>
        <div className={cx('control')}>
          <div
            className={cx('tutorial')}
            style={{ display: this.state.toggleTutorial ? '' : 'none' }}
            onClick={() => this.setState({ toggleTutorial: !this.state.toggleTutorial })}
          >
            <img src={`${language === 'zh' ? tutorial : tutorialEn}`} />
          </div>
          <HorizontalLayout className={cx('languages')}>
            <div
              className={cx('language', { active: language === 'zh' })}
              onClick={() => setIn(['language'], 'zh')}
            >
              中文
            </div>
            <div className={cx('divider')}>|</div>
            <div
              className={cx('language', { active: language === 'en' })}
              onClick={() => setIn(['language'], 'en')}
            >
              En
            </div>
          </HorizontalLayout>
          <button
            className={cx('question')}
            onClick={() => this.setState({ toggleTutorial: !this.state.toggleTutorial })}
          >
            <i className="fa fa-question-circle-o" aria-hidden="true" />
          </button>
          <a
            className={cx('fb-link')}
            href="https://www.facebook.com/%E5%8F%B0%E7%81%A3%E5%B1%B1%E5%B1%8B%E9%A4%98%E9%A1%8D%E6%9F%A5%E8%A9%A2%E7%B6%B2-1605657763052625/"
            target="_blank"
          >
            <i className="fa fa-facebook-official" aria-hidden="true" />
          </a>
        </div>
      </div>
    );
  }
}

export default connect(
  ({ AppReducer }) => ({ AppReducer }),
  dispatch => ({ actions: bindActionCreators(actions, dispatch) }),
)(NavBar);
