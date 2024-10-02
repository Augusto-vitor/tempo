'use client';
import { useState } from 'react';
import { fetchWeatherData } from '@/lib/weather';
import { Line } from 'react-chartjs-2';
import {
  Chart as Chartjs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

Chartjs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function WeatherPage() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherData(city);
      if (data) {
        setWeatherData(data);
      } else {
        setError('Erro ao buscar dados do clima. Verifique a cidade novamente.');
      }
    } catch (err) {
      setError('Erro ao conectar à API.');
    } finally {
      setLoading(false);
    }
  };

  const prepareChartData = () => {
    if (!weatherData || !weatherData.forecast) return null;

    const dates = weatherData.forecast.list.map((item) => {
      const date = new Date(item.dt * 1000);
      return `${date.getDate()}/${date.getMonth() + 1}`;
    });

    const temps = weatherData.forecast.list.map((item) => item.main.temp);

    return {
      labels: dates,
      datasets: [
        {
          label: 'Temperatura (°C)',
          data: temps,
          fill: false,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
        },
      ],
    };
  };

  // Função para alterar a cor de fundo com base nas condições do clima
  const getBackgroundColor = () => {
    if (!weatherData) return 'blue'; // Cor padrão quando não há dados

    const condition = weatherData.weather[0].main.toLowerCase();

    if (condition.includes('clear')) return '#FFD700'; // Sol - Amarelo
    if (condition.includes('clouds')) return '#B0C4DE'; // Nublado - Azul claro
    if (condition.includes('rain')) return '#708090'; // Chuva - Cinza
    if (condition.includes('wind')) return '#87CEEB'; // Vento - Azul céu
    return 'blue'; // Cor padrão para outras condições
  };

  // Função para retornar o ícone correto baseado nas condições do clima
  const getWeatherIcon = () => {
    if (!weatherData) return null;

    const condition = weatherData.weather[0].main.toLowerCase();

    if (condition.includes('clear')) return '/icons8-sol-100.png';
    if (condition.includes('clouds')) return '/icons8-dia-parcialmente-nublado-48.png';
    if (condition.includes('wind')) return '/icons8-vento-100.png';
    return null; // Caso não tenha um ícone específico
  };

  return (
    <div style={{ 
      backgroundColor: getBackgroundColor(), 
      height: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      flexDirection: 'column',
      color: 'white',
    }}>
      <h1>Busque a previsão do tempo</h1>
      <div>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Digite o nome da cidade"
          style={{ padding: '10px', borderRadius: '5px', marginBottom: '10px' }}
        />
        <button 
          onClick={handleSearch}
          style={{ padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}
        >
          Buscar
        </button>
      </div>

      {loading && <p>Carregando...</p>}
      {error && <p>{error}</p>}

      {weatherData && (
        <div style={{ textAlign: 'center' }}>
          <h1>Previsão do tempo para {weatherData.name}</h1>
          <p>Temperatura: {weatherData.main.temp}°C</p>
          <p>Condição: {weatherData.weather[0].description}</p>
          {getWeatherIcon() && (
            <img 
              src={getWeatherIcon()} 
              alt="Ícone do clima" 
              style={{ width: '100px', height: '100px', marginTop: '10px' }}
            />
          )}
          <h2>Previsão dos próximos dias para {weatherData.name}</h2>
          <Line data={prepareChartData()} />
        </div>
      )}
    </div>
  );
}
