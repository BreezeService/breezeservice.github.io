// config.js (v3)
window.SITE_CONFIG = {
  phoneRaw: "+998910094469",
  phonePretty: "+998 91 009 44 69",

  telegramLink: "https://t.me/breezeserv1se",
  whatsappLink: "https://wa.me/998910094469",
  instagramLink: "https://instagram.com/breezeservise.uz",

  services: [
    { key: "install",  ru: "Установка", en: "Installation", uz: "O‘rnatish" },
    { key: "clean",    ru: "Чистка", en: "Cleaning", uz: "Tozalash" },
    { key: "repair",   ru: "Ремонт", en: "Repair", uz: "Ta’mirlash" },
    { key: "freon",    ru: "Заправка фреоном", en: "Freon refill", uz: "Freon to‘ldirish" },
    { key: "diag",     ru: "Диагностика", en: "Diagnostics", uz: "Diagnostika" },
  ],

  faq: [
    {
      q: { ru: "Какая гарантия?", en: "What warranty do you provide?", uz: "Kafolat bormi?" },
      a: {
        ru: "Гарантия на установку — 1 год. На другие виды работ гарантию даёт мастер, который выполнял заказ.",
        en: "Installation comes with a 1-year warranty. Other services are covered by the technician who performed the work.",
        uz: "O‘rnatish uchun 1 yil kafolat. Boshqa ishlar bo‘yicha kafolatni ishni bajargan usta beradi."
      }
    },
    {
      q: { ru: "Как формируется цена?", en: "How is the price calculated?", uz: "Narx qanday belgilanadi?" },
      a: {
        ru: "Цена зависит от сложности, количества кондиционеров, условий монтажа и состояния оборудования. Перед выездом — консультация по телефону.",
        en: "The price depends on complexity, number of units, installation conditions and equipment condition. You get a phone estimate before dispatch.",
        uz: "Narx ish murakkabligi, konditsionerlar soni, o‘rnatish sharoiti va qurilma holatiga bog‘liq. Borishdan oldin telefon orqali maslahat beriladi."
      }
    },
    {
      q: { ru: "Работаете с крупными объектами?", en: "Do you work with large sites?", uz: "Yirik obyektlar bilan ishlaysizmi?" },
      a: {
        ru: "Да. Для офисов/магазинов/домов с несколькими кондиционерами делаем оценку, смету и при необходимости выезжает несколько мастеров.",
        en: "Yes. For offices/shops/houses with multiple units we provide an assessment, a quote, and can send multiple technicians if needed.",
        uz: "Ha. Ofis/do‘kon/uyda bir nechta konditsioner bo‘lsa, baholash va smeta qilamiz, kerak bo‘lsa bir nechta usta boradi."
      }
    }
  ],

  i18n: {
    ru: {
      brandName: "BreezeService",
      brandSub: "Сервис кондиционеров • Ташкент",
      theme: "Тема",
      call: "Позвонить",
      request: "Заявка",
      kicker: "ТАШКЕНТ • КЛИМАТ-СЕРВИС",
      heroTitle: "BreezeService — сервис кондиционеров в Ташкенте",
      heroLead: "Помогаем частным клиентам и объектам любого масштаба: от чистки до установки и ремонта. Один звонок — консультация — выезд мастера без лишних сложностей.",
      leaveRequest: "Оставить заявку",
      bullet1: "Гарантия на установку — 1 год",
      bullet2: "Оплата по факту выполненной работы",

      pricingTitle: "Стоимость",
      pricingLead: "Стоимость не фиксирована — зависит от сложности, количества кондиционеров и условий монтажа.",
      p1Title: "Установка",
      p1Text: "Аккуратный монтаж и запуск.",
      p1b1: "Подбор решения",
      p1b2: "Проверка запуска",
      p1b3: "Гарантия 1 год",
      p2Title: "Чистка",
      p2Text: "Для запаха и падения мощности.",
      p2b1: "Чистка блоков",
      p2b2: "Проверка работы",
      p2b3: "Рекомендации",
      p3Title: "Ремонт / Диагностика",
      p3Text: "Не холодит / шумит / капает.",
      p3b1: "Диагностика",
      p3b2: "Согласование цены",
      p3b3: "Ремонт по факту",
      noteTag: "Важно",
      noteText: "Перед выездом вы всегда получаете предварительную консультацию по телефону.",

      faqLead: "Гарантии и частые вопросы.",

      formTitle: "Заявка",
      formLead: "Заполни форму — откроем мессенджер с готовым текстом.",
      name: "Имя",
      phone: "Телефон",
      service: "Услуга",
      comment: "Комментарий",
      sendWA: "Отправить в WhatsApp",
      sendTG: "Отправить в Telegram",
      privacy: "Нажимая кнопку, вы откроете мессенджер с готовым сообщением (данные не отправляются на сервер).",

      contacts: "Контакты",
      hours: "График",
      hoursVal: "10:00–18:00",
      geo: "География",
      geoVal: "Ташкент • выезд за город 1–2 км",
      b1: "Быстрый отклик",
      b2: "Проверенные мастера",
      b3: "Честные условия",
      footerLine: "Сервис кондиционеров в Ташкенте"
    },

    en: {
      brandName: "BreezeService",
      brandSub: "AC service • Tashkent",
      theme: "Theme",
      call: "Call",
      request: "Request",
      kicker: "TASHKENT • CLIMATE SERVICE",
      heroTitle: "BreezeService — AC service in Tashkent",
      heroLead: "We help homes and sites of any scale: from cleaning to installation and repairs. One call — clear advice — technician visit without hassle.",
      leaveRequest: "Leave a request",
      bullet1: "Installation warranty — 1 year",
      bullet2: "Pay after the work is done",

      pricingTitle: "Pricing",
      pricingLead: "No fixed price — depends on complexity, number of units and installation conditions.",
      p1Title: "Installation",
      p1Text: "Clean installation and start-up.",
      p1b1: "Solution matching",
      p1b2: "Start-up check",
      p1b3: "1-year warranty",
      p2Title: "Cleaning",
      p2Text: "For smell and low performance.",
      p2b1: "Unit cleaning",
      p2b2: "Operation check",
      p2b3: "Recommendations",
      p3Title: "Repair / Diagnostics",
      p3Text: "Not cooling / noisy / leaking.",
      p3b1: "Diagnostics",
      p3b2: "Price approval",
      p3b3: "Repair after approval",
      noteTag: "Important",
      noteText: "Before dispatch you always get a phone consultation.",

      faqLead: "Warranty & common questions.",

      formTitle: "Request",
      formLead: "Fill the form — we’ll open messenger with a ready text.",
      name: "Name",
      phone: "Phone",
      service: "Service",
      comment: "Comment",
      sendWA: "Send via WhatsApp",
      sendTG: "Send via Telegram",
      privacy: "By clicking, you open a messenger with a pre-filled message (no server submission).",

      contacts: "Contacts",
      hours: "Hours",
      hoursVal: "10:00–18:00",
      geo: "Area",
      geoVal: "Tashkent • 1–2 km outside city on request",
      b1: "Fast response",
      b2: "Trusted techs",
      b3: "Fair terms",
      footerLine: "AC service in Tashkent"
    },

    uz: {
      brandName: "BreezeService",
      brandSub: "Konditsioner servisi • Toshkent",
      theme: "Mavzu",
      call: "Qo‘ng‘iroq",
      request: "Ariza",
      kicker: "TOSHKENT • KLIMAT SERVIS",
      heroTitle: "BreezeService — Toshkentda konditsioner servisi",
      heroLead: "Xususiy mijozlar va yirik obyektlarga yordam beramiz: tozalashdan o‘rnatish va ta’mirlashgacha. Bitta qo‘ng‘iroq — maslahat — usta keladi.",
      leaveRequest: "Ariza qoldirish",
      bullet1: "O‘rnatishga kafolat — 1 yil",
      bullet2: "Ish tugagach to‘lov",

      pricingTitle: "Narx",
      pricingLead: "Aniq narx yo‘q — ish murakkabligi, soni va o‘rnatish sharoitiga bog‘liq.",
      p1Title: "O‘rnatish",
      p1Text: "Toza o‘rnatish va ishga tushirish.",
      p1b1: "Ye­chim tanlash",
      p1b2: "Ishga tushirish tekshiruvi",
      p1b3: "1 yil kafolat",
      p2Title: "Tozalash",
      p2Text: "Hid va kuch pasayishi uchun.",
      p2b1: "Bloklarni tozalash",
      p2b2: "Ishlashni tekshirish",
      p2b3: "Tavsiyalar",
      p3Title: "Ta’mir / Diagnostika",
      p3Text: "Sovutmaydi / shovqin / tomchilaydi.",
      p3b1: "Diagnostika",
      p3b2: "Narx kelishuvi",
      p3b3: "Kelishib ta’mirlash",
      noteTag: "Muhim",
      noteText: "Borishdan oldin telefon orqali maslahat beriladi.",

      faqLead: "Kafolat va savollar.",

      formTitle: "Ariza",
      formLead: "Formani to‘ldiring — messengerda tayyor matn ochiladi.",
      name: "Ism",
      phone: "Telefon",
      service: "Xizmat",
      comment: "Izoh",
      sendWA: "WhatsApp orqali",
      sendTG: "Telegram orqali",
      privacy: "Bosganda messenger tayyor matn bilan ochiladi (serverga yuborilmaydi).",

      contacts: "Kontaktlar",
      hours: "Vaqt",
      hoursVal: "10:00–18:00",
      geo: "Hudud",
      geoVal: "Toshkent • shahar tashqarisi 1–2 km",
      b1: "Tez javob",
      b2: "Ishonchli ustalar",
      b3: "Halol shartlar",
      footerLine: "Toshkentda konditsioner servisi"
    }
  }
};
