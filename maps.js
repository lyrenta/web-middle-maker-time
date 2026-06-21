const buttons = document.querySelectorAll(".map-btn");
const map = document.querySelector(".map-container iframe");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {

    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    let overlay = "temp";

    if (btn.textContent === "Rain") overlay = "rain";
    if (btn.textContent === "Wind") overlay = "wind";
    if (btn.textContent === "Clouds") overlay = "clouds";
    if (btn.textContent === "Temperature") overlay = "temp";

    map.src =
      `https://embed.windy.com/embed2.html?lat=50.45&lon=30.52&zoom=6&level=surface&overlay=${overlay}`;
  });
});