// Getting element from their id
// Input-div fields necessary to get user wanted details
let information = document.getElementById("information");
let inputField = document.getElementById("inputField");
let locationButton = document.getElementById("locationButton");

// Weather-div fields necessary for outputting details obtained by the API
let weather_image = document.getElementById("weather_image");
let wheater_description = document.getElementById("wheater-description");
let weather_location = document.getElementById("location");
let weather_temperature = document.getElementById("temperature");
let weather_humidity = document.getElementById("humidity");

// Adding a EventListener, so when a action is performed on that element, I can execute certain piece of code

inputField.addEventListener("keyup", e =>
{
    // If user presses enter button and input value is not empty, request data from API
    if(e.key == "Enter" && inputField.value != "")
        requestAPI(inputField.value);
}
)

locationButton.addEventListener("click", () =>
{
    // If user browser support geolocalizzation and allow it, the code will take the device position
    if(navigator.geolocation)
        navigator.geolocation.getCurrentPosition(onSuccess, onError);

    // Only execute this is the broser does not support geolocation
    else
        alert("Your browser do not support geolocalizzation API");
}
)

// Only executes if the geolocalizzation was successful
function onSuccess(position)
{
    // Getting latitude and longitude of the user device from position object
    const {latitude, longitude} = position.coords;
    // API request using geolocalizzation
    fetchAPI("https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&units=metric&appid=" + config.API_KEY);

}

// Only executes if there was an error during geolocalizzation
function onError(error)
    { information.innerText = error.message; }

// This function get executed when we write the name of the city
function requestAPI(city)
    { fetchAPI("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + config.API_KEY); }

// This function is used for getting data from the API
function fetchAPI(api)
{
    information.innerText = "Getting weather details...";
    // Getting data from API, then calling weatherDetails function for updating the weather information on the page
    // After fetching the API, we assign to response the API response as a JSON, then we call weatherDetails function
    fetch(api).then(response => response.json()).then(result => updateWeatherDetails(result));
}

// This function is used for updating the weather information on the page
function updateWeatherDetails(result)
{
    // Code 404 = not found
    if(result.cod == "404")
        information.innerText = inputField.value + " isn't a valid city name";

    else
    {
        information.innerText = "Detaild obtained!";
        const city = result.name;
        const country = result.sys.country;
        const {description, id} = result.weather[0];
        const {humidity, temp} = result.main;

        // Group 2xx: Thunderstorm
        if(id >= 200 && id <= 232)
            weather_image.src = "images/storm.svg";
            
        // Group 3xx: Drizzle, Group 5xx: Rain
        else if((id >= 300 && id <= 321) || (id >= 500 && id <= 531))
            weather_image.src = "images/rain.svg";
            
        // Group 6xx: Snow
        else if(id >= 600 && id <= 622)
            weather_image.src = "images/snow.svg";
                
        // Group 7xx: Atmosphere
        else if(id >= 701 && id <= 781)
            weather_image.src = "images/haze.svg";
                
        // 800: Clear
        else if(id == 800)
            weather_image.src = "images/clear.svg";
                
        // Group 80x: Clouds
        else if(id >= 801 && id <= 804)
            weather_image.src = "images/cloud.svg";

        // Assign to every field the corrisponding value
        // Math.ceil rounds the number to the next integer, for example 1,34 will be rounded to 2
        weather_temperature.innerText = Math.ceil(temp);
        wheater_description.innerText = description;
        weather_location.innerText = city + ", " + country;
        weather_humidity.innerText = humidity;
        
    }
}