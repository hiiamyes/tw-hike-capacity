import React from 'react';

import styles from './styles.css';
import classNames from 'classnames/bind';
let cx = classNames.bind(styles);

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focus: false
    };
  }

  render() {
    const { onChange, language } = this.props;
    return (
      <div className={cx('search-bar')}>
        <div>
          <i className="fa fa-search" aria-hidden="true" />
          <input
            placeholder={`${language === 'zh' ? '搜尋' : 'Search'}`}
            onFocus={e => this.setState({ focus: true })}
            onChange={e => onChange(e.target.value)}
            onBlur={e => this.setState({ focus: false })}
          />
          <i className="fa fa-times" aria-hidden="true" />
        </div>
        <hr />
        <hr className={cx({ focus: this.state.focus })} />
        <div />
      </div>
    );
  }
}
