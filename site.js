(function () {
  const cfg = window.SITE_CONFIG || {};

  // helpers
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));
  const esc = (s) => String(s ?? "");
  const el = (tag, cls) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    return n;
  };

  // bind simple text fields
  $$("[data-bind]").forEach((node) => {
    const key = node.getAttribute("data-bind");
    if (cfg[key] != null) node.textContent = cfg[key];
  });

  // year
  $("#year").textContent = new Date().getFullYear();

  // contacts
  $("#phoneText").textContent = cfg.phonePretty || cfg.phone || "—";
  $("#tgText").textContent = cfg.telegram ? ("@" + cfg.telegram) : "—";

  // buttons
  const phoneRaw = (cfg.phone || "").trim();
  $("#callBtn").href = phoneRaw ? ("tel:" + phoneRaw) : "#";
  $("#tgBtn").href = cfg.telegram ? ("https://t.me/" + cfg.telegram) : "#";
  $("#waBtn").href = cfg.whatsapp ? ("https://wa.me/" + String(cfg.whatsapp).replace(/\D/g, "")) : "#";

  // hero pills
  const pills = $("#heroPills");
  (cfg.heroPills || []).forEach((t) => {
    const p = el("div", "pill");
    p.textContent = t;
    pills.appendChild(p);
  });

  // popular
  const pop = $("#popularGrid");
  (cfg.popular || []).forEach((x) => {
    const c = el("div", "s-card");
    const h = el("h4"); h.textContent = x.title;
    const p = el("p"); p.textContent = x.text;
    c.append(h, p);
    pop.appendChild(c);
  });

  // prices
  $("#fromPrice").textContent = cfg.fromPrice || "—";

  // badges
  const badges = $("#badges");
  (cfg.badges || []).forEach((t) => {
    const b = el("span", "badge"); b.textContent = t;
    badges.appendChild(b);
  });
  const sideBadges = $("#sideBadges");
  (cfg.sideBadges || []).forEach((t) => {
    const b = el("span", "badge"); b.textContent = t;
    sideBadges.appendChild(b);
  });

  // services blocks
  const sb = $("#servicesBlocks");
  (cfg.services || []).forEach((block) => {
    const card = el("div", "card list");
    const h3 = el("h3"); h3.textContent = block.title;
    const ul = el("ul");
    (block.items || []).forEach((it) => {
      const li = el("li", "li");
      const check = el("div", "check");
      const wrap = el("div");
      const b = el("b"); b.textContent = it.b;
      const s = el("span"); s.textContent = it.s;
      wrap.append(b, s);
      li.append(check, wrap);
      ul.appendChild(li);
    });
    card.append(h3, ul);
    sb.appendChild(card);
  });

  // pricing cards
  const pc = $("#pricingCards");
  (cfg.pricing || []).forEach((plan) => {
    const card = el("div", "card plan");
    const tag = el("span", "pill tag"); tag.textContent = plan.tag || "";
    const h4 = el("h4"); h4.textContent = plan.title || "";
    const p = el("p", "p"); p.textContent = plan.text || "";
    const cost = el("div", "cost"); cost.textContent = plan.cost || "";
    const ul = el("ul");
    (plan.bullets || []).forEach((t) => {
      const li = el("li"); li.textContent = t;
      ul.appendChild(li);
    });
    card.append(tag, h4, p, cost, ul);
    pc.appendChild(card);
  });

  // faq
  const fl = $("#faqList");
  (cfg.faq || []).forEach((x) => {
    const d = document.createElement("details");
    const s = document.createElement("summary");
    s.textContent = x.q || "";
    const p = document.createElement("p");
    p.textContent = x.a || "";
    d.append(s, p);
    fl.appendChild(d);
  });

  // service select
  const ss = $("#serviceSelect");
  (cfg.serviceOptions || []).forEach((opt) => {
    const o = document.createElement("option");
    o.textContent = opt;
    ss.appendChild(o);
  });

  // messaging
  function buildMessage(data){
    const lines = [
      "Заявка на услуги кондиционера:",
      "Имя: " + (data.name || "-"),
      "Телефон: " + (data.phone || "-"),
      "Услуга: " + (data.service || "-"),
      "Район/адрес: " + (data.area || "-"),
      "Комментарий: " + (data.comment || "-")
    ];
    return lines.join("\n");
  }
  function toTelegram(msg){
    if (!cfg.telegram) return;
    const url = "https://t.me/" + cfg.telegram + "?text=" + encodeURIComponent(msg);
    window.open(url, "_blank");
  }
  function toWhatsApp(msg){
    if (!cfg.whatsapp) return;
    const url = "https://wa.me/" + String(cfg.whatsapp).replace(/\D/g,'') + "?text=" + encodeURIComponent(msg);
    window.open(url, "_blank");
  }

  const form = $("#leadForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());
    toTelegram(buildMessage(data));
  });

  $("#sendTG").addEventListener("click", () => {
    const fd = new FormData(form);
    toTelegram(buildMessage(Object.fromEntries(fd.entries())));
  });

  $("#sendWA").addEventListener("click", () => {
    const fd = new FormData(form);
    toWhatsApp(buildMessage(Object.fromEntries(fd.entries())));
  });
})();
