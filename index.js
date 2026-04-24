document.getElementById("fetch-alerts").addEventListener("click", function () {
    const city = document.getElementById("state-input").value.trim();
    fetchWeatherData(city);
});

// Fetch weather data
function fetchWeatherData(city) {
    const apiKey = "YOUR_API_KEY";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            displayWeather(data);
        })
        .catch(error => {
            console.log(error.message);
            displayError(error.message);
        });
}


//Display weather data
function displayWeather(data) {
    const display = document.getElementById("alerts-display");
    const errorDiv = document.getElementById("error-message");

    errorDiv.textContent = "";
    errorDiv.classList.add("hidden");

    display.innerHTML = `
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Description: ${data.weather[0].description}</p>
    `;
}


//Display error
function displayError(message) {
    const display = document.getElementById("alerts-display");
    const errorDiv = document.getElementById("error-message");

    display.innerHTML = "";

    errorDiv.textContent = message;
    errorDiv.classList.remove("hidden");
}