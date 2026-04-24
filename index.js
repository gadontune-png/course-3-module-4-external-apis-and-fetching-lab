function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=YOUR_API_KEY`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("API Error");
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            displayWeather(data);
        })
        .catch(error => {
            console.log(error);
            displayError("Unable to fetch weather data");
        });
}
function displayWeather(data) {
    const container = document.getElementById("alerts-display");
    container.innerHTML = "";

    container.innerHTML = `
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Description: ${data.weather[0].description}</p>
    `;
}
function displayError(message) {
    const errorBox = document.getElementById("error-message");
    errorBox.textContent = message;
    errorBox.classList.remove("hidden");
}