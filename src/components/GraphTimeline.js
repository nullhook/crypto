import React from 'react';
import styles from 'styles/GraphTimeline.module.scss';
import cx from 'classnames';

const items = [
  {label: '1D', desc: '1 Day', },
  {label: '1W', desc: '1 Week', },
  {label: '1M', desc: '1 Month', },
  {label: '3M', desc: '3 Months', },
  {label: '1Y', desc: '1 Year', },
  {label: 'ALL', desc: 'All', },
]

function GraphTimeline() {
  const [currItem, setCurrItem] = React.useState(0);

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {items.map((entry,i) => {
          const itemClass = cx({
            [styles.item]: true,
            [styles.itemActive]: i === currItem,
          });

          return (
            <li
              tabIndex={0}
              key={i}
              className={itemClass}
              onClick={() => setCurrItem(i)}
              role="button"
              aria-label={entry.desc}
            >
              {entry.label}
            </li>
          )
        })}
      </ul>
    </div>
  );
}

export default GraphTimeline;
