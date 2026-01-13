(() => {
  const cfg = window.SITE_CONFIG;
  if (!cfg) return;

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));

  // bind text
  $$("[data-bind]").forEach((el) => {
    const key = el.getAttribute("data-bind");
    if (cfg[key] != null) el.textContent = cfg[key];
  });

  // year
  const y = $("#year");
  if (y) y.textContent = new Date().getFullYear();

  // contacts
  const phoneRaw = (cfg.phone || "").replace(/\s+/g, "");
  const phonePretty = cfg.phonePretty || cfg.phone || "";
  const tg = (cfg.telegram || "").trim();
  const waDigits = String(cfg.whatsapp || "").replace(/[^\d]/g, "");

  // helper
  const setHref = (sel, href) => { const el = $(sel); if (el) el.href = href; };

  // call => phone app
  if (phoneRaw) {
    setHref("#callBtn", `tel:${phoneRaw}`);
    setHref("#bbCall", `tel:${phoneRaw}`);
  }

  // telegram
  if (tg) {
    setHref("#tgBtn", `https://t.me/${tg}`);
    setHref("#bbTg", `https://t.me/${tg}`);
    const t = $("#tgText"); if (t) t.textContent = `@${tg}`;
  }

  // whatsapp
  if (waDigits) {
    setHref("#waBtn", `https://wa.me/${waDigits}`);
    const w = $("#waText"); if (w) w.textContent = `+${waDigits}`;
  }

  const p = $("#phoneText"); if (p) p.textContent = phonePretty || "—";

  // pills
  const pills = $("#heroPills");
  if (pills && Array.isArray(cfg.heroPills)) {
    pills.innerHTML = cfg.heroPills.map(t => `<span class="pill">${esc(t)}</span>`).join("");
  }

  // popular tiles
  const pop = $("#popularGrid");
  if (pop && Array.isArray(cfg.popular)) {
    pop.innerHTML = cfg.popular.map(p => `
      <div class="tile-item">
        <h4>${esc(p.title || "")}</h4>
        <p>${esc(p.text || "")}</p>
      </div>
    `).join("");
  }

  // price + badges
  const from = $("#fromPrice"); if (from) from.textContent = cfg.fromPrice || "—";
  const hint = $("#priceHint"); if (hint) hint.textContent = cfg.priceHint || "";

  renderChips("#badges", cfg.badges);
  renderChips("#sideBadges", cfg.sideBadges);

  // services blocks
  const services = $("#servicesBlocks");
  if (services && Array.isArray(cfg.services)) {
    services.innerHTML = cfg.services.map(block => `
      <div class="card glass block">
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
      <div class="card glass priceCard">
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

  // form -> TG/WA
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

  // ✅ Fix anchor scroll under sticky nav + smooth iOS-like easing
  const NAV_OFFSET = 104; // slightly more than nav height for safe space
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id === "#" || id === "#top") return;

      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.pageYOffset - NAV_OFFSET;

      window.scrollTo({ top: y, behavior: "smooth" });
      history.pushState(null, "", id);
    });
  });

  function renderChips(sel, arr){
    const el = $(sel);
    if (!el || !Array.isArray(arr)) return;
    el.innerHTML = arr.map(t => `<span class="chip2">${esc(t)}</span>`).join("");
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
