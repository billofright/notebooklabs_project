import React from 'react';
import { useEffect, useState } from 'react';
import { Network, Alchemy } from "alchemy-sdk"

function App() {
  console.log(process.env.REACT_APP_API_KEY);

  const [eventList, setEventList] = useState([]);
  const topics = [
    '0xab4c77c74cd32c85f35416cf03e7ce9e2d4387f7b7f2c1f4bf53daaecf8ea72d', // BuyUSDG
    '0xd732b7828fa6cee72c285eac756fc66a7477e3dc22e22e7c432f1c265d40b483', // SellUSDG
    '0x0874b2d545cb271cdbda4e093020c452328b24af12382ed62c4d00f5c26709db', // Swap
    '0x2fe68525253654c21998f35787a8d0f361905ef647c854092430ab65f2f15022', // IncreasePosition
    '0x93d75d64d1f84fc6f430a64fc578bdd4c1e090e90ea2d51773e626d19de56d30', // DecreasePosition
    '0x2e1f85a64a2f22cf2f0c42584e7c919ed4abe8d53675cff0f62bf1e95a1c676f', // LiquidatePosition
    '0x25e8a331a7394a9f09862048843323b00bdbada258f524f5ce624a45bf00aabb', // UpdatePosition
    '0x73af1d417d82c240fdb6d319b34ad884487c6bf2845d98980cc52ad9171cb455' // Close Position
  ]

  var latestBlock;
  var fromBlock;

  const contractAddress = '0x489ee077994B6658eAfA855C308275EAd8097C4A';
  // Optional Config object, but defaults to demo api-key and eth-mainnet.
  const settings = {
    apiKey: process.env.REACT_APP_API_KEY,
    network: Network.ARB_MAINNET, // Replace with your network.
  };

  const alchemy = new Alchemy(settings);


  const fetchData = async () => {

    latestBlock = await alchemy.core.getBlockNumber();
    fromBlock = latestBlock - 5000;

    return alchemy.core
      .getLogs({
        address: contractAddress,
        topics: [topics],
        fromBlock: `0x${fromBlock.toString(16)}`,
        toBlock: `0x${latestBlock.toString(16)}`
      });
  }

  const getEvents = async event => {
    const resp = await fetchData();
    console.log(resp);
    const formattedJsonArray = resp.map(json => JSON.stringify(json, null, 2));
    setEventList(formattedJsonArray);
  }

  return (
    <div>
      <button onClick={getEvents}>
        get events
      </button>
      <div>
        {eventList.map((item, index) => (
          <pre key={index}>{item}</pre>
        ))}
      </div>

    </div>
  );
}

export default App;