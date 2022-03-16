var apiKey = "b48ef118561e3973171cb6d38fec2e90";
var citySelectionEl = document.querySelector("#cityselection");
var enteredCityEl = document.querySelector("#enteredcity");
var city = "";
var forcast = document.querySelector("#forcast");
var futureForcast = document.querySelector("#futureforcast");
var lat = "41.8781";
var lon = "87.6298";
var htmlCode = "";

//API Call
var getWeatherForcast = function (event) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" +lat+ "&lon=" +lon+ "&exclude=hourly&appid=" +apiKey+"";

    fetch(apiUrl).then(function(response) {
        //If request is sucessful
        if (response.ok) {
            response.json(). then(function(data) {
                displayWeather(data);

                // check if api has paginated issues
                if (response.headers.get("Link")) {
                    displayWarning(event);
                }
            });
        }
        else {
            alert("Please enter a valid City");
        }
}); 
};

var displayWeather = function () {
//Use HTML += to add in CSS properties, or hardcode in HTML 5 day blocks?
}

//Event Listeners
citySelectionEl.addEventListener("submit", getWeatherForcast);


//Final Calls
getWeatherForcast ();
