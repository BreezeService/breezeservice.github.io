(() => {
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

  // ========= i18n =========
  const dict = {
    ru: {
      brandSub: "Сервис кондиционеров • Ташкент",
      theme: "Тема",
      call: "Позвонить",
      request: "Заявка",
      leaveRequest: "Заявка",
      kicker: "ТАШКЕНТ • КЛИМАТ-СЕРВИС",
      heroTitle: "BreezeService — сервис кондиционеров в Ташкенте",
      heroLead: "Помогаем частным клиентам и объектам любого масштаба: от чистки до установки и ремонта. Один звонок — консультация — выезд мастера без лишних сложностей.",
      sInstall: "Установка",
      sClean: "Чистка",
      sRepair: "Ремонт",
      sFreon: "Заправка фреоном",
      sDiag: "Диагностика",
      bullet1: "Гарантия на установку — 1 год",
      bullet2: "Оплата по факту выполненной работы",
      pricingH: "Стоимость",
      pricingLead: "Стоимость не фиксирована — зависит от задач",
      pTag1: "Чистка", p1a:"Чистка блоков", p1b:"Проверка работы", p1c:"Рекомендации",
      pTag2: "Установка", p2a:"Подбор решения", p2b:"Проверка запуска", p2c:"Гарантия 1 год",
      pTag3: "Ремонт/Диагностика", p3a:"Диагностика", p3b:"Согласование цены", p3c:"Ремонт по факту",
      noteTag: "Важно",
      noteText: "Перед выездом вы всегда получаете предварительную консультацию по телефону.",
      faqLead: "Гарантии и частые вопросы.",
      faqQ1:"Какая гарантия?", faqA1:"Гарантия на установку — 1 год. На остальные работы — по договорённости с мастером.",
      faqQ2:"Как формируется цена?", faqA2:"Зависит от сложности, количества кондиционеров, условий монтажа и состояния оборудования.",
      faqQ3:"Работаете с крупными объектами?", faqA3:"Да: офисы, магазины, коммерческие помещения и дома с несколькими кондиционерами. Делаем оценку и смету.",
      reqH:"Заявка",
      reqLead:"Заполни форму — откроем мессенджер с готовым текстом.",
      name:"Имя",
      phone:"Телефон",
      service:"Услуга",
      comment:"Комментарий",
      sendWA:"Отправить в WhatsApp",
      sendTG:"Отправить в Telegram",
      afterSubmit:"Мы отвечаем максимально быстро и стараемся подобрать удобное время для выезда мастера."
    },
    en: {
      brandSub: "AC service • Tashkent",
      theme: "Theme",
      call: "Call",
      request: "Request",
      leaveRequest: "Request",
      kicker: "TASHKENT • CLIMATE SERVICE",
      heroTitle: "BreezeService — AC service in Tashkent",
      heroLead: "We help private clients and any-scale sites: from cleaning to installation and repair. One call — consultation — technician visit with no hassle.",
      sInstall: "Installation",
      sClean: "Cleaning",
      sRepair: "Repair",
      sFreon: "Freon refill",
      sDiag: "Diagnostics",
      bullet1: "Installation warranty — 1 year",
      bullet2: "Pay after the job is done",
      pricingH: "Pricing",
      pricingLead: "No fixed price — depends on the task",
      pTag1:"Cleaning", p1a:"Unit cleaning", p1b:"Performance check", p1c:"Recommendations",
      pTag2:"Installation", p2a:"Solution selection", p2b:"Startup check", p2c:"1-year warranty",
      pTag3:"Repair/Diagnostics", p3a:"Diagnostics", p3b:"Price approval", p3c:"Repair after approval",
      noteTag:"Important",
      noteText:"Before the visit you always get a предварительная phone consultation.",
      faqLead:"Warranty and common questions.",
      faqQ1:"What warranty?", faqA1:"Installation warranty is 1 year. Other jobs — as agreed with the technician.",
      faqQ2:"How is the price formed?", faqA2:"Depends on complexity, number of units, installation conditions and equipment state.",
      faqQ3:"Do you work with large sites?", faqA3:"Yes: offices, shops, commercial spaces and homes with multiple units. We estimate and provide a quote.",
      reqH:"Request",
      reqLead:"Fill the form — we open a messenger with a ready text.",
      name:"Name",
      phone:"Phone",
      service:"Service",
      comment:"Comment",
      sendWA:"Send to WhatsApp",
      sendTG:"Send to Telegram",
      afterSubmit:"We reply fast and help pick a convenient visit time."
    },
    uz: {
      brandSub: "Konditsioner servisi • Toshkent",
      theme: "Mavzu",
      call: "Qo‘ng‘iroq",
      request: "Ariza",
      leaveRequest: "Ariza",
      kicker: "TOSHKENT • KLIMAT-SERVIS",
      heroTitle: "BreezeService — Toshkentda konditsioner servisi",
      heroLead: "Xususiy mijozlar va har qanday obyektlar uchun: tozalashdan o‘rnatish va ta’mirlashgacha. Bitta qo‘ng‘iroq — maslahat — usta chiqishi.",
      sInstall: "O‘rnatish",
      sClean: "Tozalash",
      sRepair: "Ta’mirlash",
      sFreon: "Freon quyish",
      sDiag: "Diagnostika",
      bullet1: "O‘rnatishga kafolat — 1 yil",
      bullet2: "Ish tugagach to‘lov",
      pricingH: "Narx",
      pricingLead: "Narx qat’iy emas — vazifaga bog‘liq",
      pTag1:"Tozalash", p1a:"Bloklarni tozalash", p1b:"Ishini tekshirish", p1c:"Tavsiyalar",
      pTag2:"O‘rnatish", p2a:"Yechim tanlash", p2b:"Ishga tushirish", p2c:"1 yil kafolat",
      pTag3:"Ta’mir/Diagnostika", p3a:"Diagnostika", p3b:"Narx kelishuvi", p3c:"Kelishilgan ta’mir",
      noteTag:"Muhim",
      noteText:"Usta kelishidan oldin telefon orqali dastlabki maslahat olasiz.",
      faqLead:"Kafolat va tez-tez savollar.",
      faqQ1:"Qanday kafolat?", faqA1:"O‘rnatishga 1 yil kafolat. Boshqa ishlar — usta bilan kelishiladi.",
      faqQ2:"Narx qanday belgilanadi?", faqA2:"Murakkablik, konditsionerlar soni, o‘rnatish sharoiti va holatiga bog‘liq.",
      faqQ3:"Katta obyektlar bilan ishlaysizmi?", faqA3:"Ha: ofislar, do‘konlar, tijorat joylari va bir nechta konditsionerli uylar. Smeta qilamiz.",
      reqH:"Ariza",
      reqLead:"Formani to‘ldiring — tayyor matn bilan messenjer ochamiz.",
      name:"Ism",
      phone:"Telefon",
      service:"Xizmat",
      comment:"Izoh",
      sendWA:"WhatsAppga yuborish",
      sendTG:"Telegramga yuborish",
      afterSubmit:"Tez javob beramiz va qulay vaqtni tanlaymiz."
    }
  };

  function applyLang(lang){
    const d = dict[lang] || dict.ru;
    document.documentElement.setAttribute("data-lang", lang);
    $$("[data-i18n]").forEach(el=>{
      const k = el.getAttribute("data-i18n");
      if (d[k]) el.textContent = d[k];
    });
    // update segmented pill position
    setLangPill(lang);
  }

  function setLangPill(lang){
    const pill = $(".seg-pill");
    const buttons = $$("[data-lang-btn]");
    const idx = Math.max(0, buttons.findIndex(b => b.dataset.langBtn === lang));
    pill.style.transform = `translateX(${idx * (buttons[0].offsetWidth + 6)}px)`;
    buttons.forEach(b => b.classList.toggle("active", b.dataset.langBtn === lang));
  }

  // ========= Theme =========
  function setTheme(theme){
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("bs_theme", theme);
  }

  // ========= FAQ smooth toggle =========
  function initFAQ(){
    $$(".faq-item .faq-q").forEach(btn=>{
      btn.addEventListener("click", ()=>{
        const item = btn.closest(".faq-item");
        const open = item.classList.toggle("open");
        // close others for nicer UX
        if(open){
          $$(".faq-item.open").forEach(other=>{
            if(other !== item) other.classList.remove("open");
          });
        }
      }, {passive:true});
    });
  }

  // ========= Service chips =========
  function initChips(){
    const hidden = $("#serviceHidden");
    $$("#serviceChips .seg-chip").forEach(btn=>{
      btn.addEventListener("click", ()=>{
        $$("#serviceChips .seg-chip").forEach(b=>b.classList.remove("active"));
        btn.classList.add("active");
        hidden.value = btn.dataset.val || "install";
      });
    });
  }

  // ========= Request -> open WA / TG with prepared text =========
  function buildMsg(){
    const lang = document.documentElement.getAttribute("data-lang") || "ru";
    const d = dict[lang] || dict.ru;

    const name = ($("#nameInput").value || "").trim();
    const phone = ($("#phoneInput").value || "").trim();
    const service = ($("#serviceHidden").value || "").trim();
    const comment = ($("#commentInput").value || "").trim();

    // map service keys to localized titles
    const serviceTitle = ({
      install: d.sInstall, clean: d.sClean, repair: d.sRepair, freon: d.sFreon, diag: d.sDiag
    })[service] || d.sInstall;

    let msg = `BreezeService — ${d.reqH}\n`;
    if(name) msg += `${d.name}: ${name}\n`;
    if(phone) msg += `${d.phone}: ${phone}\n`;
    msg += `${d.service}: ${serviceTitle}\n`;
    if(comment) msg += `${d.comment}: ${comment}\n`;
    return msg;
  }

  function initRequestButtons(){
    const waBtn = $("#sendWA");
    const tgBtn = $("#sendTG");

    waBtn.addEventListener("click", ()=>{
      const msg = encodeURIComponent(buildMsg());
      // wa.me works best in mobile/instagram browser
      window.open(`https://wa.me/998910094469?text=${msg}`, "_blank", "noopener");
    });

    tgBtn.addEventListener("click", ()=>{
      // direct chat link is your t.me; we also copy text into clipboard if possible
      const msg = buildMsg();
      try { navigator.clipboard.writeText(msg); } catch(e) {}
      window.open(`https://t.me/breezeserv1se`, "_blank", "noopener");
    });
  }

  // ========= Smooth anchor scroll =========
  function initSmoothScroll(){
    $$('a[href^="#"]').forEach(a=>{
      a.addEventListener("click",(e)=>{
        const id = a.getAttribute("href");
        if(!id || id === "#") return;
        const target = document.querySelector(id);
        if(!target) return;
        e.preventDefault();
        target.scrollIntoView({behavior:"smooth", block:"start"});
        history.replaceState(null,"",id);
      });
    });
  }

  // ========= Air flow paths between tiles (snake left->right) =========
  function buildFlow(){
    const svg = $("#flowLayer");
    if(!svg) return;

    // nodes: hero panel -> tiles in DOM order -> pricing -> faq -> request (snake)
    const nodes = $$("[data-flow-node]");
    if(nodes.length < 2) return;

    // SVG setup
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    svg.setAttribute("viewBox", `0 0 ${vw} ${vh}`);
    svg.innerHTML = "";

    // helper to get center points in viewport coords
    const pt = (el) => {
      const r = el.getBoundingClientRect();
      return {
        x: r.left + r.width/2,
        y: r.top + r.height/2
      };
    };

    // Create chained paths: each panel gets one in/out (a single chain)
    // snake: left->right wiggle in each segment
    function snakePath(a, b, i){
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const mx = a.x + dx * 0.5;
      const amp = Math.min(80, Math.max(28, Math.abs(dx)*0.15 + 22));
      const sign = (i % 2 === 0) ? 1 : -1;
      const c1x = a.x + dx * 0.25;
      const c1y = a.y + dy * 0.10 + sign * amp;
      const c2x = a.x + dx * 0.75;
      const c2y = a.y + dy * 0.90 - sign * amp;
      return `M ${a.x} ${a.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${b.x} ${b.y}`;
    }

    // build segments, but only connect visible-ish nodes to avoid crazy lines on small screens
    const points = nodes.map(pt);
    for(let i=0;i<points.length-1;i++){
      const a = points[i], b = points[i+1];

      // skip if both are far outside viewport (performance)
      if((a.y < -200 && b.y < -200) || (a.y > vh+200 && b.y > vh+200)) continue;

      const d = snakePath(a, b, i);

      // glow (RGB edge, outside)
      const glow = document.createElementNS("http://www.w3.org/2000/svg","path");
      glow.setAttribute("d", d);
      glow.setAttribute("class","flow-glow");
      glow.setAttribute("stroke", "url(#flowRGB)");
      svg.appendChild(glow);

      // base path
      const base = document.createElementNS("http://www.w3.org/2000/svg","path");
      base.setAttribute("d", d);
      base.setAttribute("class","flow-path");
      base.setAttribute("stroke", "rgba(95,169,201,.32)");
      svg.appendChild(base);

      // moving dashes (air particles)
      const dash = document.createElementNS("http://www.w3.org/2000/svg","path");
      dash.setAttribute("d", d);
      dash.setAttribute("class","flow-dash");
      svg.appendChild(dash);
    }

    // defs for RGB gradient (outside glow)
    const defs = document.createElementNS("http://www.w3.org/2000/svg","defs");
    defs.innerHTML = `
      <linearGradient id="flowRGB" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%"  stop-color="rgba(255,0,140,.55)"/>
        <stop offset="30%" stop-color="rgba(0,180,255,.55)"/>
        <stop offset="60%" stop-color="rgba(0,255,170,.45)"/>
        <stop offset="85%" stop-color="rgba(255,200,0,.40)"/>
        <stop offset="100%" stop-color="rgba(255,0,140,.55)"/>
      </linearGradient>
    `;
    svg.prepend(defs);
  }

  // rebuild flow on resize/scroll (throttled)
  function throttle(fn, wait=120){
    let t=0, raf=0;
    return (...args)=>{
      const now = Date.now();
      if(now - t >= wait){
        t = now;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(()=>fn(...args));
      }
    };
  }

  // ========= Init =========
  function init(){
    // year
    $("#year").textContent = String(new Date().getFullYear());

    // default theme
    const savedTheme = localStorage.getItem("bs_theme");
    if(savedTheme){
      setTheme(savedTheme);
    } else {
      // if system prefers dark
      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }

    // theme toggle
    $("#themeToggle").addEventListener("click", ()=>{
      const cur = document.documentElement.getAttribute("data-theme") || "light";
      setTheme(cur === "light" ? "dark" : "light");
    });

    // language default
    const savedLang = localStorage.getItem("bs_lang") || "ru";
    applyLang(savedLang);

    // language buttons
    $$("[data-lang-btn]").forEach(btn=>{
      btn.addEventListener("click", ()=>{
        const lang = btn.dataset.langBtn;
        localStorage.setItem("bs_lang", lang);
        applyLang(lang);
      }, {passive:true});
    });

    initFAQ();
    initChips();
    initRequestButtons();
    initSmoothScroll();

    // initial flow + updates
    const rebuild = throttle(buildFlow, 140);
    buildFlow();
    window.addEventListener("resize", rebuild, {passive:true});
    window.addEventListener("scroll", rebuild, {passive:true});

    // also rebuild after fonts/images settle
    setTimeout(buildFlow, 350);
    setTimeout(buildFlow, 900);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
