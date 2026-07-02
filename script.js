const API_KEY = "217b51efc6b8a36a19da4aa995d278b3";
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");


function addMessage(message, sender) {

    const messageDiv = document.createElement("div");

    messageDiv.classList.add(sender);

    messageDiv.textContent = message;

    chatBox.appendChild(messageDiv);

    chatBox.scrollTop = chatBox.scrollHeight;
}


sendButton.addEventListener("click", function () {

    const message = userInput.value.trim();

    if (message === "") {
        return;
    }

    addMessage(message, "user-message");

    userInput.value = "";
    userInput.focus();

    setTimeout(async function () {

        const response = await getWeather(message);

        addMessage(response, "bot-message");

    }, 600);

});


userInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        sendButton.click();
    }

});


async function getWeather(city) {

const cityName = city.toLowerCase().trim();

if (cityName === "los angeles" || cityName === "la") {
    return `🎵 Easter Egg

📍 Los Angeles

🌴 California Dreamin'

🎶 The Mamas & The Papas`;
}

if (cityName === "gotham") {
    return `🦇 Easter Egg

Batman odmówił udostępnienia prognozy pogody.

🌙 Będzie mrocznie.`;
}

if (cityName === "mordor") {
    return `🔥 Easter Egg

📍 Mordor

🌡 Temperatura: 126°C

👁 Zalecamy nie zakładać Pierścienia.`;
}

if (cityName === "winterfell") {
    return `❄️ Easter Egg

Winter is Coming.

🧥 Załóż wszystko co masz.`;
}

if (cityName === "tatooine") {
    return `🌞 Easter Egg

Dwa słońca.

🕶 SPF 500 obowiązkowy.`;
}

if (cityName === "arrakis") {
    return `🏜 Easter Egg

Uwaga na czerwie pustyni.

💧 Oszczędzaj wodę.`;
}


    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=pl`;

    try {

        const response = await fetch(url);

        if (!response.ok) {
            return "❌ Nie znaleziono podanego miasta.";
        }

        const data = await response.json();

        const temperature = Math.round(data.main.temp);

        const description = data.weather[0].description;
        const timezone = data.timezone;

        const weatherMain = data.weather[0].main.toLowerCase();

        let recommendation = getClothingAdvice(temperature);

        if (weatherMain === "rain" || weatherMain === "drizzle") {
            recommendation += "\n☔ Zabierz parasol.";
        }

        if (weatherMain === "snow") {
            recommendation += "\n❄️ Załóż wodoodporne buty.";
        }
        
const localTime = new Date(Date.now() + (timezone * 1000));

const hours = String(localTime.getUTCHours()).padStart(2, "0");
const minutes = String(localTime.getUTCMinutes()).padStart(2, "0");

const currentTime = `${hours}:${minutes}`;

return `
📍 ${data.name}

🕒 Godzina: ${currentTime}

🌡 Temperatura: ${temperature}°C

🌤 Pogoda: ${description}

${recommendation}`;

    }

    catch (error) {

        return "❌ Wystąpił błąd podczas pobierania pogody.";

    }

}


function getClothingAdvice(temp) {

    if (temp <= 0) {
        return "🥶 Bardzo zimno!\n🧥 Gruba kurtka\n🧤 Rękawiczki\n🧣 Szalik\n👢 Zimowe buty";
    }

    if (temp <= 10) {
        return "🧥 Chłodno.\nZałóż kurtkę i pełne buty.";
    }

    if (temp <= 18) {
        return "🙂 Przyjemnie.\nBluza lub lekka kurtka będzie idealna.";
    }

    if (temp <= 25) {
        return "😎 Ciepło.\nKoszulka i długie spodnie.";
    }

    return "☀️ Gorąco!\nKoszulka, krótkie spodenki i dużo wody.";

}


/*
Projekt został wykonany samodzielnie.

W trakcie tworzenia korzystano z pomocy ChatGPT jako narzędzia wspomagającego
tworzenie kodu, dokumentacji oraz generowanie części komunikatów tekstowych.

Implementacja aplikacji, integracja z API OpenWeather oraz logika działania
zostały przygotowane i dostosowane samodzielnie na podstawie dokumentacji API
oraz materiałów edukacyjnych.

Dodane Easter Eggi mają charakter humorystyczny i służą uatrakcyjnieniu działania aplikacji.
*/