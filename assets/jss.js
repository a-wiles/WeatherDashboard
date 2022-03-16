var apiKey = "b48ef118561e3973171cb6d38fec2e90";
var citySelectionEl = document.querySelector("#cityselection");
var enteredCityEl = document.querySelector("#enteredcity");
var city = "";
var forcast = document.querySelector("#forcast");
var futureForcast = document.querySelector("#futureforcast");
var lat = "";
var lon = "";
var htmlCode = "";

//User City Search
var citySearch = function (event) {
    event.preventDefault();
    var city = enteredCityEl.value.trim();
    console.log("city");
    displayWeather(city);

}

//API Call
var getWeatherForcast = function (event) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly&appid=" + apiKey + "";

    fetch(apiUrl).then(function (response) {
        //If request is sucessful
        if (response.ok) {
            response.json().then(function (data) {
                displayWeather(data);
            });
        }
        else {
            alert("Please enter a valid City");
        }
    });
};

var displayWeather = function (cityname) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiKey}`

    fetch(apiUrl).then(function (response) {
        //If request is sucessful
        if (response.ok) {
            response.json().then(function (data) {
                displayWeather(data);
            });
        }
        else {
            alert("Please enter a valid City");
        }
    })
};

//Event Listeners
citySelectionEl.addEventListener("submit", citySearch);
    


//Final Calls
// getWeatherForcast ();
