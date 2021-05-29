import React from 'react';
import WalletList from 'components/WalletList';
import Graph from 'components/Graph';
import cryptoData from 'data/crypto';

function Portfolio() {
  return (
    <div>
      <Graph 
        payload={cryptoData} 
        balance={12453.17}
      />
      <div className="App-portfolio-list">
        <WalletList />
      </div>
    </div>
  )
}

export default Portfolio;