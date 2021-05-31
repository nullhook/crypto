import React from 'react';
import styles from 'styles/Graph.module.scss';
import GraphTimeline from 'components/GraphTimeline';
import * as d3 from 'd3';

const formatDate = (date) => {
  return date.toLocaleString('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

function Graph({ payload, balance, setData }) {
  const EMPTY_DATA = React.useMemo(() => [], []);
  const loading = payload == null || balance == null;
  const data = loading ? EMPTY_DATA : payload;
  // TODO: Handle error state
  const pathRef = React.useRef();
  const bRef = React.useRef();
  const textRef = React.useRef();
  const circleRef = React.useRef();

  const width = 760;
  const height = 150;

  const mapX = d3.scaleUtc()
      .domain(d3.extent(data, d => d.date))
      .range([0, width]);
  
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
      .duration(2000)
      .ease(d3.easeLinear)
      .attr('stroke-dashoffset', 0);

    return () => {
      path.interrupt(); /* Cancel scheduled timer on unmount */
    }
  }, [data]);

  const handleMouseMove = (e) => {
    const [x,y] = d3.pointer(e);

    const tooltip = d3.select(textRef.current);
    const marker = d3.select(circleRef.current);
    
    const bisect = d3.bisector(d => d.date).left; /* custom accessor */
    const date = mapX.invert(x); /* find value in from domain */

    const idx = bisect(data, date, 1); /* find insertion index */
    const a = data[idx-1];
    const b = data[idx];
    const match = b && (date - a.date > b.date - date) ? b : a;

    // TODO: handle tooltips that are out of bounds within the viewBox
    tooltip
      .style('display', null)
      .attr('transform', `translate(${x}, ${10})`)
      .text(`${formatDate(match.date)}: $${match.value.toFixed(2)}`);

    marker
      .style('display', null)
      .attr('cx', mapX(data[idx]?.date))
      .attr('cy', mapY(data[idx]?.value))
  }

  const handleMouseLeave = (e) => {
    const tooltip = textRef.current;
    const marker = circleRef.current;

    d3.select(tooltip).style('display', 'none');
    d3.select(marker).style('display', 'none');
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.balance}>
          <span>Balance</span>
          <data ref={bRef} value={balance}>
            ${new Intl.NumberFormat('en-US').format(balance)}
          </data>
        </div>
        <div className={styles.timeline}>
          <GraphTimeline
            setData={setData}
            data={data}
          />
        </div>
      </div>
      <svg 
        id="chart" 
        viewBox={`0 0 ${width}, ${height}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <defs>
          <linearGradient
            id="grad"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1={loading ? 0 : mapY(0)}
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
        <text
          ref={textRef}
          style={{ 
            fontSize: 11,
            fontWeight: 'normal',
            color: 'black',
            pointerEvents: 'none',
          }}
        />
        <circle
          ref={circleRef}
          r="4"
          cx="-100"
          fill="url(#grad)"
        />
      </svg>
    </div>
  );
}

export default Graph;
