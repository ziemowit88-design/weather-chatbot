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

if (cityName === "los angeles") {
    return `🎵 Easter Egg

California Dreamin'
The Mamas & The Papas`;
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

        const weatherMain = data.weather[0].main.toLowerCase();

        let recommendation = getClothingAdvice(temperature);

        if (weatherMain === "rain" || weatherMain === "drizzle") {
            recommendation += "\n☔ Zabierz parasol.";
        }

        if (weatherMain === "snow") {
            recommendation += "\n❄️ Załóż wodoodporne buty.";
        }

        return `
📍 ${data.name}

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


//odpowiedzi i ikonki zostały wygenerwane przez chatGPT, a następnie przetłumaczone na język polski.
//sam skrypt został napisany zgodnie z dokumentacją i poradnikami. AI pełniło rolę redakcyjną ( i chwała mu za to)
