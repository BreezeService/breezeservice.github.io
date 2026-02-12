(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const cfg = window.APP_CONFIG;

  if (cfg?.brand?.accent) {
    document.documentElement.style.setProperty("--accent", cfg.brand.accent);
  }

  $("#brandName").textContent = cfg.brand.name;
  $("#brandTagline").textContent = cfg.brand.tagline;

  $("#city").textContent = cfg.brand.city;
  $("#hours").textContent = cfg.brand.supportHours;
  $("#phone").textContent = cfg.brand.phone;

  $("#heroTitle").textContent = cfg.hero.title;
  $("#heroSubtitle").textContent = cfg.hero.subtitle;

  const actions = $("#heroActions");
  cfg.hero.ctas.forEach((c) => {
    const a = document.createElement("a");
    a.href = c.href;
    a.className = `btn ${c.variant === "ghost" ? "ghost" : "primary"}`;
    a.textContent = c.label;
    actions.appendChild(a);
  });

  const stats = $("#stats");
  cfg.stats.forEach((s) => {
    const el = document.createElement("div");
    el.className = "mini";
    el.innerHTML = `<div class="v">${escapeHtml(s.value)}</div><div class="k">${escapeHtml(s.label)}</div>`;
    stats.appendChild(el);
  });

  const servicesWrap = $("#services");
  cfg.services.forEach((svc) => {
    const el = document.createElement("div");
    el.className = "card";

    const badge = svc.badge ? `<span class="badge">${escapeHtml(svc.badge)}</span>` : "";

    el.innerHTML = `
      <div class="cardTop">
        <div>
          <h4>${escapeHtml(svc.title)}</h4>
          <div class="meta">
            <span>от <span class="price">${fmtMoney(svc.priceFrom)}</span></span>
            <span>•</span>
            <span>${escapeHtml(svc.time)}</span>
          </div>
        </div>
        ${badge}
      </div>
      <ul class="ul">
        ${svc.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join("")}
      </ul>
      <div style="margin-top:12px; display:flex; gap:10px; flex-wrap:wrap;">
        <button class="btn ghost" data-book="${svc.id}">Записаться</button>
        <button class="btn primary" data-quick="${svc.id}">Быстрый запрос</button>
      </div>
    `;
    servicesWrap.appendChild(el);
  });

  const store = $("#storeGrid");
  const categorySelect = $("#category");
  const searchInput = $("#search");

  const categories = ["Все", ...new Set(cfg.products.map((p) => p.category))];
  categories.forEach((c) => {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    categorySelect.appendChild(opt);
  });

  const cart = new Map(); // id -> qty

  function renderProducts() {
    store.innerHTML = "";
    const q = (searchInput.value || "").trim().toLowerCase();
    const cat = categorySelect.value;

    const items = cfg.products
      .filter((p) => (cat === "Все" ? true : p.category === cat))
      .filter((p) => {
        if (!q) return true;
        return (
          p.title.toLowerCase().includes(q) ||
          p.desc.toLowerCase().includes(q) ||
          p.tags.join(" ").toLowerCase().includes(q)
        );
      });

    if (!items.length) {
      const empty = document.createElement("div");
      empty.className = "card";
      empty.style.gridColumn = "1 / -1";
      empty.innerHTML = `<h4 style="margin:0">Ничего не найдено</h4><p class="small" style="margin:8px 0 0">Попробуй другой запрос или категорию.</p>`;
      store.appendChild(empty);
      return;
    }

    items.forEach((p) => {
      const el = document.createElement("div");
      el.className = "product";
      const inCart = cart.get(p.id) || 0;
      el.innerHTML = `
        <div class="pillRow">
          <span class="pill">${escapeHtml(p.category)}</span>
          ${p.stock ? `<span class="pill">В наличии</span>` : `<span class="pill">Под заказ</span>`}
          ${p.tags.slice(0,2).map(t=>`<span class="pill">${escapeHtml(t)}</span>`).join("")}
        </div>
        <p class="pTitle">${escapeHtml(p.title)}</p>
        <p class="pDesc">${escapeHtml(p.desc)}</p>
        <div class="pFoot">
          <div>
            <div class="pPrice">${fmtMoney(p.price)} <span style="font-weight:650; color:rgba(13,27,34,.62)">/ ${escapeHtml(p.unit)}</span></div>
            <div class="small">${escapeHtml(cfg.brand.city)}</div>
          </div>
          <button class="cartBtn" data-add="${p.id}" ${p.stock ? "" : "disabled"}>
            ${inCart ? `Добавлено (${inCart})` : "В корзину"}
          </button>
        </div>
      `;
      store.appendChild(el);
    });
  }

  categorySelect.addEventListener("change", renderProducts);
  searchInput.addEventListener("input", debounce(renderProducts, 120));

  const partnerWrap = $("#partners");
  cfg.partners.forEach((p) => {
    const b = document.createElement("span");
    b.className = "badge";
    b.textContent = `${p.name} • ${p.note}`;
    partnerWrap.appendChild(b);
  });

  const faq = $("#faq");
  cfg.faqs.forEach((f) => {
    const el = document.createElement("div");
    el.className = "card";
    el.innerHTML = `
      <h4 style="margin:0">${escapeHtml(f.q)}</h4>
      <p class="small" style="margin:8px 0 0; line-height:1.45;">${escapeHtml(f.a)}</p>
    `;
    faq.appendChild(el);
  });

  const bookingForm = $("#bookingForm");
  const serviceSelect = $("#serviceSelect");
  cfg.services.forEach((s) => {
    const opt = document.createElement("option");
    opt.value = s.id;
    opt.textContent = s.title;
    serviceSelect.appendChild(opt);
  });

  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const t = document.querySelector(id);
      if (!t) return;
      e.preventDefault();
      t.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  document.addEventListener("click", (e) => {
    const book = e.target.closest("[data-book]");
    const quick = e.target.closest("[data-quick]");
    const add = e.target.closest("[data-add]");

    if (book) {
      const id = book.getAttribute("data-book");
      serviceSelect.value = id;
      $("#booking").scrollIntoView({ behavior: "smooth" });
      toast("Выбрана услуга — заполни заявку");
    }

    if (quick) {
      const id = quick.getAttribute("data-quick");
      const svc = cfg.services.find((s) => s.id === id);
      openModal("Быстрый запрос", `
        <p class="small" style="margin:0 0 10px">Услуга: <b>${escapeHtml(svc?.title || "")}</b></p>
        <p class="small" style="margin:0 0 12px">Оставь телефон — мы перезвоним в течение дня.</p>
        <div class="field">
          <label>Телефон</label>
          <input id="quickPhone" placeholder="+998 __ ___ __ __" />
        </div>
        <button class="btn primary" id="quickSend" style="width:100%; justify-content:center">Отправить</button>
      `);

      setTimeout(() => {
        $("#quickSend")?.addEventListener("click", () => {
          const phone = $("#quickPhone")?.value?.trim();
          if (!phone) return toast("Введи телефон");
          closeModal();
          toast("Заявка отправлена (демо)");
        });
      }, 0);
    }

    if (add) {
      const id = add.getAttribute("data-add");
      cart.set(id, (cart.get(id) || 0) + 1);
      renderProducts();
      updateCartBadge();
      toast("Добавлено в корзину");
    }
  });

  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#bName").value.trim();
    const phone = $("#bPhone").value.trim();
    if (!name || !phone) return toast("Заполни имя и телефон");
    toast("Заявка отправлена (демо)");
    bookingForm.reset();
  });

  $("#openCart").addEventListener("click", () => openCart());

  function openCart() {
    const items = Array.from(cart.entries());
    if (!items.length) {
      openModal("Корзина", `<p class="small" style="margin:0">Пока пусто. Добавь товары из каталога.</p>`);
      return;
    }

    const rows = items.map(([id, qty]) => {
      const p = cfg.products.find((x) => x.id === id);
      const subtotal = (p?.price || 0) * qty;
      return `
        <div class="cartItem" data-item="${id}">
          <div>
            <div style="font-weight:750">${escapeHtml(p?.title || id)}</div>
            <div class="small">${fmtMoney(p?.price || 0)} / ${escapeHtml(p?.unit || "")}</div>
          </div>
          <div style="text-align:right">
            <div class="qty">
              <button data-dec="${id}">−</button>
              <span>${qty}</span>
              <button data-inc="${id}">+</button>
            </div>
            <div class="small" style="margin-top:6px">${fmtMoney(subtotal)}</div>
          </div>
        </div>
      `;
    }).join("");

    const total = items.reduce((sum, [id, qty]) => {
      const p = cfg.products.find((x) => x.id === id);
      return sum + (p?.price || 0) * qty;
    }, 0);

    openModal("Корзина", `
      <div>${rows}</div>
      <div class="line"></div>
      <div style="display:flex; align-items:center; justify-content:space-between; gap:12px;">
        <div>
          <div style="font-weight:800">Итого</div>
          <div class="small">Доставка/установка — по договоренности</div>
        </div>
        <div style="font-weight:900; font-size:18px; letter-spacing:-.2px;">${fmtMoney(total)}</div>
      </div>
      <div style="margin-top:14px; display:flex; gap:10px; flex-wrap:wrap;">
        <button class="btn ghost" id="clearCart">Очистить</button>
        <button class="btn primary" id="checkout" style="flex:1; justify-content:center">Оформить (демо)</button>
      </div>
    `);

    setTimeout(() => {
      $("#clearCart")?.addEventListener("click", () => {
        cart.clear();
        updateCartBadge();
        renderProducts();
        closeModal();
        toast("Корзина очищена");
      });
      $("#checkout")?.addEventListener("click", () => {
        closeModal();
        toast("Оформление (демо). Подключим оплату позже.");
      });

      document.addEventListener("click", (ev) => {
        const inc = ev.target.closest("[data-inc]");
        const dec = ev.target.closest("[data-dec]");
        if (!inc && !dec) return;

        const id = (inc || dec).getAttribute(inc ? "data-inc" : "data-dec");
        const cur = cart.get(id) || 0;
        const next = inc ? cur + 1 : cur - 1;

        if (next <= 0) cart.delete(id);
        else cart.set(id, next);

        updateCartBadge();
        openCart();
        renderProducts();
      }, { once: true });
    }, 0);
  }

  function updateCartBadge() {
    const n = Array.from(cart.values()).reduce((a, b) => a + b, 0);
    $("#cartCount").textContent = n ? String(n) : "0";
  }

  const overlay = $("#modalOverlay");
  const modalTitle = $("#modalTitle");
  const modalContent = $("#modalContent");

  $("#closeModal").addEventListener("click", closeModal);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) closeModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

  function openModal(title, html) {
    modalTitle.textContent = title;
    modalContent.innerHTML = html;
    overlay.style.display = "flex";
  }
  function closeModal() {
    overlay.style.display = "none";
    modalContent.innerHTML = "";
  }

  const toastEl = $("#toast");
  let toastT;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.style.display = "block";
    clearTimeout(toastT);
    toastT = setTimeout(() => (toastEl.style.display = "none"), 1800);
  }

  renderProducts();
  updateCartBadge();

  function fmtMoney(n) {
    const cur = cfg.brand.currency || "";
    const s = Number(n || 0).toLocaleString("ru-RU");
    return `${s} ${cur}`.trim();
  }

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function debounce(fn, ms) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), ms);
    };
  }
})();
