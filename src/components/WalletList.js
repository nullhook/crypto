import React from 'react';
import styles from 'styles/WalletList.module.scss';
import { ReactComponent as AddSVG } from 'svgs/plus.svg';
import { ReactComponent as SearchSVG } from 'svgs/search.svg';
import walletData from 'data/wallet';

// Helpers
const prettyNum = (num) => new Intl.NumberFormat('en-US').format(num);
const delay = (t) => new Promise(res => setTimeout(res,t));
const filter = (data, query, keys) => {
  if (query == null) return data;
  return data.filter(d => {
    for (const key of keys) {
      if (d[key].toLowerCase().includes(query)) {
        return true;
      }
    }
  });
}
const fetchData = async () => {
  await delay(Math.random() * 4000);
  // TODO: Fake network errors here
  return walletData;
}

function WalletList() {
  const [data, setData] = React.useState({ 
    payload: null, 
    loading: true, 
  }); // TODO: Add error state
  const [query, setQuery] = React.useState();

  React.useEffect(() => {
    let canceled = false;

    fetchData().then(data => {
      if (canceled) return;
      setData({ payload: data, loading: false });
    }); // TODO: Add error handling

    return () => {
      canceled = true;
    }
  }, []);

  const handleSubmit = (e) => e.preventDefault();
  const handleSearch = (e) => {
    setQuery(e.target.value.toLowerCase());
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <i className={styles.searchIco}><SearchSVG /></i>
        <form 
          onSubmit={handleSubmit} 
          className={styles.form} 
          role="search" 
          action="/" 
          method="post"
        >
          <label htmlFor="search">Search Coins</label>
          <input 
            type="text" 
            placeholder="Search Coins" 
            title="Search Coins"
            name="search"
            onChange={handleSearch}
          />
          <button type='submit'>Submit</button>
        </form>
      </div>
      {data.loading ? 
        <LoadingSkeleton />
        : <List 
            data={filter(data.payload, query, ['name', 'symbol'])} 
          />
      }
      <button className={styles.addBtn}>
        <i><AddSVG /></i>
        <span>Add Coin</span>
      </button>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <ul className={styles.walletList}>
      {Array.from({ length: 4 }, (v,i) => i).map(x => {
        return (
          <li key={x}>
            <div className={styles.walletName} style={{ marginBottom: '2rem' }}>
              <div className={styles.thumb} />
              <div style={{ height: 14, width: 250, backgroundColor: '#AEB1C2' }}/>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

function List({ data }) {
  return (
    <ul className={styles.walletList}>
      {data.map((entry,i) => {
        return (
          <li key={i} className={styles.walletItem}>
            <a href="#">
              <div className={styles.walletName}>
                <div className={styles.thumb}></div>
                <span>{entry.name}</span>
              </div>
              <div className={styles.dataList}>
                <data value={entry.price}>
                  ${prettyNum(entry.price)}
                </data>
                <data className={styles.cryptoCount} value={entry.price}>
                  {entry.value.toString()} <abbr>{entry.symbol}</abbr>
                </data>
              </div>
            </a>
          </li>
        );
      })}
    </ul>
  )
}

export default WalletList;
