import React from 'react';
import { useEffect, useState } from 'react';
import { topics, parseData } from './topics'
import { fetchData } from './apiClient';
import './App.css';

const contractAddress = '0x489ee077994B6658eAfA855C308275EAd8097C4A';
const maxIncrement = 99999;

function App() {
  const [eventList, setEventList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(0);

  const handleChange = (event) => {
    const inputValue = event.target.value;
    if(parseInt(inputValue) <= maxIncrement){
      setValue(inputValue);
    }
  };

  //calculate width of input box by starting width at 3rem and increasing it by 0.75rem per digit for numbers more than 3 digits
  const inputWidth = `${3+(value.toString().length > 3 ? (value.toString().length-3)*0.75 : 0)}rem`; 

  const getEvents = async () => {
    setLoading(true);

    const resp = await fetchData(contractAddress, Object.keys(topics), value);
    console.log(resp);
    const formattedJsonArray = resp.map(json => JSON.stringify(json, null, 2));
    setEventList(formattedJsonArray);

    setLoading(false);
  }

  

  return (
    <div className='event-container'>
      <div className='selector-button-container'>
        <div className='selector'>
          <p>Get last</p>
          <input
            className='number-input'
            type='number' 
            value={value}
            step={10} min={0} max={maxIncrement}
            onChange={handleChange}
            style={{width: inputWidth}} />
          <p>events</p>
        </div>
        <div className='button-container'>
          <button className='button' onClick={getEvents} disabled={loading}>
            {loading ? 'Loading...' : `Go`}
          </button>
        </div>
      </div>

      <div className='event-list'>
        {eventList.map((item, index) => {
          const parsedItem = JSON.parse(item);
          return <pre className='event-element' key={index}>
            Block Number: {parsedItem.blockNumber} <br/>
            Block Hash: {parsedItem.blockHash} <br/>
            Transaction Index: {parsedItem.transactionIndex} <br/>
            Address: {parsedItem.address} <br/>
            Data: {
              JSON.stringify(parseData(parsedItem.data, topics[parsedItem.topics[0]]), null, 2)
            } <br/>
            Topic: {topics[parsedItem.topics[0]]} <br/>
            Transaction Hash: {parsedItem.transactionHash} <br/>
            Log Index: {parsedItem.logIndex} <br/>
          </pre>
        })}
      </div>
    </div>
  );
}

export default App;