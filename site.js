(() => {
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

  // ====== basic
  $("#year").textContent = String(new Date().getFullYear());

  // smooth anchors
  $$('a[href^="#"]').forEach(a=>{
    a.addEventListener("click", (e)=>{
      const id = a.getAttribute("href");
      if(!id || id === "#") return;
      const el = document.querySelector(id);
      if(!el) return;
      e.preventDefault();
      el.scrollIntoView({behavior:"smooth", block:"start"});
      history.replaceState(null,"",id);
    }, {passive:false});
  });

  // FAQ smooth
  $$(".faq-q").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const item = btn.closest(".faq-item");
      const now = item.classList.toggle("open");
      if(now){
        $$(".faq-item.open").forEach(x=>{ if(x!==item) x.classList.remove("open"); });
      }
    }, {passive:true});
  });

  // simple request -> opens WhatsApp with filled message
  const phoneRaw = (window.SITE_CONFIG?.phone || "+998910094469").replace(/\s+/g,"");
  const waNumber = phoneRaw.replace("+","");
  const tgLink = window.SITE_CONFIG?.telegram || "https://t.me/breezeserv1se";

  $("#sendRequest").addEventListener("click", ()=>{
    const name = ($("#name").value || "").trim();
    const phone = ($("#phone").value || "").trim();
    const text =
`BreezeServis — заявка
Имя: ${name || "-"}
Телефон: ${phone || "-"}
`;
    const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener");
  }, {passive:true});

  // ====== Airflow Canvas (true "fog ribbon" flow)
  const canvas = $("#airflow");
  const ctx = canvas.getContext("2d", { alpha:true, desynchronized:true });

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a,b,t) => a + (b-a)*t;

  let dpr = 1, W = 0, H = 0;
  let t = 0;
  let last = 0;

  // interaction boost (hover + scroll)
  const focus = { x: -9999, y: -9999, a: 0 };
  let scrollBoost = 0;

  function setFocusFromEl(el, strength=1){
    const r = el.getBoundingClientRect();
    focus.x = r.left + r.width/2;
    focus.y = r.top + r.height/2;
    focus.a = strength;
  }

  // Hover on any glass panel boosts air locally
  const hoverables = $$(".glass");
  hoverables.forEach(el=>{
    el.addEventListener("pointerenter", ()=> setFocusFromEl(el, 1), {passive:true});
    el.addEventListener("pointerleave", ()=> { focus.a = 0; }, {passive:true});
  });

  window.addEventListener("scroll", ()=>{ scrollBoost = 1; }, {passive:true});

  function resize(){
    const cap = clamp(window.devicePixelRatio || 1, 1, 1.6);
    const w = Math.floor(window.innerWidth);
    const h = Math.floor(window.innerHeight);
    if(w === W && h === H && cap === dpr) return;

    dpr = cap; W = w; H = h;
    canvas.width = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }
  window.addEventListener("resize", resize, {passive:true});
  resize();

  function nodeCenter(sel){
    const el = $(sel);
    if(!el) return null;
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width/2, y: r.top + r.height/2 };
  }

  // Build flow route: logo/nav -> form -> services row -> footer
  function buildRoute(){
    // Use data-node anchors
    const nav = $('[data-node="nav"]');
    const form = $('[data-node="form"]');
    const services = $('[data-node="services"]');
    const footer = $('[data-node="footer"]');
    if(!nav || !form || !services || !footer) return null;

    const c = (el)=> {
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width/2, y: r.top + r.height/2 };
    };

    const pNav = c(nav);
    const pForm = c(form);
    const pServices = c(services);
    const pFooter = c(footer);

    const start = { x: -120, y: pNav.y - 20 };
    const end = { x: W + 120, y: pFooter.y + 110 };

    return [start, pNav, pForm, pServices, pFooter, end];
  }

  function bezierHandles(a, b, i, amp){
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const sign = (i % 2 === 0) ? 1 : -1;

    return {
      c1: { x: a.x + dx*0.30, y: a.y + dy*0.12 + sign*amp },
      c2: { x: a.x + dx*0.72, y: a.y + dy*0.88 - sign*amp },
    };
  }

  // Draw "fog ribbon": wide mist + inner core + ultra-soft particles
  function drawRibbon(a, b, i, strength){
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const dist = Math.hypot(dx, dy);

    const amp = clamp(dist * 0.12, 18, 90);
    const { c1, c2 } = bezierHandles(a, b, i, amp);

    // Gradient along flow
    const g = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
    const breathe = 0.55 + 0.06*Math.sin(t*0.10 + i*0.6);
    const a1 = 0.10*strength;
    const a2 = 0.18*strength;

    g.addColorStop(0,   `rgba(255,255,255,${a1})`);
    g.addColorStop(breathe, `rgba(127,211,255,${a2})`);
    g.addColorStop(1,   `rgba(95,169,201,${a1})`);

    // Pass 1: wide soft fog band
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = g;

    const baseW = clamp(40 + dist*0.02, 38, 70);
    const wobble = 1 + 0.06*Math.sin(t*0.22 + i*1.1);
    ctx.lineWidth = baseW * wobble;

    ctx.shadowColor = `rgba(127,211,255,${0.22*strength})`;
    ctx.shadowBlur = 26;

    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.bezierCurveTo(c1.x, c1.y, c2.x, c2.y, b.x, b.y);
    ctx.stroke();

    // Pass 2: inner subtle core (still foggy, not neon)
    const g2 = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
    g2.addColorStop(0, `rgba(255,255,255,${0.12*strength})`);
    g2.addColorStop(0.5, `rgba(160,235,255,${0.20*strength})`);
    g2.addColorStop(1, `rgba(255,255,255,${0.10*strength})`);

    ctx.strokeStyle = g2;
    ctx.lineWidth = clamp(baseW*0.34, 10, 22);
    ctx.shadowBlur = 18;

    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.bezierCurveTo(c1.x, c1.y, c2.x, c2.y, b.x, b.y);
    ctx.stroke();

    // Pass 3: ultra-soft drifting particles (almost invisible)
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 0.5;
    ctx.strokeStyle = `rgba(255,255,255,${0.14*strength})`;
    ctx.lineWidth = 2.4;
    ctx.setLineDash([16, 26]);
    ctx.lineDashOffset = -(t*18 + i*14);

    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.bezierCurveTo(c1.x, c1.y, c2.x, c2.y, b.x, b.y);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.restore();
  }

  function clearSoft(){
    // soft fade overlay (prevents harsh flicker, feels “breathing”)
    ctx.save();
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "rgba(247,251,255,0.18)";
    ctx.fillRect(0,0,W,H);
    ctx.restore();
  }

  function frame(ts){
    if(!last) last = ts;
    const dt = Math.min(64, ts - last);
    last = ts;
    t += dt * 0.001;

    // mobile perf: ~30fps
    const skip = (W < 720) ? 2 : 1;
    if(((ts/16)|0) % skip !== 0){
      requestAnimationFrame(frame);
      return;
    }

    // ease interaction
    scrollBoost = Math.max(0, scrollBoost - dt*0.002);
    focus.a = Math.max(0, focus.a - dt*0.0018);

    resize();
    clearSoft();

    const route = buildRoute();
    if(route && route.length > 1){
      const base = 0.9 + 0.08*Math.sin(t*0.22);

      for(let i=0;i<route.length-1;i++){
        const a = route[i], b = route[i+1];

        // local boost near focused panel
        let boost = 1;
        if(focus.a > 0 || scrollBoost > 0){
          const mx = (a.x + b.x)/2;
          const my = (a.y + b.y)/2;
          const d = Math.hypot(mx - focus.x, my - focus.y);
          const local = (1 - clamp(d/520, 0, 1));
          boost += (0.55*focus.a + 0.25*scrollBoost) * local;
        }

        drawRibbon(a, b, i, base*boost);
      }
    }

    // gentle screen blend vignette (keeps it airy)
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    const vg = ctx.createRadialGradient(W*0.5, H*0.45, W*0.06, W*0.5, H*0.45, W*0.74);
    vg.addColorStop(0, "rgba(255,255,255,0)");
    vg.addColorStop(1, "rgba(255,255,255,0.40)");
    ctx.fillStyle = vg;
    ctx.fillRect(0,0,W,H);
    ctx.restore();

    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
})();
