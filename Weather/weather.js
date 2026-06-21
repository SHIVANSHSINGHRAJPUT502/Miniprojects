/* ==========================================
   ATMOSPHERE AURA — weather logic + scene engine
   ========================================== */

const apiKey = 'cceea1b22c104a2dd0f5553cc286a6f0';
const scene = document.getElementById('weatherScene');
let lightningTimer = null;

async function getWeather() {
    const cityInput = document.getElementById('cityInput');
    const city = cityInput.value.trim();
    const resultDiv = document.getElementById('weatherResult');

    if (!city) return;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('City not found');

        const data = await response.json();
        const mainCondition = data.weather[0].main;

        document.body.setAttribute('data-weather', mainCondition);
        buildScene(mainCondition);

        resultDiv.innerHTML = `
            <h2>${data.name}</h2>
            <div class="temp-row">
                <span class="temp-big">${Math.round(data.main.temp)}°</span>
                <span class="condition-label">${data.weather[0].description}</span>
            </div>
            <div class="stat-grid">
                <div class="stat-card">
                    <span class="label">Feels like</span>
                    <span class="value">${Math.round(data.main.feels_like)}°C</span>
                </div>
                <div class="stat-card">
                    <span class="label">Humidity</span>
                    <span class="value">${data.main.humidity}%</span>
                </div>
                <div class="stat-card">
                    <span class="label">Wind</span>
                    <span class="value">${data.wind.speed} m/s</span>
                </div>
                <div class="stat-card">
                    <span class="label">Pressure</span>
                    <span class="value">${data.main.pressure} hPa</span>
                </div>
            </div>
        `;
    } catch (error) {
        document.body.setAttribute('data-weather', 'default');
        buildScene('default');
        resultDiv.innerHTML = `<p class="error">${error.message}</p>`;
    }
}

document.getElementById('cityInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') getWeather();
});

/* ==========================================
   SCENE ENGINE — builds coded, animated DOM
   elements per weather condition (no GIFs,
   no emoji, just moving parts).
   ========================================== */

function rand(min, max) {
    return Math.random() * (max - min) + min;
}

function clearScene() {
    if (lightningTimer) {
        clearInterval(lightningTimer);
        lightningTimer = null;
    }
    scene.innerHTML = '';
}

function addStars(count) {
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.setProperty('--x', rand(0, 100) + '%');
        star.style.setProperty('--y', rand(0, 70) + '%');
        star.style.setProperty('--s', rand(1, 2.5) + 'px');
        star.style.setProperty('--dur', rand(2.5, 6) + 's');
        star.style.setProperty('--delay', rand(0, 4) + 's');
        scene.appendChild(star);
    }
}

function addClouds(count, opacityRange = [0.3, 0.6]) {
    for (let i = 0; i < count; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'cloud';
        cloud.style.setProperty('--y', rand(5, 45) + '%');
        cloud.style.setProperty('--w', rand(160, 320) + 'px');
        cloud.style.setProperty('--o', rand(opacityRange[0], opacityRange[1]));
        cloud.style.setProperty('--dur', rand(35, 70) + 's');
        cloud.style.setProperty('--delay', rand(-40, 0) + 's');
        scene.appendChild(cloud);
    }
}

function addRain(count, intense = false) {
    for (let i = 0; i < count; i++) {
        const drop = document.createElement('div');
        drop.className = 'raindrop';
        drop.style.setProperty('--x', rand(0, 100) + '%');
        drop.style.setProperty('--len', rand(40, intense ? 110 : 80) + 'px');
        drop.style.setProperty('--dur', rand(intense ? 0.4 : 0.7, intense ? 0.8 : 1.3) + 's');
        drop.style.setProperty('--delay', rand(0, 2) + 's');
        drop.style.setProperty('--o', rand(0.4, 0.85));
        scene.appendChild(drop);
    }
}

function addSnow(count) {
    for (let i = 0; i < count; i++) {
        const flake = document.createElement('div');
        flake.className = 'snowflake';
        flake.style.setProperty('--x', rand(0, 100) + '%');
        flake.style.setProperty('--s', rand(3, 7) + 'px');
        flake.style.setProperty('--dur', rand(8, 16) + 's');
        flake.style.setProperty('--delay', rand(0, 10) + 's');
        flake.style.setProperty('--o', rand(0.5, 0.95));
        scene.appendChild(flake);
    }
}

function addFog(count) {
    for (let i = 0; i < count; i++) {
        const band = document.createElement('div');
        band.className = 'fog-band';
        band.style.setProperty('--y', rand(0, 90) + '%');
        band.style.setProperty('--h', rand(60, 160) + 'px');
        band.style.setProperty('--o', rand(0.12, 0.28));
        band.style.setProperty('--dur', rand(18, 36) + 's');
        band.style.setProperty('--delay', rand(-10, 0) + 's');
        scene.appendChild(band);
    }
}

function addSun() {
    const wrap = document.createElement('div');
    wrap.className = 'sun-wrap';
    wrap.innerHTML = `<div class="sun-rays"></div><div class="sun-core"></div>`;
    scene.appendChild(wrap);
}

function addLightning() {
    const flash = document.createElement('div');
    flash.className = 'lightning-flash';
    scene.appendChild(flash);

    const tint = document.createElement('div');
    tint.className = 'storm-tint';
    scene.insertBefore(tint, flash);

    const strike = () => {
        flash.classList.remove('flash');
        // force reflow so the animation can restart
        void flash.offsetWidth;
        flash.classList.add('flash');
    };

    strike();
    lightningTimer = setInterval(strike, rand(3500, 7500));
}

function buildScene(condition) {
    clearScene();

    switch (condition) {
        case 'Clear':
            addSun();
            addStars(20);
            break;

        case 'Clouds':
            addStars(15);
            addClouds(6, [0.35, 0.65]);
            break;

        case 'Rain':
        case 'Drizzle':
            addClouds(4, [0.25, 0.45]);
            addRain(condition === 'Drizzle' ? 50 : 90);
            break;

        case 'Thunderstorm':
            addClouds(5, [0.3, 0.5]);
            addRain(110, true);
            addLightning();
            break;

        case 'Snow':
            addClouds(4, [0.2, 0.4]);
            addSnow(70);
            break;

        case 'Mist':
        case 'Haze':
        case 'Fog':
            addFog(7);
            break;

        default:
            addStars(40);
            break;
    }
}

// Initial ambient scene on load
buildScene('default');
