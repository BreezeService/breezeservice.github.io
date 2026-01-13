(function () {
  const cfg = window.SITE_CONFIG || {};

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));

  // Bind simple text nodes
  $$("[data-bind]").forEach((el) => {
    const key = el.getAttribute("data-bind");
    if (cfg[key] != null) el.textContent = cfg[key];
  });

  // Year
  const y = $("#year");
  if (y) y.textContent = new Date().getFullYear();

  // Phone / messenger links
  const phone = cfg.phone || "";
  const phonePretty = cfg.phonePretty || phone;
  const tg = cfg.telegram || "";
  const wa = cfg.whatsapp || "";

  const phoneText = $("#phoneText");
  if (phoneText) phoneText.textContent = phonePretty;

  const tgText = $("#tgText");
  if (tgText) tgText.textContent = tg ? `@${tg}` : "—";

  const waText = $("#waText");
  if (waText) waText.textContent = wa ? wa.replace(/(\+998)(\d{2})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3-$4-$5") : "—";

  const callBtn = $("#callBtn");
  if (callBtn && phone) callBtn.href = `tel:${phone.replace(/\s+/g, "")}`;

  const tgBtn = $("#tgBtn");
  if (tgBtn && tg) tgBtn.href = `https://t.me/${tg}`;

  const waBtn = $("#waBtn");
  if (waBtn && wa) waBtn.href = `https://wa.me/${wa.replace(/[^\d]/g, "")}`;

  // Price + badges
  const fromPrice = $("#fromPrice");
  if (fromPrice) fromPrice.textContent = cfg.fromPrice || "—";

  const priceHint = $("#priceHint");
  if (priceHint) priceHint.textContent = cfg.priceHint || "";

  const badges = $("#badges");
  if (badges && Array.isArray(cfg.badges)) {
    badges.innerHTML = cfg.badges.map((t) => `<span class="badge">${escapeHtml(t)}</span>`).join("");
  }

  const sideBadges = $("#sideBadges");
  if (sideBadges && Array.isArray(cfg.sideBadges)) {
    sideBadges.innerHTML = cfg.sideBadges.map((t) => `<span class="badge">${escapeHtml(t)}</span>`).join("");
  }

  // Hero pills
  const heroPills = $("#heroPills");
  if (heroPills && Array.isArray(cfg.heroPills)) {
    heroPills.innerHTML = cfg.heroPills.map((t) => `<span class="pill">${escapeHtml(t)}</span>`).join("");
  }

  // Popular
  const popularGrid = $("#popularGrid");
  if (popularGrid && Array.isArray(cfg.popular)) {
    popularGrid.innerHTML = cfg.popular.map((p) => `
      <div class="s-card">
        <h4>${escapeHtml(p.title || "")}</h4>
        <p>${escapeHtml(p.text || "")}</p>
      </div>
    `).join("");
  }

  // Services blocks
  const servicesBlocks = $("#servicesBlocks");
  if (servicesBlocks && Array.isArray(cfg.services)) {
    servicesBlocks.innerHTML = cfg.services.map((block) => `
      <div class="card list">
        <h3>${escapeHtml(block.title || "")}</h3>
        <ul>
          ${(block.items || []).map((it) => `
            <li class="li">
              <span class="check"></span>
              <div>
                <b>${escapeHtml(it.b || "")}</b>
                <span>${escapeHtml(it.s || "")}</span>
              </div>
            </li>
          `).join("")}
        </ul>
      </div>
    `).join("");
  }

  // How (pricing cards)
  const howCards = $("#howCards");
  if (howCards && Array.isArray(cfg.pricing)) {
    howCards.innerHTML = cfg.pricing.map((p) => `
      <div class="card plan">
        <div class="badge" style="display:inline-flex;margin:0 0 10px">${escapeHtml(p.tag || "")}</div>
        <h4>${escapeHtml(p.title || "")}</h4>
        <p class="p">${escapeHtml(p.text || "")}</p>
        <ul>
          ${(p.bullets || []).map((b) => `<li>${escapeHtml(b)}</li>`).join("")}
        </ul>
      </div>
    `).join("");
  }

  // Big objects
  const bigProcess = $("#bigProcess");
  if (bigProcess && Array.isArray(cfg.bigProcess)) {
    bigProcess.innerHTML = cfg.bigProcess.map((x) => `<li>${escapeHtml(x)}</li>`).join("");
  }
  const bigBenefits = $("#bigBenefits");
  if (bigBenefits && Array.isArray(cfg.bigBenefits)) {
    bigBenefits.innerHTML = cfg.bigBenefits.map((x) => `<li>${escapeHtml(x)}</li>`).join("");
  }

  // FAQ
  const faqList = $("#faqList");
  if (faqList && Array.isArray(cfg.faq)) {
    faqList.innerHTML = cfg.faq.map((f) => `
      <details>
        <summary>${escapeHtml(f.q || "")}</summary>
        <p>${escapeHtml(f.a || "")}</p>
      </details>
    `).join("");
  }

  // Service select
  const serviceSelect = $("#serviceSelect");
  if (serviceSelect && Array.isArray(cfg.serviceOptions)) {
    serviceSelect.innerHTML = cfg.serviceOptions.map((s) => `<option value="${escapeAttr(s)}">${escapeHtml(s)}</option>`).join("");
  }

  // Form submit -> Telegram / WhatsApp
  const form = $("#leadForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!tg) return alert("Telegram не настроен. Проверь поле telegram в config.js");
      const data = readForm(form);
      const text = buildLeadText(cfg, data);
      const url = `https://t.me/${tg}?text=${encodeURIComponent(text)}`;
      window.open(url, "_blank");
    });
  }

  const sendWA = $("#sendWA");
  if (sendWA) {
    sendWA.addEventListener("click", () => {
      if (!wa) return alert("WhatsApp не настроен. Проверь поле whatsapp в config.js");
      const data = form ? readForm(form) : {};
      const text = buildLeadText(cfg, data);
      const url = `https://wa.me/${wa.replace(/[^\d]/g, "")}?text=${encodeURIComponent(text)}`;
      window.open(url, "_blank");
    });
  }

  function readForm(formEl) {
    const fd = new FormData(formEl);
    return Object.fromEntries(fd.entries());
  }

  function buildLeadText(cfg, data) {
    const lines = [];
    lines.push(`Заявка с сайта: ${cfg.brandName || "BreezeService"}`);
    lines.push("");
    if (data.name) lines.push(`Имя: ${data.name}`);
    if (data.phone) lines.push(`Телефон: ${data.phone}`);
    if (data.service) lines.push(`Услуга: ${data.service}`);
    if (data.area) lines.push(`Район/адрес: ${data.area}`);
    if (data.comment) lines.push(`Комментарий: ${data.comment}`);
    lines.push("");
    lines.push(`Время: ${new Date().toLocaleString("ru-RU")}`);
    return lines.join("\n");
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (m) => ({
      "&":"&amp;",
      "<":"&lt;",
      ">":"&gt;",
      "\"":"&quot;",
      "'":"&#39;"
    }[m]));
  }
  function escapeAttr(s) {
    return escapeHtml(s).replace(/"/g, "&quot;");
  }
})();
