import React, { PropTypes } from 'react';
import moment from 'moment';

import MobileMenu from './MobileMenu.js';
import SideBar from './SideBar.js';
import Chart from './Chart.js';
import TitleBar from './TitleBar.js';
import * as actions from '../reducers/hut';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hutNameZh: '樂樂山屋'
    };
  }

  componentWillMount() {
    this.props.actions.load();
  }

  onHutClick(hutNameZh) {
    this.setState({hutNameZh: hutNameZh})
  }

  render() {
    if (this.props.data.length === 0) {
      return null
    }else {
      var hut = this.props.data.filter( (hut) => hut.nameZh === this.state.hutNameZh );

      var ss = {};
      hut[0].capacityStatuses.status.forEach( s => {
        var month = moment(s.date).month();
        if (ss[month]) {
          ss[month].push(s);
        }else{
          ss[month] = [s];
        }
      })

      var maxApplying = Math.max(...hut[0].capacityStatuses.status.map( s => s.applying));

      Object.keys(ss).forEach( key => {
        var startDay = moment(ss[key][0].date).day();
        for (var i = 0; i < startDay; i++) {
          ss[key].unshift({date: null});
        }
        var endDay = moment(ss[key][ss[key].length-1].date).day();
        for (var j = 0; j < 6 - endDay; j++) {
          ss[key].push({date: null});
        }
      })

      return (
        <div id='app'>
          <MobileMenu
            data={this.props.data}
            onHutClick={this.onHutClick.bind(this)}/>
          <div id='navbar'>
            <div>台灣山屋</div>
          </div>
          <div id='content'>
            <SideBar
              data={this.props.data}
              onHutClick={this.onHutClick.bind(this)}/>
            <div id='hut'>
              <TitleBar hut={hut}/>
              <div id='calendar'>
                <div className='hint-container'>
                  <div className='icon-remaining-hint'></div>
                  <div className='remaining-hint'>剩餘</div>
                  <div className='icon-applying-hint'></div>
                  <div className='applying-hint'>候補</div>
                </div>
                {Object.keys(ss).map( month => {
                  return (
                    <div>
                      <div className='month'>{`${parseInt(month)+1}月`}</div>
                      <div id='chart-container'>
                        {ss[month].map( s => <Chart s={s} capacity={hut[0].capacity} maxApplying={maxApplying}/> )}
                      </div>
                      {/*<div className='divider'></div>*/}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

App.propTypes = {
  children: PropTypes.element
};

function mapStateToProps(state) {
  return {
    data: state.hut.data
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
