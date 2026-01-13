(() => {
  const cfg = window.SITE_CONFIG;
  if (!cfg) return;

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));

  // bind simple text
  $$("[data-bind]").forEach(el => {
    const key = el.getAttribute("data-bind");
    if (cfg[key] != null) el.textContent = cfg[key];
  });

  // year
  const y = $("#year");
  if (y) y.textContent = new Date().getFullYear();

  // helpers
  const phone = (cfg.phone || "").replace(/\s+/g, "");
  const phonePretty = cfg.phonePretty || cfg.phone || "";
  const tg = cfg.telegram || "";
  const waDigits = String(cfg.whatsapp || "").replace(/[^\d]/g, "");

  const setText = (sel, val) => { const el = $(sel); if (el) el.textContent = val; };

  setText("#phoneText", phonePretty || "—");
  setText("#tgText", tg ? `@${tg}` : "—");
  setText("#waText", waDigits ? `+${waDigits}` : "—");

  const callBtn = $("#callBtn");
  if (callBtn && phone) callBtn.href = `tel:${phone}`;

  const tgBtn = $("#tgBtn");
  if (tgBtn && tg) tgBtn.href = `https://t.me/${tg}`;

  const waBtn = $("#waBtn");
  if (waBtn && waDigits) waBtn.href = `https://wa.me/${waDigits}`;

  const bbCall = $("#bbCall");
  if (bbCall && phone) bbCall.href = `tel:${phone}`;

  const bbTg = $("#bbTg");
  if (bbTg && tg) bbTg.href = `https://t.me/${tg}`;

  // pills
  const pills = $("#heroPills");
  if (pills && Array.isArray(cfg.heroPills)) {
    pills.innerHTML = cfg.heroPills.map(t => `<span class="pill">${esc(t)}</span>`).join("");
  }

  // popular
  const popular = $("#popularGrid");
  if (popular && Array.isArray(cfg.popular)) {
    popular.innerHTML = cfg.popular.map(p => `
      <div class="sCard">
        <h4>${esc(p.title || "")}</h4>
        <p>${esc(p.text || "")}</p>
      </div>
    `).join("");
  }

  // price + badges
  const fromPrice = $("#fromPrice");
  if (fromPrice) fromPrice.textContent = cfg.fromPrice || "—";

  const priceHint = $("#priceHint");
  if (priceHint) priceHint.textContent = cfg.priceHint || "";

  renderTags("#badges", cfg.badges);
  renderTags("#sideBadges", cfg.sideBadges);

  // services
  const services = $("#servicesBlocks");
  if (services && Array.isArray(cfg.services)) {
    services.innerHTML = cfg.services.map(block => `
      <div class="card list">
        <h3>${esc(block.title || "")}</h3>
        <ul>
          ${(block.items || []).map(it => `
            <li class="li">
              <span class="check"></span>
              <div>
                <b>${esc(it.b || "")}</b>
                <span>${esc(it.s || "")}</span>
              </div>
            </li>
          `).join("")}
        </ul>
      </div>
    `).join("");
  }

  // pricing
  const pricing = $("#pricingCards");
  if (pricing && Array.isArray(cfg.pricing)) {
    pricing.innerHTML = cfg.pricing.map(p => `
      <div class="card priceCard">
        <h4>${esc(p.title || "")}</h4>
        <p class="p">${esc(p.text || "")}</p>
        <ul>${(p.bullets || []).map(x => `<li>${esc(x)}</li>`).join("")}</ul>
      </div>
    `).join("");
  }

  // faq
  const faq = $("#faqList");
  if (faq && Array.isArray(cfg.faq)) {
    faq.innerHTML = cfg.faq.map(f => `
      <details>
        <summary>${esc(f.q || "")}</summary>
        <p>${esc(f.a || "")}</p>
      </details>
    `).join("");
  }

  // select
  const sel = $("#serviceSelect");
  if (sel && Array.isArray(cfg.serviceOptions)) {
    sel.innerHTML = cfg.serviceOptions.map(s => `<option value="${esc(s)}">${esc(s)}</option>`).join("");
  }

  // form -> tg/wa
  const form = $("#leadForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!tg) return alert("Telegram не настроен в config.js");
      const data = Object.fromEntries(new FormData(form).entries());
      const text = buildText(cfg, data);
      window.open(`https://t.me/${tg}?text=${encodeURIComponent(text)}`, "_blank");
    });
  }

  const sendWA = $("#sendWA");
  if (sendWA) {
    sendWA.addEventListener("click", () => {
      if (!waDigits) return alert("WhatsApp не настроен в config.js");
      const data = form ? Object.fromEntries(new FormData(form).entries()) : {};
      const text = buildText(cfg, data);
      window.open(`https://wa.me/${waDigits}?text=${encodeURIComponent(text)}`, "_blank");
    });
  }

  function renderTags(sel, arr){
    const el = $(sel);
    if (!el || !Array.isArray(arr)) return;
    el.innerHTML = arr.map(t => `<span class="badge">${esc(t)}</span>`).join("");
  }

  function buildText(cfg, d){
    return [
      `Заявка с сайта: ${cfg.brandName || "BreezeService"}`,
      "",
      d.name ? `Имя: ${d.name}` : null,
      d.phone ? `Телефон: ${d.phone}` : null,
      d.service ? `Услуга: ${d.service}` : null,
      d.area ? `Район/адрес: ${d.area}` : null,
      d.comment ? `Комментарий: ${d.comment}` : null
    ].filter(Boolean).join("\n");
  }

  function esc(s){
    return String(s).replace(/[&<>"']/g, m => ({
      "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
    }[m]));
  }
})();
