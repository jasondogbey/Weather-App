const weatherForm = document.querySelector(".weatherForm")
const cityInput = document.querySelector(".cityInput")
const card = document.querySelector(".card")
const apiKey = "cbe537d9d450fd70c57792406eac02d2"


weatherForm.addEventListener("submit", async event=> {
    event.preventDefault()

    const city = cityInput.value
    card.textContent = ""

    if (city) {
        try {
        const weatherData = await getWeatherData(city)
        displayWeatherInfo(weatherData)
        }
        catch(error) {
            displayError(error)
        }
    } else {
        displayError("Please enter a city")
    }
})

async function getWeatherData(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error("Could not fetch weather data. Please check city")
        }
            return await response.json()
}

function displayWeatherInfo(data) {
    const {name: city, main: {temp, humidity}, weather: [{description, id}]} = data

    card.textContent = ""
    card.style.display = "flex"

    const cityElement = document.createElement("h1")
    cityElement.textContent = city
    cityElement.classList.add("cityDisplay")

    const tempElement = document.createElement("p")
    tempElement.textContent = `${(parseFloat(temp) - 273.15).toFixed(1)}°C`
    tempElement.classList.add("tempDisplay")

    const humidityElement = document.createElement("p")
    humidityElement.textContent = `${humidity}%`
    humidityElement.classList.add("humidityDisplay")

    const descriptionElement = document.createElement("p")
    descriptionElement.textContent = description
    descriptionElement.classList.add("descDisplay")

    const emojiElement = document.createElement("p")
    emojiElement.textContent = getWeatherEmoji(id)
    emojiElement.classList.add("weatherEmoji")

    card.appendChild(cityElement)
    card.appendChild(tempElement)
    card.appendChild(humidityElement)
    card.appendChild(descriptionElement)
    card.appendChild(emojiElement)
}

function getWeatherEmoji(weatherId) {
    switch(true) {
        case (weatherId >= 200 && weatherId <= 232):
            return "⛈️";
        case (weatherId >= 300 && weatherId <= 321):
            return "🌧️";
        case (weatherId >= 500 && weatherId <= 531):
            return "💧";
        case (weatherId >= 600 && weatherId <= 622):
            return "❄️";
        case (weatherId >= 700 && weatherId <= 781):
            return "😶‍🌫️";
        case (weatherId === 800):
            return "🌞";
        case (weatherId >= 801 && weatherId <= 804):
            return "☁️";
        default:
            return "⁇";
    }
}

function displayError(message) {
    const errorElement = document.createElement("p")
    errorElement.textContent = message
    errorElement.classList.add("errorDisplay")

    card.appendChild(errorElement)
    card.style.display = "flex"
}

