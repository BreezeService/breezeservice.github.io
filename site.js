(() => {
  const cfg = window.SITE_CONFIG;
  if (!cfg) return;

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));

  // Text binds
  $$("[data-bind]").forEach((el) => {
    const key = el.getAttribute("data-bind");
    if (cfg[key] != null) el.textContent = cfg[key];
  });

  // Year
  const y = $("#year");
  if (y) y.textContent = new Date().getFullYear();

  // Phone & messengers
  const phone = (cfg.phone || "").replace(/\s+/g, "");
  const phonePretty = cfg.phonePretty || cfg.phone || "";
  const tg = cfg.telegram || "";
  const wa = (cfg.whatsapp || "").replace(/[^\d]/g, "");

  if ($("#phoneText")) $("#phoneText").textContent = phonePretty;
  if ($("#tgText")) $("#tgText").textContent = tg ? `@${tg}` : "—";
  if ($("#waText")) $("#waText").textContent = wa ? `+${wa}` : "—";

  if ($("#callBtn") && phone) $("#callBtn").href = `tel:${phone}`;
  if ($("#tgBtn") && tg) $("#tgBtn").href = `https://t.me/${tg}`;
  if ($("#waBtn") && wa) $("#waBtn").href = `https://wa.me/${wa}`;

  // Price
  if ($("#fromPrice")) $("#fromPrice").textContent = cfg.fromPrice || "—";
  if ($("#priceHint")) $("#priceHint").textContent = cfg.priceHint || "";

  // Badges
  renderTags("#badges", cfg.badges);
  renderTags("#sideBadges", cfg.sideBadges);

  // Pills
  const heroPills = $("#heroPills");
  if (heroPills && Array.isArray(cfg.heroPills)) {
    heroPills.innerHTML = cfg.heroPills.map(t => `<span class="pill">${esc(t)}</span>`).join("");
  }

  // Popular
  const popular = $("#popularGrid");
  if (popular && Array.isArray(cfg.popular)) {
    popular.innerHTML = cfg.popular.map(p => `
      <div class="s-card">
        <h4>${esc(p.title || "")}</h4>
        <p>${esc(p.text || "")}</p>
      </div>
    `).join("");
  }

  // Services blocks
  const blocks = $("#servicesBlocks");
  if (blocks && Array.isArray(cfg.services)) {
    blocks.innerHTML = cfg.services.map(b => `
      <div class="card list">
        <h3>${esc(b.title || "")}</h3>
        <ul>
          ${(b.items || []).map(it => `
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

  // How cards
  const how = $("#howCards");
  if (how && Array.isArray(cfg.pricing)) {
    how.innerHTML = cfg.pricing.map(p => `
      <div class="card plan">
        <span class="badge" style="display:inline-flex;margin:0 0 10px">${esc(p.tag || "")}</span>
        <h4>${esc(p.title || "")}</h4>
        <p class="p">${esc(p.text || "")}</p>
        <ul>${(p.bullets || []).map(x => `<li>${esc(x)}</li>`).join("")}</ul>
      </div>
    `).join("");
  }

  // Big lists
  renderList("#bigProcess", cfg.bigProcess);
  renderList("#bigBenefits", cfg.bigBenefits);

  // FAQ
  const faq = $("#faqList");
  if (faq && Array.isArray(cfg.faq)) {
    faq.innerHTML = cfg.faq.map(f => `
      <details>
        <summary>${esc(f.q || "")}</summary>
        <p>${esc(f.a || "")}</p>
      </details>
    `).join("");
  }

  // Select
  const sel = $("#serviceSelect");
  if (sel && Array.isArray(cfg.serviceOptions)) {
    sel.innerHTML = cfg.serviceOptions.map(s => `<option value="${esc(s)}">${esc(s)}</option>`).join("");
  }

  // Form -> TG/WA
  const form = $("#leadForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!tg) return alert("Telegram не настроен в config.js");
      const data = Object.fromEntries(new FormData(form).entries());
      const text = buildText(data);
      window.open(`https://t.me/${tg}?text=${encodeURIComponent(text)}`, "_blank");
    });
  }

  const sendWA = $("#sendWA");
  if (sendWA) {
    sendWA.addEventListener("click", () => {
      if (!wa) return alert("WhatsApp не настроен в config.js");
      const data = form ? Object.fromEntries(new FormData(form).entries()) : {};
      const text = buildText(data);
      window.open(`https://wa.me/${wa}?text=${encodeURIComponent(text)}`, "_blank");
    });
  }

  function renderTags(sel, arr){
    const el = $(sel);
    if (!el || !Array.isArray(arr)) return;
    el.innerHTML = arr.map(t => `<span class="badge">${esc(t)}</span>`).join("");
  }

  function renderList(sel, arr){
    const el = $(sel);
    if (!el || !Array.isArray(arr)) return;
    el.innerHTML = arr.map(x => `<li>${esc(x)}</li>`).join("");
  }

  function buildText(d){
    const lines = [
      `Заявка с сайта: ${cfg.brandName || "BreezeService"}`,
      "",
      d.name ? `Имя: ${d.name}` : null,
      d.phone ? `Телефон: ${d.phone}` : null,
      d.service ? `Услуга: ${d.service}` : null,
      d.area ? `Район/адрес: ${d.area}` : null,
      d.comment ? `Комментарий: ${d.comment}` : null
    ].filter(Boolean);
    return lines.join("\n");
  }

  function esc(s){
    return String(s).replace(/[&<>"']/g, m => ({
      "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
    }[m]));
  }
})();
