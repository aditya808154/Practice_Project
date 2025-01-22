let input = document.querySelector("input");
let button = document.querySelector("button");
let city = document.querySelector(".city");
let temp = document.querySelector(".temp");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");
let locationButton = document.querySelector(".location");

async function checkWeather() {
  const apiKey = "0e66525efbeb05305b1aa06f65ebc16b";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${input.value}&appid=${apiKey}`;
  
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);

    if (data.cod === 200) {
      city.innerHTML = data.name;
      temp.innerHTML = `${data.main.temp}°C`;
      humidity.innerHTML = `${data.main.humidity}%`;
      wind.innerHTML = `${data.wind.speed} km/h`;
    } else {
      city.innerHTML = "City not found";
      temp.innerHTML = "--";
      humidity.innerHTML = "--";
      wind.innerHTML = "--";
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

button.addEventListener("click", () => {
  checkWeather();
});

locationButton.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(async (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const apiKey = "0e66525efbeb05305b1aa06f65ebc16b";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data);

      if (data.cod === 200) {
        city.innerHTML = data.name;
        temp.innerHTML = `${data.main.temp}°C`;
        humidity.innerHTML = `${data.main.humidity}%`;
        wind.innerHTML = `${data.wind.speed} km/h`;
      } else {
        city.innerHTML = "Location not found";
        temp.innerHTML = "--";
        humidity.innerHTML = "--";
        wind.innerHTML = "--";
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }, (error) => {
    console.error("Geolocation error:", error);
  });
});