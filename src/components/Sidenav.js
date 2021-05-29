import React from 'react';
import styles from 'styles/Sidenav.module.scss';
import cx from 'classnames';
import { ReactComponent as CryptoSVG } from 'svgs/crypto.svg';
import { ReactComponent as RewardsSVG } from 'svgs/rewards.svg';
import { ReactComponent as CardSVG } from 'svgs/card.svg';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';

const items = [
  {label: 'Crypto', href: '/crypto', icon: CryptoSVG},
  {label: 'Rewards', href: '/rewards', icon: RewardsSVG},
  {label: 'Cards', href: '/cards', icon: CardSVG},
];

function Sidenav() {
  const { pathname } = useLocation();

  return (
    <aside className={styles.container}>
      <nav aria-label="primary-navigation">
        <ul className={styles.list}>
          {items.map((entry,i) => {
            return (
              <List 
                key={i} 
                data={entry}
              />
            )
          })}
        </ul>
      </nav>
    </aside>
  );
}

function List({ data }) {
  const match = useRouteMatch(data.href);

  const itemClass = cx({
    [styles.item]: true,
    [styles.itemActive]: match && data.href,
  });

  return (
    <li className={itemClass}>
      <Link to={data.href}>
        <i><data.icon /></i>
        <span>{data.label}</span>
      </Link>
    </li>
  )
}

export default Sidenav;
