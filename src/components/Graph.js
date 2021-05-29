import React from 'react';
import styles from 'styles/Graph.module.scss';
import GraphTimeline from 'components/GraphTimeline';
import * as d3 from 'd3';

function Graph({ payload, balance }) {
  const loading = payload == null || balance == null;
  const data = loading ? [] : payload;

  const pathRef = React.useRef();
  const bRef = React.useRef();
  const width = 760;
  const height = 150;

  const mapX = d3.scaleUtc()
      .domain(d3.extent(data, d => d.date))
      .range([10, width-20]);
  
  const mapY = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)])
    .nice()
    .range([height, 20]);
  
  const line = d3.line()
    .curve(d3.curveMonotoneX)
    .x(d => mapX(d.date))
    .y(d => mapY(d.value))

  React.useEffect(() => {
    const path = d3.select(pathRef.current)
        .datum(data)
        .attr('d', line);
    
    const len = path.node().getTotalLength();
  
    path.attr('stroke-dasharray', `${len},${len}`)
      .attr("stroke-dashoffset", len)
      .transition()
      .duration(3000)
      .ease(d3.easeLinear)
      .attr('stroke-dashoffset', 0);
  
    return () => {
      // Cancel scheduled timer on unmount
      path.interrupt();
    }
  }, [data]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.balance}>
          <span>Balance</span>
          <data ref={bRef} value={balance}>
            {new Intl.NumberFormat('en-US').format(balance)}
          </data>
        </div>
        <div className={styles.timeline}>
          <GraphTimeline />
        </div>
      </div>
      <svg 
        id="chart" 
        viewBox={`0 0 ${width}, ${height}`}
      >
        <defs>
          <linearGradient
            id="grad"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1={mapY(0)}
            x2="0"
            y2={mapY(d3.max(data, d => d.value))}
          >
            <stop stopColor="#6F4CD2" />
            <stop offset="0.5625" stopColor="#BF14A2" />
            <stop offset="1" stopColor="#F73A1C" />
          </linearGradient>
        </defs>
        <path
          ref={pathRef}
          stroke="url(#grad)"
          fill="none"
          strokeWidth="1.2"
        />
      </svg>
    </div>
  );
}

export default Graph;
