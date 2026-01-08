// assets/app.js
const WHATSAPP_PHONE = "84372733431";

let toursData = [];
let bikesData = [];
let servicesData = [];

function openWhatsApp(text) {
  if (!WHATSAPP_PHONE) {
    alert("Не задан номер WhatsApp в app.js");
    return;
  }
  const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
}

async function loadJSON(path) {
  const res = await fetch(path, { cache: "no-store" });
  if (!res.ok) throw new Error(`Не найден файл: ${path}`);
  return res.json();
}

async function loadAllData() {
  const [tours, bikes, services] = await Promise.all([
    loadJSON("data/tours.json"),
    loadJSON("data/bikes.json"),
    loadJSON("data/services.json"),
  ]);

  toursData = tours;
  bikesData = bikes;
  servicesData = services;
}

function badgeClass(badgeText) {
  if (!badgeText) return "";
  const t = String(badgeText).toLowerCase();
  if (t.includes("хит") || t.includes("hit")) return "badge--hit";
  return "badge--new";
}

function createCardHTML(item) {
  const badgeHTML = item.badge
    ? `<span class="badge ${badgeClass(item.badge)}">${item.badge}</span>`
    : "";

  return `
    <article class="card" onclick="openTourDetail(${item.id})">
      <div class="cardimage-wrapper">
        ${badgeHTML}
        <img src="${item.image}" class="cardimage" alt="${item.title}">
      </div>
      <div class="cardcontent">
        <h3 class="cardtitle">${item.title}</h3>
        <p class="carddesc">${item.desc}</p>
        <div class="cardfooter">
          <span class="cardprice">${item.price}</span>
          <button class="cardbtn" type="button">Подробнее</button>
        </div>
      </div>
    </article>
  `;
}

function createServiceHTML(item) {
  return `
    <div class="service-item">
      <img src="${item.image}" alt="${item.title}">
      <div class="service-item-content">
        <h3>${item.title}</h3>
        <p style="color: var(--text-gray); margin-bottom: 16px; white-space: pre-line;">${item.desc}</p>
        <button class="btn btn--secondary" style="width: 100%;" type="button"
          onclick="openWhatsApp('Здравствуйте! Интересует: ${item.title}')">
          ${item.btnText}
        </button>
      </div>
    </div>
  `;
}

function createBikeCard(bike) {
  return `
    <div class="bike-card">
      <img src="${bike.image}" alt="${bike.model}" class="bike-cardimg">
      <div class="bike-cardcontent">
        <div class="bike-header">
          <h3 class="bike-title">${bike.model}</h3>
          <span class="bike-badge ${bike.badgeClass || ""}">${bike.type}</span>
        </div>

        <div class="bike-specs">
          <span class="bike-spec-item"><i class="fa-solid fa-gauge-high"></i> ${bike.cc}</span>
        </div>

        <p style="font-size: 14px; color: var(--text-gray); margin-bottom: 16px;">${bike.desc}</p>

        <div class="bike-price">${bike.price}</div>

        <button class="btn btn--primary" style="width: 100%; padding: 12px;" type="button"
          onclick="openWhatsApp('Здравствуйте! Хочу арендовать: ${bike.model}')">
          Арендовать
        </button>
      </div>
    </div>
  `;
}

function renderTours(data) {
  const container = document.getElementById("tours-grid");
  if (!container) return;
  container.innerHTML = data.map(createCardHTML).join("");
}

function filterTours(category, btn) {
  document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
  if (btn) btn.classList.add("active");

  if (category === "all") renderTours(toursData);
  else renderTours(toursData.filter((t) => (t.category || []).includes(category)));
}

function renderServices() {
  const container = document.getElementById("services-list");
  if (!container) return;
  container.innerHTML = servicesData.map(createServiceHTML).join("");
}

function renderBikes() {
  const s = document.getElementById("bikes-list-standard");
  const c = document.getElementById("bikes-list-comfort");
  const m = document.getElementById("bikes-list-maxi");
  const mo = document.getElementById("bikes-list-moto");

  const byCat = (cat) =>
    bikesData
      .filter((b) => b.categoryType === cat)
      .map(createBikeCard)
      .join("");

  if (s) s.innerHTML = byCat("standard");
  if (c) c.innerHTML = byCat("comfort");
  if (m) m.innerHTML = byCat("maxi");
  if (mo) mo.innerHTML = byCat("moto");
}

