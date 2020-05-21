import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Task1 = (props) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [counter, setCounter] = useState(1);

  const fetchData = async () => {
    // Fetch data from blockchain ticker
    let data;

    try {
      data = await axios('https://blockchain.info/ticker');
    } catch {
      setError('Something went wrong');
      return
    }

    // Convert json object to an array so we can loop through it later
    const currencies = Object.entries(data.data);
    setData(currencies.slice(0, 2));
  };

  // Set 5s interval to fetch data again
  useEffect(() => {  
    fetchData();  

    const interval = setInterval(() => {
      setCounter(counter + 1); 
    }, 5000);

    return () => clearInterval(interval);
  }, [counter]);

  return (
    <div className="task">
      <p><em>Fetch data from https://blockchain.info/ticker, and present the data from 2 of the currencies and refresh the data every 5 seconds.</em></p>
      <p>This data has been refreshed {counter} times</p>

      { error !== '' && 
        <p className="message message--error">{ error }</p>
      }
      
      { data.length > 1 &&
        <table>
          <thead>
            <tr><th>Currency</th><th>Symbol</th><th>Buy price</th><th>Sell price</th><th>Last sold</th><th>15 min</th></tr>
          </thead>
          <tbody>
            { data.map((item) => 
              <tr key={item[0]}>
                <td>{item[0]}</td>
                <td>{item[1].symbol}</td>
                <td>{item[1].buy}</td>
                <td>{item[1].sell}</td>
                <td>{item[1].last}</td>
                <td>{item[1]['15m']}</td>
              </tr>
            )}
          </tbody>
        </table>
      }
    </div>
  );
}

export default Task1;