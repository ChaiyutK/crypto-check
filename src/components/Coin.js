import React from "react";

const Coin = (props) => {
    const {data} = props;
    let dollarUSLocale = Intl.NumberFormat('en-US');
  return (
    <div className="coin-container">
        <div className="coin-rank">
        <p>{data.market_cap_rank}</p>
        </div>
        <div className="coin-name">
        <img src={data.image} alt="" />
        <p>{data.name}</p>
        </div>
        <div className="coin-price">
        <p>{props.currency}{dollarUSLocale.format(data.current_price)}</p>
        </div>
        <div className="coin-change">
        <p className={(data.price_change_percentage_24h > 0 ? "green" : "red")}>{data.price_change_percentage_24h.toFixed(2)}%</p>
        </div>
        <div className="coin-marketcap">
        <p>{dollarUSLocale.format(data.market_cap)}</p>
        </div>
    </div>
  )
}

export default Coin