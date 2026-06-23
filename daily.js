const apiKey = "5079ed96da8c4ffa82b135051260706";

const cityInput = document.querySelector(".city");
const searchBtn = document.querySelector(".search-btn");

let currentCity = "Kyiv";
let selectedDayIndex = 0;

document.getElementById("date").textContent =
new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
});

async function getWeather(city, dayIndex = 0) {

    try {

        const response = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=10&aqi=no&alerts=no`
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        currentCity = city;
        selectedDayIndex = dayIndex;

        document.querySelector(".city-name").textContent =
            `${data.location.name}, ${data.location.country}`;

        const forecast =
            data.forecast.forecastday[dayIndex];

        if (!forecast) return;

        document.getElementById("date").textContent =
            forecast.date;

        document.querySelector(".day-temp").textContent =
            `${Math.round(forecast.day.maxtemp_c)}°C`;

        document.querySelector(".night-temp").textContent =
            `${Math.round(forecast.day.mintemp_c)}°C`;

        document.querySelector(".day-icon").src =
            "https:" + forecast.day.condition.icon;

        document.querySelector(".night-icon").src =
            "https:" + forecast.day.condition.icon;

        document.querySelector(".description").textContent =
            forecast.day.condition.text;

        document.querySelector(".wind").textContent =
            Math.round(forecast.day.maxwind_kph);

        document.querySelector(".temperature").textContent =
            Math.round(forecast.day.avgtemp_c);

        document.querySelector(".humidity").textContent =
            forecast.day.avghumidity;

        document.querySelector(".precipitation").textContent =
            forecast.day.daily_chance_of_rain;

    }
    catch(error) {
        console.error(error);
        alert("City not found!");
    }
}

searchBtn.addEventListener("click", () => {

    const city = cityInput.value.trim();

    if(city){
        getWeather(city, selectedDayIndex);
    }
});

cityInput.addEventListener("keydown", e => {

    if(e.key === "Enter"){

        const city = cityInput.value.trim();

        if(city){
            getWeather(city, selectedDayIndex);
        }
    }
});

document.querySelector(".day1-btn").addEventListener("click", () => {
    getWeather(currentCity, 0);
});

document.querySelector(".days3-btn").addEventListener("click", () => {
    getWeather(currentCity, 2);
});

document.querySelector(".days7-btn").addEventListener("click", () => {
    getWeather(currentCity, 6);
});

document.querySelector(".days10-btn").addEventListener("click", () => {
    getWeather(currentCity, 9);
});

getWeather("Kyiv", 0);