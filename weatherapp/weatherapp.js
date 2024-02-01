///////////// W E A T H E R // T O D A Y ///////////////

/*
 * In the weather today -app your job is to get current
 * weather from the openweather -service and show it
 * on the screen.
 *
 * 1. Create a free account to openweathermap.org -site
 * and get your own API-key from
 * https://home.openweathermap.org/api_keys
 * Activating may take couple hours, so do this in advance!
 *
 * 2. You can try the API (https://openweathermap.org/current)
 * in eq. https://apitester.org/app -service. When the API
 * is working, you may start doing the task.
 *
 */

/*
 * 3. (6p) Get first the weather data using the API-call
 * for a muncipality of your choice. Do it so that the query
 * will happen for example once in a minute.
 * You can use the fetch functionality for this
 * https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 *
 * For the timer, it's time to annoy your good old friend
 * setInterval() again.
 *
 * Beware! The unit in setInterval is really milliseconds,
 * so you can use your 1000 free API calls per day within one
 * second if you're not careful. Don't ask why I know this 🫠
 *
 * If you happen to do different search with different parameters,
 * you can stop the previous one with clearInterval -function.
 * No need to start with that, but you should do it at some point somewhere 🙂.
 *
 * Parse your answer with JSON.parse() -function and pass to the next part.
 */

const URL =
  "https://api.openweathermap.org/data/2.5/weather?lat=60.192059&lon=24.945831&units=metric&appid=aecd880c55402474294f8ffa79790fd6";
let lat = 0;
let lon = 0;
getLocation();

setInterval(fetchWeatherData, 60000);

function fetchWeatherData(lat, lon) {
  console.log("Fetch data");

  const URL_geo = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=aecd880c55402474294f8ffa79790fd6`;
  fetch(URL_geo)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      renderWeatherData(data);
    });
}

/* Yes! You have now the data - then what?
 *
 * It's time to render it out. No need to be extra fancy. Text based
 * communication has brought us far.
 *
 * Why not try out the Javascript template literal at this point?
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
 *
 */

function renderWeatherData(weatherData) {
  let weatherDiv = document.querySelector("#weather");
  console.log(weatherData.name);
  console.log(weatherData.weather[0].description);

  let message = `Hello! Today in ${weatherData.name} the weather is ${weatherData.weather[0].main}, most specifcally ${weatherData.weather[0].description}.
  <p>The temperature is ${weatherData.main.temp}° but if feels like ${weatherData.main.feels_like}°</p>`;

  weatherDiv.innerHTML = message;
}

// ! Da Fare
/* (2p)
 * Now you may touch the HTML-site again. Do a functionality where the user
 * can select another city. For example dropdown -selector which contains
 * a few places. Cities, other landmarks etc - you decide!
 *
 * Write the function underneath where you handle the change of the place
 * and start the function with a html event.
 *
 */

let selector = document.querySelector("#cities");
selector.addEventListener("change", selectLocation);
function selectLocation(e) {
  console.log("Change location", JSON.parse(e.target.value));
  const selectedLoc = {
    lat: JSON.parse(e.target.value).lat,
    lon: JSON.parse(e.target.value).lon,
  };
  fetchWeatherData(selectedLoc.lat, selectedLoc.lon);
}

/*
 * (BONUS: 4p) Make the positioning funciton with HTML geolocation-API
 * https://www.w3schools.com/html/html5_geolocation.asp
 * Implement a button to the site which triggers the location definiton and
 * fetches the local weather.
 *
 * You may also handle the case when the privacy-concerned user slaps
 * the DENY-button in the location prompt. Some people really can't make
 * up their mind 🤷‍♂️
 */

const h2 = document.querySelector("h2");

function getLocation() {
  console.log("Get Location");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    h2.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;

  fetchWeatherData(lat, lon);
  h2.innerHTML =
    "Latitude: " +
    position.coords.latitude +
    "<br>Longitude: " +
    position.coords.longitude;
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      h2.innerHTML = "User denied the request for Geolocation.";

      break;
    case error.POSITION_UNAVAILABLE:
      h2.innerHTML = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      h2.innerHTML = "The request to get user location timed out.";
      break;
    case error.UNKNOWN_ERROR:
      h2.innerHTML = "An unknown error occurred.";
      break;
  }
}
