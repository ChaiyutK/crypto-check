import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import Coin from './components/Coin';

function App() {

  const [coinData,setCoinData] = useState([]);
  const [coinElement,setCoinElement] = useState("");


  useEffect(() => {
    axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
    .then((res) => {
      setCoinData(res.data);
      setCoinElement(res.data.map((val,index)=>{
        return(
          <Coin key={index} data={val} />
        );
      }))
    })
    console.log("tick");
  },[])

  const search = (filtername) =>{
      
      setCoinElement(coinData.filter((val) =>{if(val.name.toLowerCase().includes(filtername.toString().toLowerCase())){
        return val
      }}).map((val,index)=>{
        return (<Coin key={index} data={val} />);
      })) 
    
  }
  
  return (
    <div className="App">
      <div className="coinlist">
      <div className="filter-container"><label>Name: </label><input className='search' type="text" onKeyPress={search} onChange={(e) => {search(e.target.value)}} /></div>
        <div className="coin-header">
          <div className='coin-header-item'><p>Rank</p></div>
          <div className='coin-header-item'><p>Name</p></div>
          <div className='coin-header-item'><p>price</p></div>
          <div className='coin-header-item'><p>24h %</p></div>
          <div className='coin-header-item'><p>Market Cap</p></div>
        </div>
      {coinElement}
      </div>
    </div>
  );
}

export default App;
