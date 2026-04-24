// DOM
const input = document.getElementById("state-input");
const button = document.getElementById("fetch-alerts");
const display = document.getElementById("alerts-display");
const errorDiv = document.getElementById("error-message");

button.addEventListener("click", () => {
    const state = input.value.trim().toUpperCase();

    if (!state) {
        displayError("Please enter a state abbreviation.");
        return;
    }

    fetchWeatherAlerts(state);
});



function fetchWeatherAlerts(state) {
    const url = `https://api.weather.gov/alerts/active?area=${state}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network error");
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            displayAlerts(data, state);
        })
        .catch(error => {
            console.log(error);
            displayError("Failed to fetch weather alerts.");
        });
}


//  DISPLAY FUNCTION
function displayAlerts(data, state) {
    clearError();
    display.innerHTML = "";

    const alerts = data.features;

    const title = document.createElement("h3");
    title.textContent = `Current watches, warnings, and advisories for ${state}: ${alerts.length}`;
    display.appendChild(title);

    if (alerts.length === 0) {
        display.innerHTML += "<p>No active alerts.</p>";
        return;
    }

    const list = document.createElement("ul");

    alerts.forEach(alert => {
        const li = document.createElement("li");
        li.textContent = alert.properties.headline;
        list.appendChild(li);
    });

    display.appendChild(list);
}


// ERROR FUNCTION
function displayError(message) {
    display.innerHTML = "";
    errorDiv.textContent = message;
    errorDiv.classList.remove("hidden");
}


// helper
function clearError() {
    errorDiv.textContent = "";
    errorDiv.classList.add("hidden");
}