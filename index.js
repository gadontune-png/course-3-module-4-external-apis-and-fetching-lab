// DOM elements
const input = document.getElementById("state-input");
const button = document.getElementById("fetch-alerts");
const display = document.getElementById("alerts-display");
const errorDiv = document.getElementById("error-message");

// Event listener
button.addEventListener("click", handleSearch);


function handleSearch() {
    const city = input.value.trim();

    if (!city) {
        displayError("Please enter a city name.");
        return;
    }

    fetchWeatherData(city);
}

function fetchWeatherData(city) {
    const apiKey = "dbbf513ecfca4c6b4004fb3a1362ebdb"; 
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
            console.log(error);
            displayError("City not found or API error.");
        });
}



function displayWeather(data) {
    clearError();
    display.innerHTML = "";

    const { name } = data;
    const { temp, humidity } = data.main;
    const description = data.weather[0].description;

    display.innerHTML = `
        <h2>Weather in ${name}</h2>
        <p>Temperature: ${temp} °C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Description: ${description}</p>
    `;
}


function displayError(message) {
    display.innerHTML = ""; // clear previous data
    errorDiv.textContent = message;
    errorDiv.classList.remove("hidden");
}


// Helper (Advanced Functionality ✔)
function clearError() {
    errorDiv.textContent = "";
    errorDiv.classList.add("hidden");
}