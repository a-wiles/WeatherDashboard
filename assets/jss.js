var apiKey = "b48ef118561e3973171cb6d38fec2e90";
var citySelectionEl = document.querySelector("#cityselection");
var enteredCityEl = document.querySelector("#enteredcity");
var city = "";
var forcast = document.querySelector("#forcast");
var futureForcast = document.querySelector("#futureforcast");
var htmlCode = "";

//User City Search
var citySearch = function (event) {
    event.preventDefault();
    var city = enteredCityEl.value.trim();
    console.log("city");
    displayWeather(city);

}

//API Call
var getWeatherForcast = function (lat, lon,cityname) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly&appid=" + apiKey + "";

    fetch(apiUrl).then(function (response) {
        //If request is sucessful
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                if (data.current.uvi > 11) {
                    var uviColor = "purple"
                } else if (data.current.uvi > 8) {
                    var uviColor = "red"
                } else if (data.current.uvi > 6) {
                    var uviColor = "orange"
                } else if (data.current.uvi > 3) {
                    var uviColor = "yellow"
                } else {
                    var uviColor = "green"
                }

                var htmlCode = `<div class="card mb-3" style="max-width: 540px;">
                <div class="row no-gutters">
                  <div class="col-md-4">
                    <img src="https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png" class="card-img" alt="...">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">${cityname}</h5>
                      <p class="card-text">Description: ${data.current.weather[0].description}</p>
                      <p class="card-text">Temperature: ${data.current.temp}</p>
                      <p class="card-text">Humidity: ${data.current.humidity}</p>
                      <p class="card-text">Wind: ${data.current.wind_speed}</p>
                      <p class="card-text ${uviColor}" >UVI: ${data.current.uvi}</p>
                    </div>
                  </div>
                </div>
              </div>`
              document.getElementById ("forcast").innerHTML = htmlCode;
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
              // console.log(data);
               var lat = data.coord.lat;
               var lon = data.coord.lon;
               getWeatherForcast (lat, lon,cityname);
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
