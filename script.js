var cities = ["Austin", "Chicago", "New York", "Orlando", "Seattle"];

renderList();
// displayCityInfo function re-renders the HTML to display the appropriate content
function displayCityInfo() {
  //   var city = $(this).attr("#cityList");
  var queryURL =
    "api.openweathermap.org/data/2.5/forecast?q=" city +"&appid=f113034b1910b623e4283eb8166ade61";
  // Creating an AJAX call for the specific city button being clicked
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    //  temperature
    alert(response);
    var cityList = $("<ul id='cityList'>");
    var temp = response.main.temp;
    var pTemp = $("<p>").text("Temperature: " + temp);
    cityList.append(pTemp);
    console.log(ptemp);
    // humidity
    var humidity = response.main.humidity;
    var pHumidity = $("<p>").text("Humidity: " + humidity);
    cityList.append(pHumidity);
    //wind speed
    var wind = response.wind.speed;
    var pWind = $("<p>").text("Wind speed: " + wind);
    cityList.append(pWind);
  });
}

// Render the city list
function renderList() {
  $("#cityList").empty();
  for (var i = 0; i < cities.length; i++) {
    var ulist = $("<ul>");
    ulist.addClass("list-group");
    ulist.attr("cityList", cities[i]);
    ulist.text(cities[i]);
    $("#cityList").append(ulist);
    displayCityInfo();
  }
}

// Search click event
$("#search").click(function (event) {
  event.preventDefault();
  var city = $("#cityInput").val();
  cities.push(city);
  renderList();
  $("#cityInput").val(" ");
});
