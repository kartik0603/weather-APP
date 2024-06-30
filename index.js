const getData = async (cityName) => {
    let weatherReq = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=b4c426c91009e3429c4af53c61fd6e9c&units=metric`);
    let weatherRes = await weatherReq.json();
    
    displayData(weatherRes);
    setWeatherBackground(weatherRes.weather[0].main);
  };
  
  const setWeatherBackground = (weatherCondition) => {
    document.body.className = '';
    switch (weatherCondition.toLowerCase()) {
      case 'clear':
        document.body.classList.add('clear-sky');
        break;
      case 'clouds':
        document.body.classList.add('clouds');
        break;
      case 'rain':
        document.body.classList.add('rain');
        break;
      case 'snow':
        document.body.classList.add('snow');
        break;
      case 'thunderstorm':
        document.body.classList.add('thunderstorm');
        break;
      case 'fog':
      case 'mist':
      case 'haze':
        document.body.classList.add('fog');
        break;
      default:
        document.body.classList.add('clear-sky');
        break;
    }
  };
  
  const displayData = (data) => {
    const weatherInfo = document.getElementById('data');
    const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  
    weatherInfo.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <img src="${iconUrl}" alt="${data.weather[0].description}" class="weather-icon">
      <p>${data.weather[0].main}: ${data.weather[0].description}</p>
      <p>Temperature: ${data.main.temp}°C (Feels like: ${data.main.feels_like}°C)</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Pressure: ${data.main.pressure} hPa</p>
      <p>Wind: ${data.wind.speed} m/s at ${data.wind.deg}°</p>
      <p>Visibility: ${data.visibility} meters</p>
    `;
    weatherInfo.classList.add('active');
  };
  
  const handleData = (e) => {
    e.preventDefault();
    let cityName = document.getElementById('cityName').value;
    getData(cityName);
  };
  
  document.getElementById("search").addEventListener("submit", handleData);
  