import { useState, useEffect } from 'react';
import axios from 'axios';

const CryptoPrices = (page, pageSize, searchTerm) => {
    const [coins, setCoins] = useState([]);
    const [totalCoins, setTotalCoins] = useState(0);

    useEffect(() => {
        async function fetchCoinPrices() {
            try {
                const response = await axios.get('/api/v3/coins/markets', {
                    params: {
                        vs_currency: 'usd',
                        order: 'market_cap_desc',
                        per_page: 100, // Obtener más monedas para filtrar
                        page,
                        sparkline: false,
                    }
                });

                // Filtrar las monedas según el término de búsqueda
                const filteredCoins = response.data.filter(coin =>
                    coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
                );

                // Establecer las monedas y el total basado en el filtrado
                setCoins(filteredCoins.slice((page - 1) * pageSize, page * pageSize)); // Aplicar paginación
                setTotalCoins(filteredCoins.length); // Total de monedas filtradas

            } catch (error) {
                console.error('Error al obtener los precios:', error);
            }
        }

        fetchCoinPrices();
    }, [page, pageSize, searchTerm]);

    return { coins, totalCoins };
};

export default CryptoPrices;