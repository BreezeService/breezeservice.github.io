(() => {
  const CFG = window.SITE_CONFIG;
  if (!CFG) {
    console.error("SITE_CONFIG not found (config.js).");
    return;
  }

  const LS_THEME = "bs_theme";
  const LS_LANG = "bs_lang";

  const html = document.documentElement;

  // ---- THEME ----
  function getInitialTheme() {
    const saved = localStorage.getItem(LS_THEME);
    if (saved === "light" || saved === "dark") return saved;
    // system fallback
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  }

  function setTheme(theme, persist = true) {
    html.setAttribute("data-theme", theme);
    html.querySelector('meta[name="theme-color"]')?.setAttribute(
      "content",
      theme === "dark" ? "#05070d" : "#F5F9FC"
    );
    if (persist) localStorage.setItem(LS_THEME, theme);
  }

  // ---- LANGUAGE ----
  function getInitialLang() {
    const saved = localStorage.getItem(LS_LANG);
    if (saved && ["ru","en","uz"].includes(saved)) return saved;
    return "ru";
  }

  function setLang(lang, persist = true) {
    html.setAttribute("data-lang", lang);
    html.lang = lang;
    if (persist) localStorage.setItem(LS_LANG, lang);
    applyI18n(lang);
    renderDynamic(lang);
    updateActiveLangButtons(lang);
  }

  function t(lang, key) {
    const dict = CFG.i18n[lang] || CFG.i18n.ru;
    return key.split(".").reduce((acc, k) => (acc && acc[k] != null ? acc[k] : null), dict);
  }

  function applyI18n(lang) {
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      const val = t(lang, key);
      if (val == null) return;
      el.textContent = String(val);
    });

    // placeholders
    const name = document.getElementById("name");
    const msg = document.getElementById("msg");
    if (name) name.placeholder = t(lang, "form.name") || "";
    if (msg) msg.placeholder = t(lang, "form.comment") || "";
  }

  function updateActiveLangButtons(lang) {
    document.querySelectorAll("[data-lang-btn]").forEach(btn => {
      btn.classList.toggle("is-active", btn.getAttribute("data-lang-btn") === lang);
    });
  }

  // ---- LINKS (correct) ----
  function wireLinks() {
    const telHref = `tel:${CFG.phone}`;
    const callBtns = ["callBtnTop", "callBtnHero", "dockCall"].map(id => document.getElementById(id)).filter(Boolean);
    callBtns.forEach(a => a.setAttribute("href", telHref));

    const phoneLink = document.getElementById("phoneLink");
    if (phoneLink) {
      phoneLink.textContent = CFG.phonePretty;
      phoneLink.href = telHref;
    }

    // socials
    const tg = [document.getElementById("tgBtn"), document.getElementById("tgBtn2"), document.getElementById("dockTG"), document.getElementById("footTG")].filter(Boolean);
    tg.forEach(a => a.href = CFG.telegramUrl);

    const wa = [document.getElementById("waBtn"), document.getElementById("waBtn2")].filter(Boolean);
    wa.forEach(a => a.href = CFG.whatsappUrl);

    const ig = [document.getElementById("igBtn"), document.getElementById("igBtn2"), document.getElementById("footIG")].filter(Boolean);
    ig.forEach(a => a.href = CFG.instagramUrl);

    // footer copyright once
    const c = document.getElementById("copyright");
    if (c) c.textContent = `© ${new Date().getFullYear()} BreezeService`;
  }

  // ---- DYNAMIC RENDER ----
  function renderDynamic(lang) {
    // hero pills
    const pillsWrap = document.getElementById("heroPills");
    if (pillsWrap) {
      pillsWrap.innerHTML = "";
      const arr = (t(lang, "hero.pills") || []);
      arr.forEach(text => {
        const el = document.createElement("span");
        el.className = "pill";
        el.textContent = text;
        pillsWrap.appendChild(el);
      });
    }

    // popular
    const popular = document.getElementById("popularCards");
    if (popular) {
      popular.innerHTML = "";
      const items = t(lang, "popular") || [];
      items.forEach(it => {
        const card = document.createElement("div");
        card.className = "s-card glass rgb-hover";
        card.innerHTML = `<h4>${escapeHtml(it.title)}</h4><p>${escapeHtml(it.text)}</p>`;
        popular.appendChild(card);
      });
    }

    // side badges
    const side = document.getElementById("sideBadges");
    if (side) {
      side.innerHTML = "";
      const list = (t(lang, "contact.badges") || []);
      list.slice(0, 3).forEach(x => {
        const b = document.createElement("span");
        b.className = "badge";
        b.textContent = x;
        side.appendChild(b);
      });
    }

    // services lists
    const lists = document.getElementById("servicesLists");
    if (lists) {
      lists.innerHTML = "";
      const blocks = t(lang, "services.lists") || [];
      blocks.forEach(block => {
        const wrap = document.createElement("div");
        wrap.className = "card glass list rgb-hover";
        const ul = document.createElement("ul");
        block.items.forEach(it => {
          const li = document.createElement("li");
          li.className = "li";
          li.innerHTML = `<span class="check"></span><div><b>${escapeHtml(it.b)}</b><span>${escapeHtml(it.s)}</span></div>`;
          ul.appendChild(li);
        });

        wrap.innerHTML = `<h3>${escapeHtml(block.title)}</h3>`;
        wrap.appendChild(ul);
        lists.appendChild(wrap);
      });
    }

    // pricing
    const pricing = document.getElementById("pricingCards");
    if (pricing) {
      pricing.innerHTML = "";
      const cards = t(lang, "pricing.cards") || [];
      cards.forEach(p => {
        const el = document.createElement("div");
        el.className = "card glass plan rgb-hover";
        el.innerHTML = `
          <div class="tag">${escapeHtml(p.tag)}</div>
          <h4>${escapeHtml(p.title)}</h4>
          <p class="p">${escapeHtml(p.text)}</p>
          <div class="cost">${escapeHtml(p.cost)}</div>
          <ul>${(p.bullets || []).map(b => `<li>${escapeHtml(b)}</li>`).join("")}</ul>
        `;
        pricing.appendChild(el);
      });
    }

    // FAQ smooth
    const faq = document.getElementById("faqList");
    if (faq) {
      faq.innerHTML = "";
      const items = t(lang, "faq.items") || [];
      items.forEach((it, idx) => {
        const card = document.createElement("div");
        card.className = "faq-item glass rgb-hover";
        card.setAttribute("data-faq", String(idx));
        card.innerHTML = `
          <div class="faq-q" role="button" tabindex="0" aria-expanded="false">
            <span>${escapeHtml(it.q)}</span>
            <span class="chev">▾</span>
          </div>
          <div class="faq-a" aria-hidden="true">
            <p>${escapeHtml(it.a)}</p>
          </div>
        `;
        faq.appendChild(card);
      });

      // bind
      faq.querySelectorAll(".faq-item .faq-q").forEach(q => {
        q.addEventListener("click", () => toggleFaq(q.closest(".faq-item")));
        q.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleFaq(q.closest(".faq-item"));
          }
        });
      });
    }

    // service select
    const select = document.getElementById("service");
    if (select) {
      select.innerHTML = "";
      const opts = (CFG.servicesOptions && CFG.servicesOptions[lang]) || CFG.servicesOptions.ru;
      opts.forEach(v => {
        const o = document.createElement("option");
        o.value = v;
        o.textContent = v;
        select.appendChild(o);
      });
    }

    // contact badges
    const cb = document.getElementById("contactBadges");
    if (cb) {
      cb.innerHTML = "";
      const list = (t(lang, "contact.badges") || []);
      list.forEach(x => {
        const b = document.createElement("span");
        b.className = "badge";
        b.textContent = x;
        cb.appendChild(b);
      });
    }
  }

  function toggleFaq(item) {
    if (!item) return;
    const isOpen = item.classList.contains("is-open");

    // close others
    document.querySelectorAll(".faq-item.is-open").forEach(x => {
      if (x !== item) {
        x.classList.remove("is-open");
        const q = x.querySelector(".faq-q");
        if (q) q.setAttribute("aria-expanded", "false");
        const a = x.querySelector(".faq-a");
        if (a) a.setAttribute("aria-hidden", "true");
      }
    });

    item.classList.toggle("is-open", !isOpen);
    const q = item.querySelector(".faq-q");
    const a = item.querySelector(".faq-a");
    if (q) q.setAttribute("aria-expanded", String(!isOpen));
    if (a) a.setAttribute("aria-hidden", String(isOpen));
  }

  // ---- FORM -> open messenger with ready text ----
  function wireForm(lang) {
    const form = document.getElementById("leadForm");
    const tgBtn = document.getElementById("sendTelegram");
    if (!form) return;

    const buildMessage = () => {
      const name = (document.getElementById("name")?.value || "").trim();
      const phone = (document.getElementById("phone")?.value || "").trim();
      const service = (document.getElementById("service")?.value || "").trim();
      const msg = (document.getElementById("msg")?.value || "").trim();

      // short + clean
      const lines = [];
      lines.push(`BreezeService — ${t(lang, "contact.title")}`);
      if (name) lines.push(`${t(lang, "form.name")}: ${name}`);
      if (phone) lines.push(`${t(lang, "form.phone")}: ${phone}`);
      if (service) lines.push(`${t(lang, "form.service")}: ${service}`);
      if (msg) lines.push(`${t(lang, "form.comment")}: ${msg}`);
      return lines.join("\n");
    };

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = encodeURIComponent(buildMessage());
      // WhatsApp
      const wa = CFG.whatsappUrl || `https://wa.me/${CFG.phone.replace(/\D/g, "")}`;
      window.open(`${wa}?text=${text}`, "_blank", "noopener");
    });

    tgBtn?.addEventListener("click", () => {
      const text = encodeURIComponent(buildMessage());
      const tg = CFG.telegramUrl || "https://t.me/";
      // If tg is channel link - open it, message user manually.
      // We'll open Telegram link + put message into clipboard for convenience.
      copyToClipboard(decodeURIComponent(text));
      window.open(tg, "_blank", "noopener");
      // tiny feedback
      tgBtn.textContent = "✓ Copied";
      setTimeout(() => tgBtn.textContent = t(getLang(), "form.sendTelegram"), 900);
    });
  }

  function getLang(){ return html.getAttribute("data-lang") || "ru"; }

  async function copyToClipboard(text){
    try { await navigator.clipboard.writeText(text); } catch {}
  }

  function escapeHtml(s){
    return String(s)
      .replaceAll("&","&amp;")
      .replaceAll("<","&lt;")
      .replaceAll(">","&gt;")
      .replaceAll('"',"&quot;")
      .replaceAll("'","&#039;");
  }

  // ---- Smooth scroll (fix “half letters cut” / jumpy) ----
  function wireSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener("click", (e) => {
        const href = a.getAttribute("href");
        if (!href || href === "#") return;
        const el = document.querySelector(href);
        if (!el) return;
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", href);
      }, { passive: false });
    });
  }

  // ---- UI binds ----
  function wireThemeToggle() {
    const btn = document.getElementById("themeToggle");
    btn?.addEventListener("click", () => {
      const cur = html.getAttribute("data-theme") || "light";
      setTheme(cur === "light" ? "dark" : "light", true);
    });
  }

  function wireLangToggle() {
    document.querySelectorAll("[data-lang-btn]").forEach(btn => {
      btn.addEventListener("click", () => {
        const lang = btn.getAttribute("data-lang-btn");
        if (!lang) return;
        setLang(lang, true);
        wireForm(lang);
      });
    });
  }

  // ---- init ----
  const theme = getInitialTheme();
  setTheme(theme, false);

  const lang = getInitialLang();
  setLang(lang, false);

  wireLinks();
  wireSmoothScroll();
  wireThemeToggle();
  wireLangToggle();
  wireForm(lang);

})();
