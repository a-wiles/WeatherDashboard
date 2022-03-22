var apiKey = "b48ef118561e3973171cb6d38fec2e90";
var citySelectionEl = document.querySelector("#cityselection");
var enteredCityEl = document.querySelector("#enteredcity");
var forcast = document.querySelector("#forcast");
var futureForcast = document.querySelector("#futureforcast");
var htmlCode = "";
var city = "";
var listItemEl = document.querySelector("#list-group");
var previousCityEl = document.querySelector("#previouscity");

//User City Search
var citySearch = function (event) {
  event.preventDefault();
  var city = enteredCityEl.value.trim();
  displayWeather(city);
}
 

//API Call
var getWeatherForcast = function (lat, lon, cityname) {
  var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minute&appid=" + apiKey + "&units=imperial";

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
                <div class="row col-md-12" "no-gutters">
                  <div class="col-md-4">
                    <img src="https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png" class="card-img" alt="...">
                  </div>
                  <div class="col-md-12">
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
        document.getElementById("forcast").innerHTML = htmlCode;

        var forcastHTML = "";
        for (var i = 0; i < 5; i++) {
          forcastHTML += `<div class="card mb-3" style="max-width: 540px; col-md-4">
                  <div class="row no-gutters justify-space-around">
                    <div class="col-md-4">
                      <img src="https://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png" class="card-img" alt="...">
                    </div>
                    <div class="col-md-8">
                      <div class="card-body">
                        <p class="card-text">${moment().add(i + 1, "days").format("MMM Do YY")}</p>
                        <p class="card-text">Description: ${data.daily[i].weather[0].description}</p>
                        <p class="card-text">Temperature: ${data.daily[i].temp.day}</p>
                        <p class="card-text">Humidity: ${data.daily[i].humidity}</p>
                        <p class="card-text">Wind: ${data.daily[i].wind_speed}</p>
                      </div>
                    </div>
                  </div>
                </div>`
        }
        document.getElementById("futureforcast").innerHTML = forcastHTML;
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
        getWeatherForcast(lat, lon, cityname);
        var previousSearch = JSON.parse(localStorage.getItem("city")) || [];
        if (previousSearch.indexOf(cityname) == -1) {
          previousSearch.push(cityname);
          localStorage.setItem("city", JSON.stringify(previousSearch));
          historySearch()
        }
      });
    }
    else {
      alert("Please enter a valid City");
    }
  })
};
var historySearch = function (city) {
  var previousSearch = JSON.parse(localStorage.getItem("city")) || [];
  
  var buttonCode = ""
  for (let i = 0; i < previousSearch.length; i++) {
    // var liEL = document.createAttribute("li")
    // var ButEl = document.createElement("button");
    // ButEl.setAttribute("type","button");
    // ButEl.classList.add("btn-block","btn-prmary",)
    buttonCode += `<li><button name="${previousSearch[i]}"
    class="btn-block btn-primary previouscity"
    onclick="previousSelection(event)">${previousSearch[i]}</button></li>`
  }
  previousCityEl.innerHTML = buttonCode
}

previousCityEl.addEventListener("click",previousSelection)
var previousSelection = function (event) {
  //  e.preventDefault()
  console.log("event")
  if(event.target.matches(".previouscity")) {
    var city = event.target.getAttribute("name")
   console.log("onclick",event.target.getAttribute("name"))
   displayWeather(city)
  }
}
//Event Listeners
citySelectionEl.addEventListener("submit", citySearch);
historySearch(city);
