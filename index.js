document.getElementById("fetch-alerts").addEventListener("click", function () {
    const state = document.getElementById("state-input").value.trim().toUpperCase();
    fetchWeatherAlerts(state);
});

function fetchWeatherAlerts(state) {
    const url = `https://api.weather.gov/alerts/active?area=${state}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch alerts");
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            displayAlerts(data, state);
        })
        .catch(error => {
            displayError(error.message);
        });
}

function displayAlerts(data, state) {
    const display = document.getElementById("alerts-display");
    const errorDiv = document.getElementById("error-message");
    const input = document.getElementById("state-input");

    // CLEAR ERROR
    errorDiv.textContent = "";
    errorDiv.classList.add("hidden");

    // CLEAR OLD RESULTS
    display.innerHTML = "";

    const alerts = data.features;

    //  SUMMARY FORMAT
    const title = document.createElement("h3");
    title.textContent =
        `Current watches, warnings, and advisories for ${state}: ${alerts.length}`;

    display.appendChild(title);

    // LIST HEADLINES
    const list = document.createElement("ul");

    alerts.forEach(alert => {
        const li = document.createElement("li");
        li.textContent = alert.properties.headline;
        list.appendChild(li);
    });

    display.appendChild(list);

    //CLEAR INPUT AFTER SUCCESS
    input.value = "";
}

function displayError(message) {
    const errorDiv = document.getElementById("error-message");

    errorDiv.textContent = message;
    errorDiv.classList.remove("hidden");
}