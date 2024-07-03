const apiKey = 'b4c426c91009e3429c4af53c61fd6e9c';

const getData = async (url, elementId) => {
  let weatherReq = await fetch(url);
  let weatherRes = await weatherReq.json();
  
  displayData(weatherRes, elementId);
  if (elementId === 'data') {  
    setWeatherBackground(weatherRes.weather[0].main);
  }
};

const setWeatherBackground = (weatherCondition) => {
  const videos = document.querySelectorAll('.background-video');
  videos.forEach(video => video.style.display = 'none');
  
  switch (weatherCondition.toLowerCase()) {
    case 'clear':
      document.getElementById('clear-sky').style.display = 'block';
      break;
    case 'clouds':
      document.getElementById('clouds').style.display = 'block';
      break;
    case 'rain':
      document.getElementById('rain').style.display = 'block';
      break;
    case 'snow':
      document.getElementById('snow').style.display = 'block';
      break;
    case 'thunderstorm':
      document.getElementById('thunderstorm').style.display = 'block';
      break;
    case 'fog':
    // case 'mist':
    // case 'haze':
      document.getElementById('fog').style.display = 'block';
      break;
    case 'haze':
      document.getElementById('haze').style.display = 'block';
      break;


      case'mist':
      document.getElementById('mist').style.display = 'block';
      break;

    default:
      document.getElementById('clear-sky').style.display = 'block';
      break;

  }
};

const displayData = (data, elementId) => {
  const weatherInfo = document.getElementById(elementId);
  const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  const temp = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);

  weatherInfo.innerHTML = `
    <h1>${data.name}, ${data.sys.country}</h1>
    <img src="${iconUrl}" alt="${data.weather[0].description}" class="weather-icon">
    <p>${data.weather[0].main}: ${data.weather[0].description}</p>
    <h2>Temperature: ${temp}°C (Feels like: ${feelsLike}°C)</h2>
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
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  getData(apiUrl, 'data');
};

const getCurrentLocationWeather = () => {
  navigator.geolocation.getCurrentPosition(async (position) => {
    const { latitude, longitude } = position.coords;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    getData(apiUrl, 'live-location');
    console.log(position.coords);
  });
};

document.getElementById("search").addEventListener("submit", handleData);
document.addEventListener("DOMContentLoaded", getCurrentLocationWeather);
