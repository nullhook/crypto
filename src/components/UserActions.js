import React from 'react';
import styles from 'styles/UserActions.module.scss';
import { ReactComponent as LockSVG } from 'svgs/lock.svg';
import { ReactComponent as SettingsSVG } from 'svgs/settings.svg';

const items = [
  {label: 'Lock Crypto Wallet', href: '', icon: LockSVG },
  {label: 'Settings', href: '', icon: SettingsSVG },
];

function UserActions({ setIsMenuOpen }) {
  const ref = React.useRef();

  React.useEffect(() => {
    const handleOutsideClick = (e) => {
      const withinBox = e.composedPath().includes(ref.current);
      if (!withinBox) setIsMenuOpen(false);
    }
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    }

  }, []);

  return (
    <section ref={ref} className={styles.container}>
      <ul className={styles.list}>
        {items.map((entry,i) => {
          return (
            <li key={i} className={styles.item}>
              <a href="#">
                <i>{<entry.icon />}</i>
                <span>{entry.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default UserActions;
