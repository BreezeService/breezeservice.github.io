(() => {
  const cfg = window.SITE_CONFIG;
  if (!cfg) return;

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));

  // bind text nodes
  $$("[data-bind]").forEach((el) => {
    const key = el.getAttribute("data-bind");
    if (cfg[key] != null) el.textContent = cfg[key];
  });

  // year
  const y = $("#year");
  if (y) y.textContent = new Date().getFullYear();

  // contacts
  const phoneRaw = String(cfg.phone || "").replace(/\s+/g, "");
  const phonePretty = cfg.phonePretty || cfg.phone || "";
  const tg = String(cfg.telegram || "").trim();
  const ig = String(cfg.instagram || "").trim();
  const waDigits = String(cfg.whatsapp || "").replace(/[^\d]/g, "");

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

  // instagram
  if (ig) {
    setHref("#igBtn", `https://instagram.com/${ig}`);
    const i = $("#igText"); if (i) i.textContent = `@${ig}`;
  }

  const p = $("#phoneText"); if (p) p.textContent = phonePretty || "—";

  // HERO service chips
  renderChipsRow("#heroServiceChips", cfg.heroServices);

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

  renderTagChips("#badges", cfg.badges);
  renderTagChips("#sideBadges", cfg.sideBadges);

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

  // faq (animated container)
  const faq = $("#faqList");
  if (faq && Array.isArray(cfg.faq)) {
    faq.innerHTML = cfg.faq.map(f => `
      <details>
        <summary>${esc(f.q || "")}</summary>
        <div class="faq-a"><p>${esc(f.a || "")}</p></div>
      </details>
    `).join("");
  }

  // service chips in form
  const chipsWrap = $("#serviceChips");
  const serviceHidden = $("#serviceHidden");
  if (chipsWrap && serviceHidden && Array.isArray(cfg.serviceOptions)) {
    chipsWrap.innerHTML = cfg.serviceOptions.map((s, idx) =>
      `<button type="button" class="seg-chip${idx===0 ? " active" : ""}" data-val="${esc(s)}">${esc(s)}</button>`
    ).join("");

    serviceHidden.value = cfg.serviceOptions[0] || "";

    chipsWrap.addEventListener("click", (e) => {
      const btn = e.target.closest(".seg-chip");
      if (!btn) return;
      chipsWrap.querySelectorAll(".seg-chip").forEach(x => x.classList.remove("active"));
      btn.classList.add("active");
      serviceHidden.value = btn.getAttribute("data-val") || "";
    });
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

  // Smooth scroll with offset (prevents "cut text" under sticky nav)
  const NAV_OFFSET = 104;
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

  function renderTagChips(sel, arr){
    const el = $(sel);
    if (!el || !Array.isArray(arr)) return;
    el.innerHTML = arr.map(t => `<span class="chip2">${esc(t)}</span>`).join("");
  }

  function renderChipsRow(sel, arr){
    const el = $(sel);
    if (!el || !Array.isArray(arr)) return;
    el.innerHTML = arr.map(t => `<span class="seg-chip" style="pointer-events:none">${esc(t)}</span>`).join("");
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
;
