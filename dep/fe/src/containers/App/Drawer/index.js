import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';

import styles from './styles.css';
import classNames from 'classnames/bind';
let cx = classNames.bind(styles);

import SearchBar from './SearchBar';
import { List, ListItem } from 'material-ui/List';

const adminName = {
  sheipa: {
    zh: '雪霸',
    en: 'Shei-Pa'
  },
  taroko: {
    zh: '太魯閣',
    en: 'Taroko'
  },
  yushan: {
      zh: '玉山',
      en: 'Yushan'
  },
  tconline: {
    zh: '天池',
    en: 'Tianchi'
  },
  kgonline: {
    zh: '檜谷',
    en: 'Kuaigu'
  },
  jmlnt: {
    zh: '嘉明湖',
    en: 'Jiaming Lake'
  }
};

class Drawer extends Component {
  render() {
    const language = this.props.reducer.get('language');
    const { admins, toggle } = this.props;
    return (
      <div id="drawer" className={cx('drawer', { isOpen: toggle })}>
        <SearchBar language={language} onChange={text => this.props.actions.onSearchBarChange(text)} />
        <nav>
          {_.keys(admins).map((admin, iAdmin) => {
            return (
              <div className={cx('admin')} key={iAdmin}>
                <div className={cx('name')}>{`${adminName[admin][language]}`}</div>
                <div className={cx('huts')}>
                  {admins[admin].map((hut, iHut) => {
                    return (
                      <div
                        key={iHut}
                        className={cx('hut', { selected: hut.isSelected })}
                        onClick={() => this.props.actions.onHutClick(hut.name)}>
                        {`${language === 'zh' ? hut.name : hut.nameEn} (${hut.size || 'x'})`}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>
      </div>
    );
  }
}

function mapStateToProps({ AppReducer }) {
  return {
    reducer: AppReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
