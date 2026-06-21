const apiKey = "5079ed96da8c4ffa82b135051260706";
const cityInput = document.querySelector(".city");
const searchBtn = document.querySelector(".search-btn");

async function getWeather(city) {
    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        document.querySelector(".city-name").textContent =
            `${data.location.name}, ${data.location.country}`;

        document.querySelector(".temp").textContent =
            `${Math.round(data.current.temp_c)}°C`;

        document.querySelector(".description").textContent =
            data.current.condition.text;

        document.querySelector(".humidity").textContent =
            data.current.humidity;

        document.querySelector(".wind").textContent =
            data.current.wind_kph;

        document.querySelector(".feels-like").textContent =
            Math.round(data.current.feelslike_c);

        document.querySelector(".weather-icon").src =
            "https:" + data.current.condition.icon;

        document.querySelector(".weather-icon").alt =
            data.current.condition.text;

        // Weather background effects
        const condition =
            data.current.condition.text.toLowerCase();

        document.body.classList.remove(
            "sunny",
            "cloudy",
            "rainy",
            "snowy",
            "night"
        );

        const rain = document.querySelector(".rain");
        const snow = document.querySelector(".snow");
        const clouds = document.querySelector(".clouds");

        if (rain) rain.style.display = "none";
        if (snow) snow.style.display = "none";
        if (clouds) clouds.style.display = "none";

        if (
            condition.includes("rain") ||
            condition.includes("drizzle") ||
            condition.includes("shower")
        ) {
            document.body.classList.add("rainy");

            if (rain) {
                rain.style.display = "block";
            }
        }
        else if (
            condition.includes("snow") ||
            condition.includes("blizzard") ||
            condition.includes("sleet") ||
            condition.includes("ice")
        ) {
            document.body.classList.add("snowy");

            if (snow) {
                snow.style.display = "block";
            }
        }
        else if (
            condition.includes("cloud") ||
            condition.includes("overcast") ||
            condition.includes("mist") ||
            condition.includes("fog")
        ) {
            document.body.classList.add("cloudy");

            if (clouds) {
                clouds.style.display = "block";
            }
        }
        else if (
            condition.includes("clear")
        ) {
            const hour = data.location.localtime.split(" ")[1].split(":")[0];

            if (hour >= 19 || hour <= 5) {
                document.body.classList.add("night");
            } else {
                document.body.classList.add("sunny");
            }
        }
        else {
            document.body.classList.add("sunny");
        }

    } catch (error) {
        console.error(error);
        alert("Could not find that city.");
    }
}

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if (city !== "") {
        getWeather(city);
    }
});

cityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        const city = cityInput.value.trim();

        if (city !== "") {
            getWeather(city);
        }
    }
});

getWeather("Kyiv");