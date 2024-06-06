const API_KEY = "1dc3d84e7f204f4ba4652627240406";
let processedWeatherData = {};

async function fetchWeatherData(location) {
  const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`;
  try {
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    let data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch weather data: ${error}`);
  }
}

function processWeatherData(data) {
  processedWeatherData = {
    location: data.location.name,
    temp_c: data.current.temp_c,
    temp_f: data.current.temp_f,
    description: data.current.condition.text,
    humidity: data.current.humidity,
    wind_mph: data.current.wind_mph,
  };
}

document
  .getElementById("locationForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const location = document.getElementById("location").value;
    const rawData = await fetchWeatherData(location);

    if (rawData) {
      const processedData = processWeatherData(rawData);
      updateHTML();
    } else {
      console.log("no data");
    }
    document.getElementById("locationForm").reset();
  });

function updateHTML() {
  const { location, temp_c, temp_f, description, humidity, wind_mph } =
    processedWeatherData;
  document.querySelector(".location").innerText = "Location: " + location;
  document.querySelector(".temp_c").innerText = `Temp C: ${temp_c}°C`;
  document.querySelector(".temp_f").innerText = `Temp F: ${temp_f}°F`;
  document.querySelector(".description").innerText =
    "Description: " + description;
  document.querySelector(".humidity").innerText = `Humidity: ${humidity}%`;
  document.querySelector(".wind_mph").innerText = `Wind Speed: ${wind_mph} mph`;
}
