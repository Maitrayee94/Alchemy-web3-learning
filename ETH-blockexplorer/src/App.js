import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import './App.css';

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [block, setBlock] = useState();
  const [ethToUsd, setEthToUsd] = useState();
  

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    getBlockNumber();
  }, []);

  useEffect(() => {
    async function getBlock() {
      const block = await alchemy.core.getBlockWithTransactions(blockNumber);

      if (block) {
        setBlock(block);
      }
    }

    getBlock();
  }, [blockNumber]);

  useEffect(() => {
    async function getEthToUsd() {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
      const data = await response.json();
      setEthToUsd(data.ethereum.usd);
    }

    getEthToUsd();
  }, []);

  const getTransactionUrl = (txHash) => {
    return `https://etherscan.io/tx/${txHash}`;
  }

  

  return (
    
    <div className="App">
     
      <h1>Block Number: {blockNumber}</h1>
      <p>Timestamp: {new Date().toLocaleString()}</p>
      <p>Total Transactions: {block?.transactions.length}</p>
      {block && (
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Hash</th>
              <th>From</th>
              <th>To</th>
              <th>Value (ETH)</th>
            </tr>
          </thead>
          <tbody>
            {block.transactions.map((tx) => {
              const valueInEth = Number(tx.value) / 10 ** 18;
              const valueInUsd = valueInEth * ethToUsd;
              return (
                <tr key={tx.hash}>
                  <td><a href={getTransactionUrl(tx.hash)} target="_blank" rel="noreferrer">{`${tx.hash.slice(0, 8)}...${tx.hash.slice(-8)}`}</a></td>
                  <td>{`${tx.from.slice(0, 8)}...${tx.from.slice(-8)}`}</td>
                  <td>{`${tx.to.slice(0, 8)}...${tx.to.slice(-8)}`}</td>
                  <td>{valueInEth.toFixed(5)}  (${valueInUsd.toFixed(2)})</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
