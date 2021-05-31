import React from 'react';
import WalletList from 'components/WalletList';
import Graph from 'components/Graph';
import cryptoData from 'data/crypto';

function Portfolio() {
  const [data, setData] = React.useState();

  /* 
  * TODO: Optimize unnecessary renders
  * TODO: Graph loading placeholder 
  */ 

  React.useEffect(() => {
    setData(cryptoData);
  }, []);

  return (
    <div>
      <Graph
        payload={data}
        setData={setData}
        balance={12453.17}
      />
      <div className="App-portfolio-list">
        <WalletList />
      </div>
    </div>
  )
}

export default Portfolio;