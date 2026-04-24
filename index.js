function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=YOUR_API_KEY`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            displayWeather(data);
        })
        .catch(error => {
            console.log(error);
            displayError("Failed to retrieve weather data");
        });
}

function displayWeather(data) {
    const display = document.getElementById("alerts-display");
    display.innerHTML = "";

    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const description = data.weather[0].description;

    display.innerHTML = `
        <p>Temperature: ${temp} °C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Description: ${description}</p>
    `;
}

function displayError(message) {
    const errorDiv = document.getElementById("error-message");
    errorDiv.textContent = message;
    errorDiv.classList.remove("hidden");
}