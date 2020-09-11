let city = document.querySelector("#city");
let display = document.querySelector("#weather");
let place = document.querySelector("#location");
let temperature = document.querySelector("#temp");
let button = document.querySelector("#search-button");
let results = document.querySelector("#results");
let err_msg = document.querySelector("#error");
let err_parag = document.querySelector("#error-msg");
let icon_url = document.getElementById("#weather-icon");

//calling weather API
function grab_weather() {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      city.value +
      "&appid=24e5d21bed1f27491943f09b93de4b4f&units=metric"
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let temp = Math.round(data["main"]["temp"]);
      let weather = data["weather"][0]["description"];
      let icon = data["weather"][0]["icon"];
      let url = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      place.innerHTML = city.value;
      temperature.innerHTML = temp;
      display.innerHTML = weather;
      icon_url.src = url;
      results.style.display = "inline-block";

      localStorage.setItem("last-key", [city.value, temp, weather]);
    })

    .catch((err) => {
      err_msg.innerHTML = city.value;
      err_parag.style.display = "inline-block";
    });
}

// Persisting previous search results by fetching from local storage on reload
if (window.performance.navigation.type == performance.navigation.TYPE_RELOAD) {
  console.info("This page is reloaded");
  if (localStorage.getItem("last-key") === null) {
    console.log(`Local storage empty`);
  } else {
    let stored_val = localStorage.getItem("last-key").split(",");
    place.innerHTML = stored_val[0];
    temperature.innerHTML = stored_val[1];
    display.innerHTML = stored_val[2];
    results.style.display = "inline-block";
  }
}

button.addEventListener("click", () => {
  grab_weather();
});
