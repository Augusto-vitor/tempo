export async function fetchCityCoordinates(city) {
    const apikey = '162689dc60b29f8798d178b54feed7ce';
    const geocodeurl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apikey}`; // Correção do valor de "limit"

    try {
        const res = await fetch(geocodeurl);
        if (!res.ok) {
            throw new Error('Cidade não encontrada');
        }
        const [cityData] = await res.json();
        if (!cityData) {
            throw new Error('Dados da cidade não encontrados');
        }
        return { lat: cityData.lat, lon: cityData.lon };
    } catch (erro) {
        console.error('Erro ao buscar dados da cidade:', erro); // Alterado "error" para "erro"
        return null;
    }
}

export async function fetchCurrentWeather(lat, lon) {
    const apikey = '162689dc60b29f8798d178b54feed7ce';
    const currentWeatherurl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`; // Corrigido "lat", "lon" e "units=metric"

    try {
        const res = await fetch(currentWeatherurl);
        if (!res.ok) {
            throw new Error('Erro ao buscar temperatura atual');
        }
        const currentWeatherData = await res.json();
        return currentWeatherData;
    } catch (error) {
        console.error('Erro ao buscar temperatura atual:', error);
        return null;
    }
}

export async function fetchWeatherForecast(lat, lon) {
    const apikey = '162689dc60b29f8798d178b54feed7ce';
    const forecasturl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`; // Corrigido o endpoint

    try {
        const res = await fetch(forecasturl);
        if (!res.ok) {
            throw new Error('Erro ao buscar dados de previsão do tempo');
        }
        const forecastData = await res.json(); // Corrigido nome da variável
        return forecastData;
    } catch (erro) {
        console.error('Erro ao buscar previsão do tempo:', erro); // Corrigido "error" para "erro" e corrigida a digitação
        return null;
    }
}

export async function fetchWeatherData(city) {
    const Coordinates = await fetchCityCoordinates(city);
    if (!Coordinates) return null;

    const [currentWeather, forecast] = await Promise.all([
        fetchCurrentWeather(Coordinates.lat, Coordinates.lon),
    ]);

    if (!currentWeather || !forecast) return null;

    return { currentWeather, forecast };
}