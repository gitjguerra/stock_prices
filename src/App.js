import React, { useEffect, useState } from 'react';
import './App.css';
import logo from './image/bvcLogoGreen.png';
import CryptoPrices from './components/CryptoPrices';
import Pagination from './components/Pagination';
import CryptoList from './components/CryptoList';
import MarketStackComponent from './components/MarketStackComponent';

function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [apiKey, setApiKey] = useState('');

    const { coins, totalCoins } = CryptoPrices(page, pageSize, searchTerm);

    const totalPages = Math.ceil(totalCoins / pageSize);

    const handleSearch = (event) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);
        setPage(1);
    };

    useEffect(() => {
        async function loadConfig() {
            try {
                const apiKeyFromEnv = process.env.REACT_APP_API_KEY;
                if (apiKeyFromEnv) {
                    setApiKey(apiKeyFromEnv);
                } else {
                    const response = await fetch('./config.json');
                    if (!response.ok) {
                        throw new Error('No se encontró el archivo config.json o hubo un error al cargarlo.');
                    }
                    const data = await response.json();
                    setApiKey(data.apiKey);
                }
            } catch (error) {
                console.error('Error al cargar la API key:', error);
                setApiKey(null);
            }
        }
        loadConfig();
    }, []);

    // EJEMPLO PARA LOOK AND FEEL
    const [tickers, setTickers] = useState([
        { symbol: 'AAPL', name: 'Apple Inc.' },
        { symbol: 'GOOGL', name: 'Alphabet Inc.' },
        { symbol: 'MSFT', name: 'Microsoft Corporation' },
        { symbol: 'AMZN', name: 'Amazon.com, Inc.' },
        { symbol: 'FB', name: 'Facebook, Inc.' }
    ]);

    const [data, setData] = useState({
        AAPL: [
            { time: '2024-11-25', close: 180.50 },
            { time: '2024-11-24', close: 179.75 },
            { time: '2024-11-23', close: 178.50 },
            // ... (agrega más datos para simular una semana)
        ],
        GOOGL: [
            { time: '2024-11-25', close: 3000.00 },
            { time: '2024-11-24', close: 2995.50 },
            { time: '2024-11-23', close: 2985.75 },
            // ... (agrega más datos para simular una semana)
        ],
        MSFT: [
            { time: '2024-11-25', close: 350.25 },
            { time: '2024-11-24', close: 349.50 },
            { time: '2024-11-23', close: 348.75 },
            // ... (agrega más datos para simular una semana)
        ],
        AMZN: [
            { time: '2024-11-25', close: 3800.00 },
            { time: '2024-11-24', close: 3795.50 },
            { time: '2024-11-23', close: 3785.75 },
            // ... (agrega más datos para simular una semana)
        ],
        FB: [
            { time: '2024-11-25', close: 340.00 },
            { time: '2024-11-24', close: 339.50 },
            { time: '2024-11-23', close: 338.75 },
            // ... (agrega más datos para simular una semana)
        ]
    });

    return (
        <div className="App">
            <header>
                <img src={logo} alt="Logotipo" className="logo" />
                <h1>Dashboard de Criptomonedas y Commodities</h1>
            </header>

            <main>
                {/* Sección de Commodities */}
                <h2>Precios de Commodities</h2>
                <div className="commodities-section">
                    <MarketStackComponent tickers={tickers} data={data} />
                </div>

                {/* Sección de Criptomonedas */}
                <div className="coins-section">
                    <h2>Precios de Criptomonedas</h2>
                    <input
                        type="text"
                        placeholder="Buscar criptomoneda"
                        onChange={handleSearch}
                        value={searchTerm}
                    />
                    <h2>{' '}</h2>
                    <CryptoList coins={coins} />
                    <Pagination 
                        page={page} 
                        totalPages={totalPages} 
                        onPageChange={setPage} 
                    />
                    <div>
                        Registros por Página:
                        <select onChange={(e) => {
                            setPageSize(parseInt(e.target.value));
                            setPage(1);
                        }}>
                            <option value={10}>10 por página</option>
                            <option value={25}>25 por página</option>
                            <option value={50}>50 por página</option>
                        </select>
                    </div>
                </div>
            </main>

            <footer>
                <p>&copy; 2024 BVC Cryptocurrency Dashboard</p>
            </footer>
        </div>
    );
}

export default App;
