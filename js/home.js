const toggle = document.getElementById("menuToggle");
const sideMenu = document.getElementById("sideMenu");

toggle.addEventListener("click", () => {
    sideMenu.classList.toggle("open");
});

//fecha só clicando fora
document.addEventListener("click", (e) => {
    if (!sideMenu.contains(e.target) && !toggle.contains(e.target)) {
        sideMenu.classList.remove("open");
    }
});