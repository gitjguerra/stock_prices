import React from 'react';

const CryptoList = ({ coins }) => {
    return (
        <div className="coins-list">
            {coins.map((coin) => (
                <div key={coin.id} className={`coin-item ${coin.symbol}`}>
                <img src={coin.image} alt={`${coin.name} logo`} width="40" height="40" className="coin-logo" />
                <span className="crypto-name">{coin.name}</span>
                <span>{coin.symbol}</span>
                <span className="crypto-price">${coin.current_price ? coin.current_price.toFixed(2) : 'N/A'}</span>
                </div>
            ))}
        </div>
    );
};

export default CryptoList;