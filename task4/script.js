const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherCard = document.getElementById("weatherCard");

// Add your API key here
const apiKey = "8d3f2a1b4c5d6e7f...";

async function getWeather(city) {
    weatherCard.innerHTML = "<p>Loading...</p>";

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        const data = await response.json();

        if (data.cod === "404") {
            weatherCard.innerHTML =
                "<p class='error'>City not found</p>";
            return;
        }

        if (data.cod === 401) {
            weatherCard.innerHTML =
                "<p class='error'>Invalid API key</p>";
            return;
        }

        displayWeather(data);

    } catch (error) {
        weatherCard.innerHTML =
            "<p class='error'>Network error. Try again.</p>";
    }
}

function displayWeather(data) {
    weatherCard.innerHTML = `
        <h2>${data.name}</h2>
        <p>🌡 Temperature: ${data.main.temp}°C</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>🌬 Wind Speed: ${data.wind.speed} m/s</p>
        <p>☁ Condition: ${data.weather[0].description}</p>
    `;
}

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if (city !== "") {
        getWeather(city);
    }
});