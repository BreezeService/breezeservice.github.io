// site.js (v3) — smooth iOS glass, mobile-safe layout, wind+rgb glow, accordion animation, theme+lang
(() => {
  const C = window.SITE_CONFIG;

  // ---------- Helpers ----------
  const $ = (s, p=document) => p.querySelector(s);
  const $$ = (s, p=document) => Array.from(p.querySelectorAll(s));
  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

  // ---------- State ----------
  const state = {
    lang: localStorage.getItem("bs_lang") || "ru",
    theme: localStorage.getItem("bs_theme") || "light",
    activeServiceKey: C.services[0]?.key || "install",
  };

  // ---------- Apply theme ----------
  function applyTheme() {
    document.documentElement.setAttribute("data-theme", state.theme);
    const themeIco = $("#themeIco");
    if (themeIco) themeIco.innerHTML = icon(state.theme === "dark" ? "moon" : "sun");
    // theme-color for mobile top bar
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", state.theme === "dark" ? "#071018" : "#eaf7ff");
  }

  // ---------- I18N ----------
  function t(key) {
    const dict = C.i18n[state.lang] || C.i18n.ru;
    return dict[key] ?? (C.i18n.ru[key] ?? key);
  }

  function applyI18n() {
    $$("[data-i18n]").forEach(el => {
      const k = el.getAttribute("data-i18n");
      el.textContent = t(k);
    });

    // Update FAQ text inside accordion (created from config)
    renderFAQ();

    // Update services chips + select
    renderChips();
    renderServiceSelect();

    // Set active lang UI
    const btns = $$(".seg__btn");
    btns.forEach(b => b.classList.toggle("is-active", b.dataset.lang === state.lang));
    moveLangPill();
  }

  function moveLangPill() {
    const wrap = $(".seg");
    if (!wrap) return;
    const pill = $(".seg__pill", wrap);
    const btns = $$(".seg__btn", wrap);
    const idx = btns.findIndex(b => b.dataset.lang === state.lang);
    const i = idx >= 0 ? idx : 0;
    pill.style.transform = `translateX(${i * 100}%)`;
  }

  // ---------- Links ----------
  function applyLinks() {
    const setHref = (id, href) => { const el = $(id); if (el) el.href = href; };

    setHref("#tgBtn", C.telegramLink);
    setHref("#tgBtn2", C.telegramLink);
    setHref("#dockTG", C.telegramLink);

    setHref("#waBtn", C.whatsappLink);
    setHref("#waBtn2", C.whatsappLink);

    setHref("#igBtn", C.instagramLink);
    setHref("#igBtn2", C.instagramLink);

    // ensure call buttons always correct
    const callTop = $("#callTop");
    if (callTop) callTop.href = `tel:${C.phoneRaw}`;
  }

  // ---------- Icons (minimal SVG, no emoji) ----------
  function icon(name) {
    const common = `fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"`;
    switch (name) {
      case "phone":
        return `<svg viewBox="0 0 24 24" ${common}><path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 3 5.2 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .7 3a2 2 0 0 1-.5 2.1L9.9 11a16 16 0 0 0 3.1 3.1l1.2-1.2a2 2 0 0 1 2.1-.5c1 .4 2 .6 3 .7a2 2 0 0 1 1.7 2z"/></svg>`;
      case "spark":
        return `<svg viewBox="0 0 24 24" ${common}><path d="M12 2l1.4 6.1L19 9.5l-5.6 1.4L12 17l-1.4-6.1L5 9.5l5.6-1.4L12 2z"/><path d="M19 14l.8 3.3L23 18l-3.2.7L19 22l-.8-3.3L15 18l3.2-.7L19 14z"/></svg>`;
      case "tg":
        return `<svg viewBox="0 0 24 24" ${common}><path d="M21.8 4.6L3.6 11.7c-.9.3-.9 1.6.1 1.9l4.8 1.6 2 6.1c.3.9 1.5 1 2 .2l2.7-3.6 4.9 3.6c.7.5 1.7.1 1.9-.7l2.9-16.5c.2-.9-.7-1.6-1.5-1.3z"/><path d="M9 14.8l10.4-7.6"/></svg>`;
      case "wa":
        return `<svg viewBox="0 0 24 24" ${common}><path d="M20.5 11.8a8.5 8.5 0 0 1-12.6 7.4L3 21l1.9-4.8A8.5 8.5 0 1 1 20.5 11.8z"/><path d="M8.7 8.6c-.4.5-.6 1.1-.5 1.7.2 1.1 1.1 2.6 2.4 3.8 1.3 1.2 2.9 2.1 4.1 2.2.6.1 1.2-.1 1.7-.5l.8-.7c.3-.3.4-.7.2-1l-.9-1.6c-.2-.4-.7-.5-1.1-.3l-1 .5c-.7-.3-1.5-.8-2.1-1.4-.6-.6-1.1-1.3-1.4-2.1l.5-1c.2-.4.1-.9-.3-1.1L9.7 7c-.3-.2-.7-.1-1 .2l-.8.8z"/></svg>`;
      case "ig":
        return `<svg viewBox="0 0 24 24" ${common}><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><path d="M16.5 11.8a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0z"/><path d="M17.6 6.6h.01"/></svg>`;
      case "chev":
        return `<svg viewBox="0 0 24 24" ${common}><path d="M6 9l6 6 6-6"/></svg>`;
      case "sun":
        return `<svg viewBox="0 0 24 24" ${common}><path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="M4.9 4.9l1.4 1.4"/><path d="M17.7 17.7l1.4 1.4"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="M4.9 19.1l1.4-1.4"/><path d="M17.7 6.3l1.4-1.4"/></svg>`;
      case "moon":
        return `<svg viewBox="0 0 24 24" ${common}><path d="M21 13.2A7.5 7.5 0 0 1 10.8 3 6.5 6.5 0 1 0 21 13.2z"/></svg>`;
      default:
        return "";
    }
  }

  function injectIcons() {
    $$("[data-ico]").forEach(el => {
      const name = el.getAttribute("data-ico");
      el.innerHTML = icon(name);
    });
  }

  // ---------- Chips / Select ----------
  function renderChips() {
    const wrap = $("#chips");
    if (!wrap) return;
    wrap.innerHTML = "";
    C.services.forEach(s => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "chip" + (s.key === state.activeServiceKey ? " is-active" : "");
      b.textContent = s[state.lang] || s.ru;
      b.addEventListener("click", () => {
        state.activeServiceKey = s.key;
        renderChips();
        const sel = $("#service");
        if (sel) sel.value = s.key;
      }, { passive: true });
      wrap.appendChild(b);
    });
  }

  function renderServiceSelect() {
    const sel = $("#service");
    if (!sel) return;
    sel.innerHTML = "";
    C.services.forEach(s => {
      const opt = document.createElement("option");
      opt.value = s.key;
      opt.textContent = s[state.lang] || s.ru;
      sel.appendChild(opt);
    });
    sel.value = state.activeServiceKey;
    sel.addEventListener("change", () => {
      state.activeServiceKey = sel.value;
      renderChips();
    }, { passive: true });
  }

  // ---------- Accordion (smooth height animation) ----------
  function renderFAQ() {
    const acc = $("#accordion");
    if (!acc) return;
    acc.innerHTML = "";

    C.faq.forEach((item, idx) => {
      const it = document.createElement("div");
      it.className = "accItem";
      it.dataset.idx = String(idx);

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "accBtn";
      btn.innerHTML = `<span>${item.q[state.lang] || item.q.ru}</span><span class="chev">${icon("chev")}</span>`;

      const panel = document.createElement("div");
      panel.className = "accPanel";

      const inner = document.createElement("div");
      inner.className = "accPanel__inner";
      inner.textContent = item.a[state.lang] || item.a.ru;

      panel.appendChild(inner);
      it.appendChild(btn);
      it.appendChild(panel);
      acc.appendChild(it);

      btn.addEventListener("click", () => toggleAcc(it), { passive: true });
    });
  }

  function closeAcc(item) {
    item.classList.remove("is-open");
    const panel = $(".accPanel", item);
    panel.style.height = "0px";
  }

  function openAcc(item) {
    item.classList.add("is-open");
    const panel = $(".accPanel", item);
    const inner = $(".accPanel__inner", item);
    panel.style.height = inner.scrollHeight + "px";
  }

  function toggleAcc(item) {
    const isOpen = item.classList.contains("is-open");

    // optional: close others
    $$(".accItem.is-open").forEach(x => {
      if (x !== item) closeAcc(x);
    });

    if (isOpen) closeAcc(item);
    else openAcc(item);

    // ensure smooth if content changes (mobile)
    requestAnimationFrame(() => {
      if (item.classList.contains("is-open")) {
        const panel = $(".accPanel", item);
        const inner = $(".accPanel__inner", item);
        panel.style.height = inner.scrollHeight + "px";
      }
    });
  }

  // Recompute open accordion heights on resize (orientation change)
  function bindResizeAccordionFix() {
    let raf = 0;
    window.addEventListener("resize", () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        $$(".accItem.is-open").forEach(item => {
          const panel = $(".accPanel", item);
          const inner = $(".accPanel__inner", item);
          panel.style.height = inner.scrollHeight + "px";
        });
      });
    }, { passive: true });
  }

  // ---------- Form -> WhatsApp / Telegram prefilled ----------
  function buildMessage() {
    const name = ($("#name")?.value || "").trim();
    const phone = ($("#phone")?.value || "").trim();
    const serviceKey = $("#service")?.value || state.activeServiceKey;
    const serviceObj = C.services.find(s => s.key === serviceKey) || C.services[0];
    const serviceTxt = serviceObj ? (serviceObj[state.lang] || serviceObj.ru) : "";

    const msg = ($("#msg")?.value || "").trim();

    const lines = [];
    if (name) lines.push(`${t("name")}: ${name}`);
    if (phone) lines.push(`${t("phone")}: ${phone}`);
    if (serviceTxt) lines.push(`${t("service")}: ${serviceTxt}`);
    if (msg) lines.push(`${t("comment")}: ${msg}`);

    if (!lines.length) lines.push("Здравствуйте! Нужна консультация по кондиционеру.");
    return lines.join("\n");
  }

  function bindForm() {
    const form = $("#reqForm");
    if (!form) return;

    const wa = $("#sendWA");
    const tg = $("#sendTG");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = encodeURIComponent(buildMessage());
      // WhatsApp deep link
      const url = `${C.whatsappLink}?text=${text}`;
      window.open(url, "_blank", "noopener");
    });

    tg?.addEventListener("click", () => {
      const text = encodeURIComponent(buildMessage());
      // Telegram share
      const url = `https://t.me/share/url?url=&text=${text}`;
      window.open(url, "_blank", "noopener");
    }, { passive: true });
  }

  // ---------- Theme toggle ----------
  function bindTheme() {
    const btn = $("#themeBtn");
    if (!btn) return;
    btn.addEventListener("click", () => {
      state.theme = state.theme === "dark" ? "light" : "dark";
      localStorage.setItem("bs_theme", state.theme);
      applyTheme();
    }, { passive: true });
  }

  // ---------- Language toggle ----------
  function bindLang() {
    $$(".seg__btn").forEach(b => {
      b.addEventListener("click", () => {
        state.lang = b.dataset.lang || "ru";
        localStorage.setItem("bs_lang", state.lang);
        applyI18n();
      }, { passive: true });
    });
  }

  // ---------- Fix “half panel visible” on mobile (usually horizontal overflow) ----------
  function hardenMobileLayout() {
    // Kill any accidental horizontal scroll
    document.documentElement.style.overflowX = "hidden";
    document.body.style.overflowX = "hidden";

    // Also prevent momentum weirdness inside IG in-app browser
    document.body.style.webkitOverflowScrolling = "touch";
  }

  // ---------- Init ----------
  function init() {
    $("#y").textContent = String(new Date().getFullYear());

    hardenMobileLayout();
    applyTheme();
    applyLinks();
    injectIcons();
    bindTheme();
    bindLang();

    applyI18n();
    bindResizeAccordionFix();
    bindForm();

    // Keep lang pill correct after fonts load
    setTimeout(moveLangPill, 60);

    // Smooth highlight fix for tap on iOS: no focus outline “blue squares”
    document.addEventListener("touchstart", () => {}, { passive: true });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
