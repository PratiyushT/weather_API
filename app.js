
const img = document.querySelector('.weather-icon');
const form = document.querySelector('form');
const search = document.querySelector('#search-bar');
const container = document.querySelector('.weather-app')
//Get weather information using openweathermap's API
async function getWeather() {
    try {
        searchValPlace = await search.value;
        if (!search.value) searchValPlace = "kathmandu";

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchValPlace}&units=metric&id=524901&appid=39f5aaa214b38f2b42de811a1c4baccc`);
        const weatherData = await response.json();

        const city = weatherData.name;
        const weatherCondition = weatherData.weather[0].description;
        const temperature = weatherData.main.temp;
        const weatherIcon = weatherData.weather[0].icon;
        const feelsLike = weatherData.main.feels_like;
        const humidity = weatherData.main.humidity;


        //returning a object (which is a promise)
        return { city, weatherCondition, temperature, weatherIcon, feelsLike, humidity };
    }
    catch {
        console.log("error")
    }

}

//Getting an async promise value as obj (from getWeather()) and using the values.
function displayData() {
    getWeather().then(resp => {
        const { city, weatherCondition, temperature, weatherIcon, feelsLike, humidity } = resp;
        // img.src = `http://openweathermap.org/img/w/${weatherIcon}.png`
        container.textContent=' ';
        createNode("city", city);
        createNode("weather", weatherCondition);
        createNode("temp", `Temp: ${temperature}`);
        createNode("weather-feel", `Feels Like: ${feelsLike}`);
        createNode("humidity", `Humidity: ${humidity}`);
    })
}

function createNode(classList, value) {
    const weatherNode = document.createElement('div');
    weatherNode.classList.add('weather-app-element');
    weatherNode.classList.add(classList);
    weatherNode.textContent = value;
    container.appendChild(weatherNode);
}

displayData();

form.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        displayData();
    }
})