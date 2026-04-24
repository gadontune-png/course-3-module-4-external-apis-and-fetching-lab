// Get DOM elements
const button = document.getElementById("fetch-alerts");
const input = document.getElementById("state-input");
const alertsDisplay = document.getElementById("alerts-display");
const errorMessage = document.getElementById("error-message");

// Fetch alerts when button is clicked
button.addEventListener("click", () => {
    const state = input.value.trim().toUpperCase();

    if (!state) {
        showError("Please enter a state abbreviation (e.g., CA, TX, MN)");
        return;
    }

    fetchWeatherAlerts(state);
});

// Step 1: Fetch data from API
async function fetchWeatherAlerts(state) {
    const url = `https://api.weather.gov/alerts/active?area=${state}`;

    try {
        clearError();
        alertsDisplay.innerHTML = "Loading alerts...";

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch data (Status: ${response.status})`);
        }

        const data = await response.json();

        console.log("API DATA:", data); // Debugging

        displayAlerts(data, state);

    } catch (error) {
        console.log(error);
        showError("Unable to fetch weather alerts. Please try again.");
        alertsDisplay.innerHTML = "";
    }
}

// Step 2: Display alerts in the DOM
function displayAlerts(data, state) {
    alertsDisplay.innerHTML = "";

    const alerts = data.features;

    // Summary
    const summary = document.createElement("h3");
    summary.textContent = `Current watches, warnings, and advisories for ${state}: ${alerts.length}`;
    alertsDisplay.appendChild(summary);

    // No alerts case
    if (alerts.length === 0) {
        const noAlerts = document.createElement("p");
        noAlerts.textContent = "No active alerts.";
        alertsDisplay.appendChild(noAlerts);
        return;
    }

    // Alerts list
    const list = document.createElement("ul");

    alerts.forEach(alert => {
        const listItem = document.createElement("li");
        listItem.textContent = alert.properties.headline;
        list.appendChild(listItem);
    });

    alertsDisplay.appendChild(list);
}

// Error handling
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove("hidden");
}

function clearError() {
    errorMessage.textContent = "";
    errorMessage.classList.add("hidden");
}