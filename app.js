const input = document.getElementById('input');
const searchButton = document.getElementById('search-button');
const locationButton = document.getElementById('location-button');
const form = document.getElementById("form")
const apiKey = '1943608005c748d2adc73184ff869b73';
const baseUrl ='https://api.openweathermap.org/data/2.5/weather'

function fetchWeatherByCity(city) {
  fetch(
    baseUrl +`?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
  )
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log('Weather by city:', data)
      setWeatherIcon(data.weather[0].main, data.name);
      setWeatherC(data);
      applyWeatherEffect(data.weather[0].main);



    })
    .catch(err => {
      alert('Böyle bir şehir bulunamadı. Lütfen başka bir şehir adı girin.');
    });
}

form.addEventListener("submit",(event) => {
  event.preventDefault();
  const city = input.value.trim();
  if (!city) {
    alert("Lütfen bir şehir adı girin.");
    return;
  }
  fetchWeatherByCity(city);
  
})


function fetchWeatherByCoords(lat, lon) {
    fetch(baseUrl+`?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=tr`) 
        .then(res => {
            if (!res.ok) throw new Error('Konumdan hava durumu alınamadı!');
            return res.json();
        })
        .then(data => {
            console.log('Weather by city:', data)
            setWeatherIcon(data.weather[0].main, data.name);
            setWeatherC(data); 
            applyWeatherEffect(data.weather[0].main);


        })
        .catch(() =>  console.error('City fetch error:', err));
}

locationButton.addEventListener('click', function() {
    
    navigator.geolocation.getCurrentPosition(
        (pos) => {
            const { latitude, longitude } = pos.coords;
            fetchWeatherByCoords(latitude, longitude);
        },
        (err) => {
            alert("Konum izni verilmedi veya konum alınamadı. Lütfen tarayıcı ayarlarından izin verin.");
            console.error('Konum hatası');
            
        }
    );
});

function setWeatherIcon(weatherMain, cityName) {
  var iconDiv = document.getElementById("weather-icon");
  var iconEmoji = "";

  if (weatherMain === "Clear") {
    iconEmoji = "☀️";
  } else if (weatherMain === "Clouds") {
    iconEmoji = "☁️";
  } else if (weatherMain === "Rain") {
    iconEmoji = "🌧️";
  } else if (weatherMain === "Thunderstorm") {
    iconEmoji = "⛈️";
  } else if (weatherMain === "Snow") {
    iconEmoji = "❄️";
  } else if ( weatherMain === "Fog" ) {
    iconEmoji = "🌫️";
  } else {
    iconEmoji = "🌈"; 
  }

  iconDiv.innerHTML = iconEmoji + "<div style='font-size:18px; margin-top:6px;'>" + cityName + "</div>";
}


function setWeatherC(data) {
  const temp = data.main.temp;                         
  const tempDiv = document.getElementById("weather-temp");
  tempDiv.textContent = `${temp.toFixed(1)}°C`;        
}


function applyWeatherEffect(weatherMain) {
  const wrapper = document.querySelector('.page-wrapper');
  wrapper.classList.remove('sunny', 'rainy', 'cloudy', 'snowy', 'stormy');

  if (weatherMain === 'Clear') {
    wrapper.classList.add('sunny');
  } else if (weatherMain === 'Rain') {
    wrapper.classList.add('rainy');
  } else if (weatherMain === 'Clouds') {
    wrapper.classList.add('cloudy');
  } else if (weatherMain === 'Snow') {
    wrapper.classList.add('snowy');
  } else if (weatherMain === 'Thunderstorm') {
    wrapper.classList.add('stormy');
  }
}
