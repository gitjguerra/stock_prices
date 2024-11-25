import React from 'react';

const CryptoList = ({ coins }) => {
    return (
        <div className="coins-list">
            {coins.map((coin, index) => (
                <div key={coin.id} className={`coin-item ${coin.symbol}`}>
                    <img src={coin.image} alt={`${coin.name} logo`} width="40" height="40" />
                    <span>{coin.name}</span>
                    <span>{coin.symbol}</span>                    
                    <span>${coin.current_price ? coin.current_price.toFixed(2) : 'N/A'}</span>
                    <span>Price Change 24h: ${coin.price_change_24h ? coin.price_change_24h.toFixed(2) : 'N/A'}</span>
                </div>
            ))}
        </div>
    );
};

export default CryptoList;