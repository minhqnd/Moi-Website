const buttons = document.querySelectorAll(".card-buttons button");
const sections = document.querySelectorAll(".card-section");
const card = document.querySelector(".card");
const hash = window.location.hash

    const handleButtonClick = e => {
    const targetSection = e.target.getAttribute("data-section");
    const section = document.querySelector(targetSection);
    targetSection !== "#about" ?
    card.classList.add("is-active") :
    card.classList.remove("is-active");
    card.setAttribute("data-state", targetSection);
    sections.forEach(s => s.classList.remove("is-active"));
    buttons.forEach(b => b.classList.remove("is-active"));
    e.target.classList.add("is-active");
    section.classList.add("is-active");
};

buttons.forEach(btn => {
    btn.addEventListener("click", handleButtonClick);
});

$('.open-popup-link').magnificPopup({
    type: 'inline',
    midClick: true,
    mainClass: 'mfp-fade'
});

if (hash != '#about') {
    const cc = document.querySelectorAll(hash);
    buttons.forEach(b => b.classList.remove("is-active"));
    sections.forEach(s => s.classList.remove("is-active"));
    cc.forEach(g => g.classList.add("is-active"));
    card.classList.add("is-active");
    card.setAttribute("data-state", hash);
}
