import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import Coin from './components/Coin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [coinData,setCoinData] = useState([]);
  const [coinElement,setCoinElement] = useState("");
  const [currency,setCurrency] = useState("$");


  useEffect(() => {
    axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
    .then((res) => {
      setCoinData(res.data);
      setCoinElement(res.data.map((val,index)=>{
        return(
          <Coin key={index} data={val} currency={currency}/>
        );
      }))
    })
  },[])

  const notifyScc = () => 
  toast.success('Change currency Success!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });

    
  const notifyErr = () => toast.error('Change currency failed!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
  

  const search = (filtername) =>{
      
      setCoinElement(coinData.filter((val) =>{if(val.name.toLowerCase().includes(filtername.toString().toLowerCase())){
        return val
      }}).map((val,index)=>{
        return (<Coin key={index} data={val} currency={currency} />);
      })) 
    
  }

  const changeCurrency = (query) =>{
    
    let newCurrency = "";
    if(query === "usd")
    {
      newCurrency = "$";
    }
    else{
      newCurrency = "฿";
    }
    setCurrency(newCurrency);
    axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${query}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
    .then((res) => {
      notifyScc();
      setCoinData(res.data);
      setCoinElement(res.data.map((val,index)=>{
        return(
          <Coin key={index} data={val} currency={newCurrency}/>
        );
      }))
    })
    .catch((err)=>{if(err.response) {notifyErr();}})
  }
  
  return (
    <>
  <ToastContainer />
  <div className="navbar">
      <select onChange={(e) => changeCurrency(e.target.value)}>
      <option value="usd">usd</option>
      <option value="thb">thb</option>
      </select>
        </div>
    <div className="App">
      <div className="coinlist">
      <div className="filter-container"><input className='search' type="text" placeholder='Coin Name' onKeyPress={search} onChange={(e) => {search(e.target.value)}} /></div>
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
    </>
  );
}

export default App;
