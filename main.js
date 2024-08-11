// // OpenWeather api 
// const apiKey  = "" // add your api key
// const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q="

// const searchBox = document.querySelector('.search input');
// const searchBtn = document.querySelector('.search button');
// const weatherIcon = document.querySelector('.weather-icon');

// // fetch data from the API 
// async function checkWeather(city) {
//   const response = await fetch(apiUrl + city + `&appid=${apiKey}`)
//   var data = await response.json()

//   document.querySelector('.weather').style.display = "flex"

//   // display data 
//   document.querySelector('.city').innerHTML = data.name;
//   document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°c";
//   document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
//   document.querySelector('.wind').innerHTML = data.wind.speed + "km/h";

//   // change weather icon 
//   if(data.weather[0].main == "Clouds"){
//     weatherIcon.src = "./public/clouds.png"
//   }else if(data.weather[0].main == "Rain"){
//     weatherIcon.src = "./public/rain.png"
//   }else if(data.weather[0].main == "Drizzle"){
//     weatherIcon.src = "./public/drizzle.png"
//   }else if(data.weather[0].main == "Mist"){
//     weatherIcon.src = "./public/mist.png"
//   }
// }

// searchBtn.addEventListener("click", () => {
//   checkWeather(searchBox.value);
// })


 // OpenWeather api 
const apiKey  = "41e824aea5593f52693ccfea198566d5" // add your api key
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q="

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');


async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    const data = await response.json();

    // Check if the required data properties exist before accessing them
    if (data.name && data.main && data.main.temp && data.main.humidity && data.wind && data.wind.speed) {
      document.querySelector('.weather').style.display = "flex";
      document.querySelector('.city').innerHTML = data.name;
      document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°C";
      document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
      document.querySelector('.wind').innerHTML = data.wind.speed + "km/h";

      // Change weather icon based on weather condition
      if (data.weather && data.weather.length > 0) {
        const weatherCondition = data.weather[0].main;
        switch (weatherCondition) {
          case "Clouds":
            weatherIcon.src = "./public/clouds.png";
            break;
          case "Rain":
            weatherIcon.src = "./public/rain.png";
            break;
          case "Drizzle":
            weatherIcon.src = "./public/drizzle.png";
            break;
          case "Mist":
            weatherIcon.src = "./public/mist.png";
            break;
          default:
            // Handle other weather conditions or set a default icon
            break;
        }
      }
    } else {
      console.error('Required data is missing in the response.');
    }
  } catch (error) {
    console.error('An error occurred while fetching or processing the data:', error);
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});