const tg = window.Telegram.WebApp;
tg.expand();

const selectBlock = document.getElementById("selectBlock");
const loadingBlock = document.getElementById("loadingBlock");
const signalBlock = document.getElementById("signalBlock");

const pairSelect = document.getElementById("pairSelect");
const getSignalBtn = document.getElementById("getSignalBtn");

const pairEl = document.getElementById("pair");
const directionEl = document.getElementById("direction");
const timeframeEl = document.getElementById("timeframe");
const qualityEl = document.getElementById("quality");
const priceEl = document.getElementById("price");
const entryTimeEl = document.getElementById("entryTime");

getSignalBtn.addEventListener("click", async () => {
    const pair = pairSelect.value;

    selectBlock.classList.add("hidden");
    loadingBlock.classList.remove("hidden");

    try {
        const response = await fetch("/signal", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ pair })
        });

        const data = await response.json();
        console.log("SIGNAL FROM SERVER:", data);

        // ЗАПОЛНЕНИЕ СИГНАЛА
        pairEl.textContent = data.pair ?? "—";

        // UP / DOWN → ВВЕРХ / ВНИЗ
        if (data.direction === "UP") directionEl.textContent = "ВВЕРХ";
        else if (data.direction === "DOWN") directionEl.textContent = "ВНИЗ";
        else directionEl.textContent = data.direction ?? "—";

        timeframeEl.textContent = data.timeframe ?? "—";
        qualityEl.textContent = data.quality ?? "—";
        priceEl.textContent = data.price ?? "—";
        entryTimeEl.textContent = data.entry_time ?? "—";

        loadingBlock.classList.add("hidden");
        signalBlock.classList.remove("hidden");

    } catch (e) {
        console.error(e);
        loadingBlock.innerHTML = "<p>Ошибка получения сигнала</p>";
    }
});

function openDeal() {
    // Заглушка под Pocket Option / deeplink
    alert("Здесь будет переход к сделке");
}
