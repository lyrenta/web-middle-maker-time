const buttons = document.querySelectorAll(".map-btn");
const map = document.querySelector(".map-container iframe");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {

    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    let overlay = "temp";

    const text = btn.innerText.toLowerCase();

    if (text.includes("rain")) overlay = "rain";
    if (text.includes("wind")) overlay = "wind";
    if (text.includes("cloud")) overlay = "clouds";
    if (text.includes("temperature")) overlay = "temp";

    map.src = `https://embed.windy.com/embed2.html?lat=50.45&lon=30.52&zoom=6&level=surface&overlay=${overlay}&product=ecmwf`;
  });
});