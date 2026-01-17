(() => {
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

  // ===== i18n (текст НЕ трогал; этот словарь как был) =====
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
      noteText:"Before the visit you always get a phone consultation.",
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
    setLangPill(lang);
  }

  function setLangPill(lang){
    const pill = $(".seg-pill");
    const buttons = $$("[data-lang-btn]");
    const idx = Math.max(0, buttons.findIndex(b => b.dataset.langBtn === lang));
    const w = buttons[0]?.offsetWidth || 44;
    pill.style.transform = `translateX(${idx * (w + 6)}px)`;
    buttons.forEach(b => b.classList.toggle("active", b.dataset.langBtn === lang));
  }

  function setTheme(theme){
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("bs_theme", theme);
  }

  function init
