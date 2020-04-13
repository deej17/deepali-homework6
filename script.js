$(document).ready(function () {
  var cities = [];
  $("#cityList").empty();
  $("#search").on("click", function (event) {
    event.preventDefault();
    var city = $(this).attr("#cityList");
    var searchCity = "";
    searchCity = $("#cityInput").val().trim();
    var city = $("#cityInput").val();
    cities.push(city);

    $("#cityInput").val(" ");
    var queryUrl =
      "https://api.openweathermap.org/data/2.5/weather?&appid=f113034b1910b623e4283eb8166ade61&units=imperial";

    var queryFive =
      "https://api.openweathermap.org/data/2.5/forecast?&Appid=f113034b1910b623e4283eb8166ade61&units=imperial";

    var newUrlDaily = queryUrl + "&q=" + searchCity;
    var newUrlForecast = queryFive + "&q=" + searchCity;
    if (searchCity == "") {
      return;
    }
    $.ajax({
      url: newUrlDaily,
      method: "GET",
    }).then(function (data) {
      var cityList = $("<ul id='cityList'>").append("<li>");
      cityList.append(data.name);
      cityList.text(data.name);
   
      //for current weather
      var weather = $("#oneCity").append("<div>");
      weather.empty();

      var cityName = weather.append("<p>");
      // for date
      var sec = data.dt;
      var date = new Date(sec * 1000);
      var newTime = date.toLocaleTimeString();
      cityName.append("<h3>" + data.name + " " + newTime + "<h3>");
      cityName.append("<p>" + "Temperature: " + data.main.temp + "</p>");
      cityName.append("<P>" + "Humidity: " + data.main.humidity + "</p>");
      cityName.append("<p>" + "wind Speed: " + data.wind.speed + "</p>");

      //uv index url
      var uvURLBase = "https://api.openweathermap.org/data/2.5/uvi?"; //
      var apiKey = "f113034b1910b623e4283eb8166ade61";
      var langitude = data.coord.lat;
      var longitude = data.coord.lon;

      $.ajax({
        url:
          uvURLBase +
          "appid=" +
          apiKey +
          "&lat=" +
          langitude +
          "&lon=" +
          longitude,
        method: "GET",
      }).then(function (response) {
        cityName.append("<p>" + "UV-index: " + response.value);
        $("#cityInput").val("");
      });
    });
    //start call for forecast
    $.ajax({
      url: newUrlForecast,
      method: "GET",
    }).then(function (forecast) {
      var forecastcard = $(".forecast");
      forecastcard.empty();
      for (i = 0; i < forecast.list.length; i++) {
        if (forecast.list[i].dt_txt.indexOf("18:00:00") !== -1) {
          var utfiveday = new Date(forecast.list[i].dt * 1000);
          var realfiveDate = utfiveday.toLocaleDateString();

          forecastcard.append(
            "<div class=fiveDayColor>" +
              "<p>" +
              realfiveDate +
              "</p>" +
              `<img src="https://openweathermap.org/img/wn/${forecast.list[i].weather[0].icon}@2x.png">` +
              "<p>" +
              "Temperature: " +
              forecast.list[i].main.temp +
              "</p>" +
              "<p>" +
              "Humidity: " +
              forecast.list[i].main.humidity +
              "%" +
              "</p>" +
              "</div>"
          );
        }
      }
      renderList();
    });
  });

  function renderList() {
    var ulist = $("<ul>");
    for (var i = 0; i < cities.length; i++) {
      ulist.attr("cityList", cities[i]);
      ulist.text(cities[i]);
      $("#cityList").append(ulist);
    }
  }
});
