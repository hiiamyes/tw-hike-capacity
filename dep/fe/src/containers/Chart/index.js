import React from 'react';
import _ from 'lodash';

import styles from './styles.css';
import classNames from 'classnames/bind';
let cx = classNames.bind(styles);

import moment from 'moment';
import * as d3 from 'd3';

const bandWidth = 40;

class Chart extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.hut && nextProps.hut.beds.length !== 0) {
      this.draw(nextProps.hut.beds);
    }
  }

  draw(beds) {
    const width = bandWidth * beds.length;

    let x = d3
      .scaleBand()
      .domain(beds.map(b => moment(b.date).format('MM/DD')))
      .range([0, width]);

    let y = d3
      .scaleLinear()
      .domain([0, d3.max(beds, b => Math.max(b.applying, b.remaining))])
      .rangeRound([450, 0])

    let xAxis = d3.axisBottom(x)

    d3.selectAll(`g.${cx('barRemaining')}`).remove()
    d3.selectAll(`g.${cx('barApplying')}`).remove()

    const gg = d3
      .select(`.${cx('x', 'axis').replace(/\s/, '.')}`)
      .attr('transform', `translate(0, 450)`)
      .call(xAxis);

    // d3
    //   .selectAll(`.tick`)
    //   .attr('class', d => {
    //     console.log(d);
    //     'gg'
    //   })

    let barApplying = d3
      .select(`.${cx('barsApplying')}`)
      .selectAll(`g.${cx('barApplying')}`)
      .data(beds)
      .enter()
      .append('g')
      .attr('class', cx('barApplying'))
      .attr('transform', d => `translate(${x(moment(d.date).format('MM/DD'))}, 0)`)

    barApplying
      .append('rect')
      .attr('x', d => x.bandwidth()/4)
      .attr('y', d => y(d.applying))
      .attr('width', x.bandwidth()/4)
      .attr('height', d => 450 - y(d.applying))

    barApplying
      .append('text')
      .attr('x', x.bandwidth()/4)
      .attr('y', d => y(d.applying))
      // .attr('dx', 3)
      // .attr('dy', '.35em')
      .text( d => d.applying );

    let barRemaining = d3
      .select(`.${cx('barsRemaining')}`)
      .selectAll(`g.${cx('barRemaining')}`)
      .data(beds)
      .enter()
      .append('g')
      .attr('class', cx('barRemaining'))
      .attr('transform', d => `translate(${x(moment(d.date).format('MM/DD'))}, 0)`)

    barRemaining
      .append('rect')
      .attr('x', x.bandwidth()*2/4)
      .attr('y', d => y(d.remaining))
      .attr('width', x.bandwidth()/4)
      .attr('height', d => 450 - y(d.remaining))

    barRemaining
      .append('text')
      .attr('x', x.bandwidth()*2/4)
      .attr('y', d => y(d.remaining))
      // .attr('dx', 3)
      // .attr('dy', '1em')
      .text( d => d.remaining );

  }

  render() {
    const {hut} = this.props;
    const width = (!hut) ? 0 : bandWidth * hut.beds.length;

    return (
      <svg
        className={cx('root')}
        style={{width: `${width}px`}}>
        <g className={cx('chart')}>
          <g className={cx('x', 'axis')} />
          <g className={cx('barsRemaining')} />
          <g className={cx('barsApplying')} />
        </g>
      </svg>
    )
  }
}

export default Chart;
