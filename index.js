async function fetchWeatherAlerts(state) {
  const errorDiv = document.getElementById('error-message');
  const inputField = document.getElementById('state-input');

  try {
    //Clear previous errors and reset input field
    errorDiv.textContent = '';
    errorDiv.style.display = 'none';
    inputField.value = ''; 

    const response = await fetch(`https://api.weather.gov/alerts/active?area=${state}`);

    if (!response.ok) {
      throw new Error(`Invalid state code or API error (Status: ${response.status})`);
    }

    const data = await response.json();
    
    // displayAlerts() handles clearing previous data internally
    displayAlerts(data);

  } catch (errorObject) {
    // Handle and display errors in the UI
    errorDiv.textContent = errorObject.message;
    errorDiv.style.display = 'block';
    
    // Clear the alerts container so old data doesn't stick around during an error
    document.getElementById('alerts-container').innerHTML = '';
  }
}

fetchWeatherAlerts('NY');


function displayAlerts(data) {
  const container = document.getElementById('alerts-container');
  
  // Clear any previous results
  container.innerHTML = '';

  // 1. Get the number of alerts (length of the 'features' array)
  const alertCount = data.features.length;
  const title = data.title; // This is the title property from the API response

  // 2. Create and show the summary message
  const summary = document.createElement('h3');
  summary.textContent = `${title}: ${alertCount}`;
  container.appendChild(summary);

  // 3. Create a list for the headlines
  const list = document.createElement('ul');

  // 4. Loop through 'features' to get each 'properties.headline'
  data.features.forEach(alert => {
    const listItem = document.createElement('li');
    listItem.textContent = alert.properties.headline;
    list.appendChild(listItem);
  });

  // Add the full list to the container
  container.appendChild(list);
}


