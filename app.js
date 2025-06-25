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
    .then(data => console.log('Weather by city:', data))
    .catch(err => console.error('City fetch error:', err));
}

form.addEventListener("submit",(event) => {
  event.preventDefault();
  const city = input.value;
  fetchWeatherByCity(city);
})


function fetchWeatherByCoords(lat, lon) {
    fetch(baseUrl+`?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=tr`) 
        .then(res => {
            if (!res.ok) throw new Error('Konumdan hava durumu alınamadı!');
            return res.json();
        })
        .then(data => console.log('Weather by city:', data))
        .catch(() =>  console.error('City fetch error:', err));
}

locationButton.addEventListener('click', function() {
    
    navigator.geolocation.getCurrentPosition(
        (pos) => {
            const { latitude, longitude } = pos.coords;
            fetchWeatherByCoords(latitude, longitude);
        },
    );
}); 