function openTourDetail(id) {
  const tour = toursData.find((t) => t.id === id);
  if (!tour) return;

  let programHTML = "";
  if (tour.program && tour.program.length) {
    programHTML = `
      <h3 style="margin-bottom: 20px;">Программа</h3>
      <div class="timeline">
        ${tour.program
          .map(
            (step) => `
          <div class="timeline-item">
            <span class="timeline-time">${step.time}</span>
            <div class="timeline-title">${step.title}</div>
            <p style="font-size: 14px; color: var(--text-gray);">${step.desc}</p>
          </div>
        `
          )
          .join("")}
      </div>
    `;
  }

  const html = `
    <div class="tour-header">
      <img src="${tour.image}" class="tour-headerimg" alt="${tour.title}">
      <div class="tour-headeroverlay"></div>
      <div class="tour-headercontent">
        ${
          tour.badge
            ? `<span class="badge ${badgeClass(
                tour.badge
              )}" style="position: static; display: inline-block; margin-bottom: 8px;">${tour.badge}</span>`
            : ""
        }
        <h1 style="font-size: 28px; margin-bottom: 0; color: white;">${tour.title}</h1>
      </div>
    </div>

    <div class="tour-body">
      <div class="tour-meta">
        ${(tour.meta || []).map((m) => `<div class="meta-item">${m}</div>`).join("")}
      </div>

      <p style="margin-bottom: 32px; color: var(--text-gray); font-size: 16px; white-space: pre-line;">${
        tour.fullDesc || ""
      }</p>

      ${programHTML}

      <div style="background: #f9f9f9; padding: 24px; border-radius: 16px; margin-bottom: 32px;">
        <h3 style="margin-bottom: 16px;">Включено</h3>
        <ul class="check-list">
          ${(tour.included || []).map((x) => `<li>${x}</li>`).join("")}
        </ul>

        ${
          tour.excluded && tour.excluded.length
            ? `
          <h3 style="margin-top: 24px; margin-bottom: 16px;">Не включено</h3>
          <ul class="cross-list">
            ${tour.excluded.map((x) => `<li>${x}</li>`).join("")}
          </ul>
        `
            : ""
        }
      </div>

      <button class="btn btn--primary" style="width: 100%;" type="button"
        onclick="openWhatsApp('Здравствуйте! Хочу записаться на тур: ${tour.title}')">
        Написать в WhatsApp
      </button>
    </div>
  `;

  const detail = document.getElementById("tour-detail-content");
  if (detail) detail.innerHTML = html;

  const priceBar = document.getElementById("detail-price-bar");
  if (priceBar) priceBar.innerText = tour.price || "";

  navigateTo("tour-detail");
}

function navigateTo(viewId) {
  document.querySelectorAll(".view").forEach((el) => el.classList.remove("active"));
  const target = document.getElementById(`view-${viewId}`);
  if (target) target.classList.add("active");
  window.scrollTo(0, 0);

  const footerForm = document.getElementById("contact-form-section");
  if (footerForm) {
    if (viewId === "tour-detail") footerForm.classList.add("hidden");
    else footerForm.classList.remove("hidden");
  }
}

function mobileNavTo(viewId) {
  navigateTo(viewId);

  const mobileMenu = document.getElementById("mobileMenu");
  if (mobileMenu) mobileMenu.classList.remove("active");

  const burgerBtn = document.getElementById("burgerBtn");
  if (burgerBtn) {
    const icon = burgerBtn.querySelector("i");
    if (icon) {
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    }
  }

  document.body.style.overflow = "";
}

async function initApp() {
  await loadAllData();

  const popular = document.getElementById("home-popular-grid");
  if (popular) popular.innerHTML = toursData.slice(0, 4).map(createCardHTML).join("");

  renderTours(toursData);
  renderServices();
  renderBikes();

  const burgerBtn = document.getElementById("burgerBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (burgerBtn && mobileMenu) {
    const icon = burgerBtn.querySelector("i");
    burgerBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("active");
      if (mobileMenu.classList.contains("active")) {
        if (icon) {
          icon.classList.remove("fa-bars");
          icon.classList.add("fa-xmark");
        }
        document.body.style.overflow = "hidden";
      } else {
        if (icon) {
          icon.classList.remove("fa-xmark");
          icon.classList.add("fa-bars");
        }
        document.body.style.overflow = "";
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initApp().catch((err) => {
    console.error(err);
    alert("Ошибка запуска. Открой сайт через локальный сервер (не двойным кликом по index.html).");
  });
});
