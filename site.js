(() => {
  const cfg = window.SITE_CONFIG || {};

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function safeText(v) { return (v ?? "").toString(); }

  function setBindTexts() {
    $$("[data-bind]").forEach(el => {
      const key = el.getAttribute("data-bind");
      if (!key) return;
      if (cfg[key] == null) return;
      el.textContent = safeText(cfg[key]);
    });
  }

  function addGlassLayers() {
    // Add inner wind + highlight to every .glass (one-time)
    $$(".glass").forEach(card => {
      // avoid duplicates
      if (card.querySelector(".inner-wind")) return;

      const inner = document.createElement("div");
      inner.className = "inner-wind";

      const hi = document.createElement("div");
      hi.className = "glass-highlight";

      card.prepend(inner);
      card.prepend(hi);
    });
  }

  function renderChips(container, options, onPick, defaultValue) {
    container.innerHTML = "";
    options.forEach((name, idx) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "seg-chip";
      b.textContent = name;

      if ((defaultValue && name === defaultValue) || (!defaultValue && idx === 0)) {
        b.classList.add("active");
      }

      b.addEventListener("click", () => {
        container.querySelectorAll(".seg-chip").forEach(x => x.classList.remove("active"));
        b.classList.add("active");
        onPick(name);
      });

      container.appendChild(b);
    });

    // init selected
    const active = container.querySelector(".seg-chip.active");
    if (active) onPick(active.textContent);
  }

  function renderPopular() {
    const grid = $("#popularGrid");
    if (!grid) return;

    const items = Array.isArray(cfg.popular) ? cfg.popular : [];
    grid.innerHTML = "";

    items.forEach(it => {
      const d = document.createElement("div");
      d.className = "tile-item";
      d.innerHTML = `
        <h4>${safeText(it.title)}</h4>
        <p>${safeText(it.text)}</p>
      `;
      grid.appendChild(d);
    });
  }

  function renderServices() {
    const host = $("#servicesBlocks");
    if (!host) return;

    const blocks = Array.isArray(cfg.services) ? cfg.services : [];
    host.innerHTML = "";

    blocks.forEach(block => {
      const card = document.createElement("div");
      card.className = "card glass block";
      card.innerHTML = `
        <h3>${safeText(block.title)}</h3>
        <ul>
          ${(block.items || []).map(x => `
            <li class="li">
              <span class="check"></span>
              <div>
                <b>${safeText(x.b)}</b>
                <span>${safeText(x.s)}</span>
              </div>
            </li>
          `).join("")}
        </ul>
      `;
      host.appendChild(card);
    });
  }

  function renderPricing() {
    const host = $("#pricingCards");
    if (!host) return;

    const cards = Array.isArray(cfg.pricing) ? cfg.pricing : [];
    host.innerHTML = "";

    cards.forEach(p => {
      const el = document.createElement("div");
      el.className = "card glass priceCard";
      el.innerHTML = `
        <div class="tile-head">
          <h4>${safeText(p.title)}</h4>
          <span class="chip">${safeText(p.tag)}</span>
        </div>
        <p class="p">${safeText(p.text)}</p>
        <div class="price">${safeText(p.cost)}</div>
        <ul>
          ${(p.bullets || []).map(b => `<li>${safeText(b)}</li>`).join("")}
        </ul>
      `;
      host.appendChild(el);
    });
  }

  // Smooth FAQ animation: height transitions to scrollHeight
  function renderFAQ() {
    const host = $("#faqList");
    if (!host) return;

    const list = Array.isArray(cfg.faq) ? cfg.faq : [];
    host.innerHTML = "";

    list.forEach((f, i) => {
      const item = document.createElement("div");
      item.className = "card glass faq-item";

      item.innerHTML = `
        <div class="faq-q" role="button" aria-expanded="false" tabindex="0">
          <span>${safeText(f.q)}</span>
          <span class="faq-icon">+</span>
        </div>
        <div class="faq-a" aria-hidden="true">
          <div class="faq-a-inner">${safeText(f.a)}</div>
        </div>
      `;

      const q = $(".faq-q", item);
      const a = $(".faq-a", item);

      const toggle = () => {
        const isOpen = item.classList.contains("open");
        // close all others (nice UX)
        $$(".faq-item.open").forEach(x => {
          if (x === item) return;
          x.classList.remove("open");
          const ax = $(".faq-a", x);
          const qx = $(".faq-q", x);
          if (ax) ax.style.height = "0px";
          if (qx) {
            qx.setAttribute("aria-expanded", "false");
            const icon = $(".faq-icon", x);
            if (icon) icon.textContent = "+";
          }
        });

        if (!isOpen) {
          item.classList.add("open");
          q.setAttribute("aria-expanded", "true");
          const inner = $(".faq-a-inner", item);
          const h = inner ? inner.scrollHeight : 0;
          a.style.height = h + "px";
          const icon = $(".faq-icon", item);
          if (icon) icon.textContent = "×";
        } else {
          item.classList.remove("open");
          q.setAttribute("aria-expanded", "false");
          a.style.height = "0px";
          const icon = $(".faq-icon", item);
          if (icon) icon.textContent = "+";
        }
      };

      q.addEventListener("click", toggle);
      q.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      });

      host.appendChild(item);
    });
  }

  function setContacts() {
    const phone = safeText(cfg.phone || "");
    const phonePretty = safeText(cfg.phonePretty || phone);

    // phone
    const phoneLink = $("#phoneLink");
    if (phoneLink) {
      phoneLink.href = `tel:${phone}`;
      phoneLink.textContent = phonePretty || phone;
    }

    // hours/areas
    const hoursText = $("#hoursText");
    if (hoursText) hoursText.textContent = safeText(cfg.hours || "");
    const areasText = $("#areasText");
    if (areasText) areasText.textContent = safeText(cfg.areas || "");

    // telegram / whatsapp / instagram
    const tgUrl = safeText(cfg.telegramUrl || "");
    const waMe = safeText(cfg.whatsappWaMe || "");
    const igUrl = safeText(cfg.instagramUrl || "");
    const igHandle = safeText(cfg.instagramHandle || "");

    const tgBtns = [$("#tgBtn"), $("#bbTg"), $("#tgText")].filter(Boolean);
    tgBtns.forEach(el => {
      el.href = tgUrl || "#";
      // tgText content already in HTML, keep it
    });

    const waUrl = waMe ? `https://wa.me/${waMe}` : "#";
    const waBtns = [$("#waBtn"), $("#waText")].filter(Boolean);
    waBtns.forEach(el => el.href = waUrl);

    const igBtns = [$("#igBtn"), $("#igText")].filter(Boolean);
    igBtns.forEach(el => el.href = igUrl || "#");
    if ($("#igText")) $("#igText").textContent = igHandle ? `@${igHandle}` : "@instagram";

    // call buttons
    const callTop = $("#callBtnTop");
    const bbCall = $("#bbCall");
    if (callTop) callTop.href = `tel:${phone}`;
    if (bbCall) bbCall.href = `tel:${phone}`;

    // top pricing hints
    const fromPrice = $("#fromPrice");
    if (fromPrice) fromPrice.textContent = safeText(cfg.fromPrice || "—");
    const priceHint = $("#priceHint");
    if (priceHint) priceHint.textContent = safeText(cfg.priceHint || "");
  }

  function setBadges() {
    const badges = $("#badges");
    if (badges) {
      badges.innerHTML = "";
      (cfg.badges || []).forEach(t => {
        const s = document.createElement("span");
        s.className = "chip2";
        s.textContent = safeText(t);
        badges.appendChild(s);
      });
    }
    const side = $("#sideBadges");
    if (side) {
      side.innerHTML = "";
      (cfg.sideBadges || []).forEach(t => {
        const s = document.createElement("span");
        s.className = "chip2";
        s.textContent = safeText(t);
        side.appendChild(s);
      });
    }
  }

  function initServiceSelectors() {
    const options = Array.isArray(cfg.serviceOptions) ? cfg.serviceOptions : [];
    if (!options.length) return;

    const serviceHidden = $("#serviceHidden");

    // hero chips
    const heroChips = $("#heroServiceChips");
    if (heroChips) {
      renderChips(heroChips, options.slice(0, 6), (val) => {
        if (serviceHidden && !serviceHidden.value) serviceHidden.value = val;
      }, options[0]);
    }

    // form chips
    const formChips = $("#serviceChips");
    if (formChips && serviceHidden) {
      renderChips(formChips, options, (val) => {
        serviceHidden.value = val;
      }, options[0]);
      serviceHidden.value = options[0];
    }
  }

  function buildMessage(formData) {
    const name = safeText(formData.get("name"));
    const phone = safeText(formData.get("phone"));
    const service = safeText(formData.get("service"));
    const area = safeText(formData.get("area"));
    const comment = safeText(formData.get("comment"));

    const lines = [
      "Заявка BreezeService",
      "",
      `Имя: ${name}`,
      `Телефон: ${phone}`,
      `Услуга: ${service}`,
      area ? `Адрес/район: ${area}` : null,
      comment ? `Комментарий: ${comment}` : null
    ].filter(Boolean);

    return lines.join("\n");
  }

  function initForm() {
    const form = $("#leadForm");
    if (!form) return;

    const tgUrl = safeText(cfg.telegramUrl || "");
    const waMe = safeText(cfg.whatsappWaMe || "");
    const waUrl = waMe ? `https://wa.me/${waMe}` : "";

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const msg = buildMessage(fd);

      // Telegram: open chat link + prefill text via ?text=... is not standard for channels,
      // so we open tgUrl and also copy text to clipboard best-effort.
      // (Works reliably across browsers.)
      try {
        navigator.clipboard?.writeText(msg);
      } catch {}
      if (tgUrl) window.open(tgUrl, "_blank");
      else alert(msg);
    });

    const sendWA = $("#sendWA");
    if (sendWA) {
      sendWA.addEventListener("click", () => {
        const fd = new FormData(form);
        const msg = encodeURIComponent(buildMessage(fd));
        if (waUrl) window.open(`${waUrl}?text=${msg}`, "_blank");
      });
    }
  }

  function setYear() {
    const y = $("#year");
    if (y) y.textContent = new Date().getFullYear();
  }

  // Fix: after FAQ opens, keep height correct on resize
  function resizeFAQHeights() {
    $$(".faq-item.open").forEach(item => {
      const a = $(".faq-a", item);
      const inner = $(".faq-a-inner", item);
      if (!a || !inner) return;
      a.style.height = inner.scrollHeight + "px";
    });
  }

  function boot() {
    setBindTexts();
    setContacts();
    renderPopular();
    renderServices();
    renderPricing();
    renderFAQ();
    setBadges();
    initServiceSelectors();
    initForm();
    setYear();

    // add glass layers after DOM built
    addGlassLayers();

    window.addEventListener("resize", () => resizeFAQHeights());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
