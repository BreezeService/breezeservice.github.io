// config.js
window.SITE_CONFIG = {
  phone: "+998910094469",
  phonePretty: "+998 91 009 44 69",
  hours: "10:00–18:00",
  areas: "Ташкент",
  telegramUrl: "https://t.me/breezeserv1se",
  whatsappUrl: "https://wa.me/998910094469",
  instagramUrl: "https://instagram.com/breezeservise.uz",

  servicesOptions: {
    ru: ["Установка", "Демонтаж", "Чистка", "Заправка фреоном", "Диагностика", "Ремонт", "Профилактика", "Крупный объект"],
    en: ["Installation", "Dismantling", "Cleaning", "Freon refill", "Diagnostics", "Repair", "Maintenance", "Large объект"],
    uz: ["O‘rnatish", "Demontaj", "Tozalash", "Freon to‘ldirish", "Diagnostika", "Ta’mirlash", "Profilaktika", "Yirik obyekt"]
  },

  i18n: {
    ru: {
      brandName: "BreezeService",
      brandSub: "Сервис кондиционеров • Ташкент",

      ui: { theme: "Тема" },

      nav: { services:"Услуги", pricing:"Цены", faq:"FAQ", request:"Заявка" },

      cta: { call:"📞 Позвонить", request:"✨ Заявка" },

      social: { telegram:"Telegram", whatsapp:"WhatsApp", instagram:"Instagram" },

      hero: {
        kicker: "ТАШКЕНТ • КЛИМАТ-СЕРВИС",
        title: "BreezeService — сервис кондиционеров в Ташкенте",
        lead: "Помогаем частным клиентам и объектам любого масштаба: от чистки до установки и ремонта. Один звонок — консультация — выезд мастера без лишних сложностей.",
        pills: ["Установка", "Чистка", "Ремонт", "Заправка фреоном", "Диагностика"],
        badge1: "Гарантия на установку — 1 год",
        badge2: "Оплата по факту выполненной работы",
        fromPriceTitle: "Стоимость",
        fromPrice: "Стоимость не фиксирована — зависит от задач",
        priceNote: "Перед выездом всегда даём предварительную консультацию по телефону."
      },

      popular: [
        { title: "Установка", text: "Аккуратный монтаж и запуск" },
        { title: "Чистка", text: "Глубокая чистка блоков" },
        { title: "Ремонт/Диагностика", text: "Не холодит / шумит / капает" }
      ],

      services: {
        title: "Чем мы занимаемся",
        lead: "Полный спектр услуг по кондиционерам — бытовым и полупромышленным. Работаем со всеми марками и моделями.",
        lists: [
          {
            title: "Работы",
            items: [
              { b:"Установка", s:"Монтаж сплит-систем" },
              { b:"Демонтаж", s:"Аккуратно и безопасно" },
              { b:"Чистка", s:"Внутренние и наружные блоки" },
              { b:"Заправка фреоном", s:"По состоянию системы" }
            ]
          },
          {
            title: "Диагностика и сервис",
            items: [
              { b:"Диагностика", s:"Поиск причин неисправностей" },
              { b:"Ремонт", s:"Устранение неполадок" },
              { b:"Профилактика", s:"Регулярное обслуживание" },
              { b:"Крупные объекты", s:"Офисы/магазины/несколько кондиционеров" }
            ]
          }
        ],
        note: "Важно: стоимость не фиксирована и зависит от сложности, количества кондиционеров и условий монтажа."
      },

      pricing: {
        title: "Цены",
        lead: "Даем ориентир, но точная стоимость зависит от объёма и условий. Всегда согласуем цену до начала работ.",
        cards: [
          { tag:"Оценка", title:"Предварительно", text:"Скажем примерную стоимость по телефону", cost:"Бесплатно", bullets:["Короткие вопросы","Понимание объёма","Подбор решения"] },
          { tag:"Выезд", title:"Мастер на объект", text:"Осмотр и финальная оценка на месте", cost:"По договорённости", bullets:["Осмотр","Смета/согласование","Начало работ"] },
          { tag:"Объект", title:"Крупные проекты", text:"Несколько мастеров и сроки под объект", cost:"Смета", bullets:["Предварительная оценка","Смета","Согласованные сроки"] }
        ],
        note: "Чтобы узнать стоимость быстрее — оставь заявку, мы ответим максимально быстро."
      },

      faq: {
        title: "FAQ",
        lead: "Гарантии и частые вопросы.",
        items: [
          { q:"Какая гарантия?", a:"Гарантия на установку — 1 год. На другие работы гарантию предоставляет мастер, выполнявший заказ." },
          { q:"Как формируется цена?", a:"Зависит от сложности, количества кондиционеров, условий монтажа и состояния оборудования. Перед выездом даём предварительную консультацию." },
          { q:"Работаете с крупными объектами?", a:"Да. Офисы, магазины, коммерческие помещения, частные дома с несколькими кондиционерами. Делаем оценку, смету и при необходимости выезжаем несколькими мастерами." }
        ]
      },

      contact: {
        title: "Заявка",
        lead: "Заполни форму — откроем мессенджер с готовым текстом.",
        boxTitle: "Контакты",
        boxLead: "Мы на связи и стараемся подобрать удобное время для выезда мастера.",
        phone: "Телефон",
        hours: "Звонки",
        hoursValue: "с 10:00 до 18:00",
        area: "География",
        areaValue: "Ташкент • выезд за город до 1–2 км по договорённости",
        badges: ["Быстрый отклик", "Проверенные мастера", "Без навязывания услуг"]
      },

      form: {
        name: "Имя",
        phone: "Телефон",
        service: "Услуга",
        comment: "Комментарий",
        sendWhatsapp: "Отправить в WhatsApp",
        sendTelegram: "Отправить в Telegram",
        hint: "Нажми — откроется мессенджер с готовым текстом."
      },

      footer: { up: "Наверх" }
    },

    en: {
      brandName: "BreezeService",
      brandSub: "AC service • Tashkent",

      ui: { theme: "Theme" },
      nav: { services:"Services", pricing:"Pricing", faq:"FAQ", request:"Request" },
      cta: { call:"📞 Call", request:"✨ Request" },
      social: { telegram:"Telegram", whatsapp:"WhatsApp", instagram:"Instagram" },

      hero: {
        kicker: "TASHKENT • CLIMATE SERVICE",
        title: "BreezeService — AC service in Tashkent",
        lead: "We help private clients and projects of any scale: from cleaning to installation and repair. One call — clear consultation — technician visit with no hassle.",
        pills: ["Installation", "Cleaning", "Repair", "Freon refill", "Diagnostics"],
        badge1: "Installation warranty — 1 year",
        badge2: "Pay after the work is done",
        fromPriceTitle: "Price",
        fromPrice: "Price depends on the task",
        priceNote: "We always give a quick phone consultation before visiting."
      },

      popular: [
        { title: "Installation", text: "Clean mounting & start-up" },
        { title: "Cleaning", text: "Deep cleaning of units" },
        { title: "Repair/Diagnostics", text: "No cooling / noise / leaks" }
      ],

      services: {
        title: "What we do",
        lead: "Full AC service range — home and semi-industrial. We work with all brands and models.",
        lists: [
          {
            title: "Works",
            items: [
              { b:"Installation", s:"Split system mounting" },
              { b:"Dismantling", s:"Safe and careful" },
              { b:"Cleaning", s:"Indoor and outdoor units" },
              { b:"Freon refill", s:"Based on system condition" }
            ]
          },
          {
            title: "Diagnostics & service",
            items: [
              { b:"Diagnostics", s:"Find the cause" },
              { b:"Repair", s:"Fix issues" },
              { b:"Maintenance", s:"Preventive service" },
              { b:"Large sites", s:"Offices/shops/multiple units" }
            ]
          }
        ],
        note: "Note: pricing depends on complexity, number of units and installation conditions."
      },

      pricing: {
        title: "Pricing",
        lead: "We give a guideline, but final price depends on conditions. We confirm before we start.",
        cards: [
          { tag:"Estimate", title:"Phone estimate", text:"Quick estimate by phone", cost:"Free", bullets:["Short questions","Scope understanding","Solution choice"] },
          { tag:"Visit", title:"Technician visit", text:"On-site check and final estimate", cost:"By agreement", bullets:["Inspection","Estimate approval","Start work"] },
          { tag:"Project", title:"Large projects", text:"Multiple technicians, scheduled timeline", cost:"Quote", bullets:["Pre-assessment","Quote","Agreed schedule"] }
        ],
        note: "Want it faster? Send a request — we reply quickly."
      },

      faq: {
        title: "FAQ",
        lead: "Warranty and common questions.",
        items: [
          { q:"What warranty do you provide?", a:"Installation warranty is 1 year. Other works are covered by the technician who performed the job." },
          { q:"How is the price calculated?", a:"It depends on complexity, number of units, installation conditions and equipment condition. We consult by phone before visiting." },
          { q:"Do you work with large sites?", a:"Yes — offices, shops, commercial spaces, houses with multiple AC units. We do assessment, quote and can send multiple technicians." }
        ]
      },

      contact: {
        title: "Request",
        lead: "Fill the form — we’ll open messenger with a ready text.",
        boxTitle: "Contacts",
        boxLead: "We answer quickly and try to find a convenient time.",
        phone: "Phone",
        hours: "Calls",
        hoursValue: "10:00–18:00",
        area: "Area",
        areaValue: "Tashkent • outside city up to 1–2 km by agreement",
        badges: ["Fast response", "Verified technicians", "No upselling"]
      },

      form: {
        name: "Name",
        phone: "Phone",
        service: "Service",
        comment: "Comment",
        sendWhatsapp: "Send via WhatsApp",
        sendTelegram: "Send via Telegram",
        hint: "Tap — messenger opens with ready message."
      },

      footer: { up: "Up" }
    },

    uz: {
      brandName: "BreezeService",
      brandSub: "Konditsioner servisi • Toshkent",

      ui: { theme: "Mavzu" },
      nav: { services:"Xizmatlar", pricing:"Narxlar", faq:"FAQ", request:"Ariza" },
      cta: { call:"📞 Qo‘ng‘iroq", request:"✨ Ariza" },
      social: { telegram:"Telegram", whatsapp:"WhatsApp", instagram:"Instagram" },

      hero: {
        kicker: "TOSHKENT • IQLIM SERVIS",
        title: "BreezeService — Toshkentda konditsioner servisi",
        lead: "Xususiy mijozlar va yirik obyektlarga yordam beramiz: tozalashdan tortib o‘rnatish va ta’mirlashgacha. Bitta qo‘ng‘iroq — maslahat — usta keladi.",
        pills: ["O‘rnatish", "Tozalash", "Ta’mirlash", "Freon", "Diagnostika"],
        badge1: "O‘rnatishga kafolat — 1 yil",
        badge2: "To‘lov ish tugagach",
        fromPriceTitle: "Narx",
        fromPrice: "Narx ishga bog‘liq",
        priceNote: "Kelishdan oldin telefon orqali qisqa maslahat beramiz."
      },

      popular: [
        { title: "O‘rnatish", text: "Toza va aniq montaj" },
        { title: "Tozalash", text: "Chuqur tozalash" },
        { title: "Ta’mir/Diagnostika", text: "Sovutmaydi / shovqin / tomchi" }
      ],

      services: {
        title: "Biz nima qilamiz",
        lead: "Barcha turdagi konditsionerlar bilan ishlaymiz — maishiy va yarim sanoat.",
        lists: [
          {
            title: "Ishlar",
            items: [
              { b:"O‘rnatish", s:"Split tizim montaji" },
              { b:"Demontaj", s:"Xavfsiz va ehtiyotkor" },
              { b:"Tozalash", s:"Ichki va tashqi blok" },
              { b:"Freon to‘ldirish", s:"Tizim holatiga qarab" }
            ]
          },
          {
            title: "Servis",
            items: [
              { b:"Diagnostika", s:"Muammo sababini topish" },
              { b:"Ta’mirlash", s:"Nosozlikni bartaraf etish" },
              { b:"Profilaktika", s:"Doimiy xizmat" },
              { b:"Yirik obyekt", s:"Ofis/do‘kon/ko‘p konditsioner" }
            ]
          }
        ],
        note: "Eslatma: narx ish murakkabligi va sharoitga bog‘liq."
      },

      pricing: {
        title: "Narxlar",
        lead: "Taxminiy narx aytamiz, yakuniy narx — sharoitga qarab. Ishdan oldin kelishamiz.",
        cards: [
          { tag:"Baholash", title:"Telefon orqali", text:"Qisqa savollar va taxminiy narx", cost:"Bepul", bullets:["Savollar","Hajmni tushunish","Yechim tanlash"] },
          { tag:"Usta", title:"Obyektga kelish", text:"Joyida ko‘rish va yakuniy baho", cost:"Kelishuv", bullets:["Ko‘rik","Smeta","Ishni boshlash"] },
          { tag:"Loyiha", title:"Yirik loyiha", text:"Bir nechta usta va muddat", cost:"Smeta", bullets:["Baholash","Smeta","Kelishilgan muddat"] }
        ],
        note: "Tezroq bilmoqchimisiz? Ariza qoldiring — tez javob beramiz."
      },

      faq: {
        title: "FAQ",
        lead: "Kafolat va savollar.",
        items: [
          { q:"Kafolat bormi?", a:"O‘rnatishga 1 yil kafolat. Boshqa ishlar — ishni bajargan usta kafolati." },
          { q:"Narx qanday hisoblanadi?", a:"Ish murakkabligi, konditsioner soni va sharoitga bog‘liq. Kelishdan oldin telefon orqali maslahat beramiz." },
          { q:"Yirik obyektlar bilan ishlaysizmi?", a:"Ha. Ofislar, do‘konlar, tijorat joylari. Baholash, smeta va kerak bo‘lsa bir nechta usta." }
        ]
      },

      contact: {
        title: "Ariza",
        lead: "Formani to‘ldiring — messenger tayyor matn bilan ochiladi.",
        boxTitle: "Kontaktlar",
        boxLead: "Tez javob beramiz va qulay vaqtni tanlaymiz.",
        phone: "Telefon",
        hours: "Qo‘ng‘iroqlar",
        hoursValue: "10:00–18:00",
        area: "Hudud",
        areaValue: "Toshkent • shahar tashqarisi 1–2 km kelishuv bilan",
        badges: ["Tez javob", "Tekshirilgan ustalar", "Majburlab xizmat yo‘q"]
      },

      form: {
        name: "Ism",
        phone: "Telefon",
        service: "Xizmat",
        comment: "Izoh",
        sendWhatsapp: "WhatsApp orqali yuborish",
        sendTelegram: "Telegram orqali yuborish",
        hint: "Bos — messenger tayyor matn bilan ochiladi."
      },

      footer: { up: "Yuqoriga" }
    }
  }
};
