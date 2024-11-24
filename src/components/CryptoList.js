import React from 'react';

const CryptoList = ({ coins }) => {
    return (
        <div className="coins-list">
            {coins.map((coin) => (
                <section key={coin.id} className={`price-section ${coin.symbol}`}>
                    <h3>{coin.name}</h3>
                    <p className="symbol">{coin.symbol}</p>
                    <img src={coin.image} alt={`${coin.name} logo`} width="40" height="40" />
                    <p className="current-price">${coin.current_price.toFixed(2)}</p>
                    <p className="price-change">Price Change 24h: ${coin.price_change_24h.toFixed(2)}</p>
                </section>
            ))}
        </div>
    );
};

export default CryptoList;