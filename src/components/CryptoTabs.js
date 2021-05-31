import React from 'react';
import styles from 'styles/CryptoTabs.module.scss';
import { ReactComponent as MoreSVG } from 'svgs/more.svg';
import cx from 'classnames';
import UserActions from './UserActions';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  {id: 1, label: 'Portfolio', href: '/crypto/portfolio'},
  {id: 2, label: 'Prices', href: '/crypto/prices'},
  {id: 3, label: 'DeFi', href: '/crypto/defi'},
  {id: 4, label: 'NFTs', href: '/crypto/nfts'},
  {id: 5, label: 'Accounts', href: '/crypto/accounts'},
];

function CryptoTabs() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  const toggleDropdown = () => setIsMenuOpen(state => !state);

  return (
    <header className={styles.container}>
      <nav className={styles.nav} aria-label="portfolio-navigation">
        <ul className={styles.navList}>
          {navItems.map((entry,i) => {
            const itemClass = cx({
              [styles.navItem]: true,
              [styles.navItemActive]: entry.href === location.pathname,
            });

            return (
              <li 
                className={itemClass} 
                key={entry.id}
              >
                <Link to={entry.href}>
                  {entry.label}
                </Link>
              </li>
            )
          })}
        </ul>
        <div className={styles.right}>
          <button onClick={toggleDropdown} className={styles.moreIco}>
            <MoreSVG />
            <span className={styles.hideLabel}>More options</span>
          </button>
        </div>
      </nav>
      {isMenuOpen && <UserActions setIsMenuOpen={setIsMenuOpen} />}
    </header>
  );
}

export default CryptoTabs;
