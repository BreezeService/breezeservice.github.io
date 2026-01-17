(() => {
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

  // ===== Utils
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a,b,t) => a + (b-a)*t;

  // Smooth scroll for anchors (soft iOS)
  function initSmoothAnchors(){
    $$('a[href^="#"]').forEach(a=>{
      a.addEventListener("click",(e)=>{
        const id = a.getAttribute("href");
        if(!id || id === "#") return;
        const el = document.querySelector(id);
        if(!el) return;
        e.preventDefault();
        el.scrollIntoView({behavior:"smooth", block:"start"});
        history.replaceState(null,"",id);
      }, {passive:false});
    });
  }

  // FAQ smooth open
  function initFAQ(){
    $$(".faq-item .faq-q").forEach(btn=>{
      btn.addEventListener("click", ()=>{
        const item = btn.closest(".faq-item");
        const isOpen = item.classList.toggle("open");
        if(isOpen){
          $$(".faq-item.open").forEach(other=>{
            if(other !== item) other.classList.remove("open");
          });
        }
      }, {passive:true});
    });
  }

  // Leads -> WA/TG
  function initLeads(){
    const phone = (window.SITE_CONFIG?.phone || "+998910094469").replace(/\s+/g,"");
    const tg = window.SITE_CONFIG?.telegram || "https://t.me/breezeserv1se";
    const waNumber = phone.replace("+","");

    const buildMsg = () => {
      const name = ($("#name").value || "").trim();
      const ph = ($("#phone").value || "").trim();
      const msg = ($("#msg").value || "").trim();
      let out = `BreezeService — Заявка\n`;
      if(name) out += `Имя: ${name}\n`;
      if(ph) out += `Телефон: ${ph}\n`;
      if(msg) out += `Сообщение: ${msg}\n`;
      return out;
    };

    $("#sendWA").addEventListener("click", ()=>{
      const txt = encodeURIComponent(buildMsg());
      window.open(`https://wa.me/${waNumber}?text=${txt}`, "_blank", "noopener");
    });

    $("#sendTG").addEventListener("click", async ()=>{
      const txt = buildMsg();
      try { await navigator.clipboard.writeText(txt); } catch(e) {}
      window.open(tg, "_blank", "noopener");
    });
  }

  // ===== Airflow Canvas (the "real air flow")
  function AirflowCanvas(canvas){
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d", { alpha:true, desynchronized:true });

    this.dpr = 1;
    this.w = 0;
    this.h = 0;

    // animation state
    this.t = 0;
    this.last = 0;

    // hover react
    this.focus = { x: -9999, y: -9999, a: 0 }; // a = intensity
    this.scrollBoost = 0;

    this.nodes = [];
    this.paths = [];

    this.resize = this.resize.bind(this);
    this.tick = this.tick.bind(this);
    this.rebuild = this.rebuild.bind(this);

    // light performance: cap DPR
    const capDPR = () => clamp(window.devicePixelRatio || 1, 1, 1.6);
    this.getDPR = capDPR;

    // events
    window.addEventListener("resize", this.resize, {passive:true});
    window.addEventListener("scroll", () => { this.scrollBoost = 1; }, {passive:true});

    // hover: panels and tiles boost flow nearby
    const hoverables = $$(".panel, .tile, .chip, .card, .faq-item, .contact-card");
    hoverables.forEach(el=>{
      el.addEventListener("pointerenter", (e)=>{
        const r = el.getBoundingClientRect();
        this.focus.x = r.left + r.width/2;
        this.focus.y = r.top + r.height/2;
        this.focus.a = 1;
      }, {passive:true});
      el.addEventListener("pointerleave", ()=>{
        this.focus.a = 0;
      }, {passive:true});
    });

    this.resize();
    this.rebuild();
    requestAnimationFrame(this.tick);
  }

  AirflowCanvas.prototype.resize = function(){
    const dpr = this.getDPR();
    const w = Math.floor(window.innerWidth);
    const h = Math.floor(window.innerHeight);

    if(w === this.w && h === this.h && dpr === this.dpr) return;

    this.dpr = dpr;
    this.w = w;
    this.h = h;

    this.canvas.width = Math.floor(w * dpr);
    this.canvas.height = Math.floor(h * dpr);
    this.canvas.style.width = w + "px";
    this.canvas.style.height = h + "px";
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    this.rebuild();
  };

  // Collect anchors from DOM
  AirflowCanvas.prototype.rebuild = function(){
    // Main logic:
    // start off-screen left -> logo -> form -> branch to services tiles -> recombine -> pricing -> faq -> contact -> off-screen bottom
    const getCenter = (el) => {
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width/2, y: r.top + r.height/2 };
    };

    const logo = $('[data-flow-node="logo"]');
    const form = $('[data-flow-node="form"]');
    const services = $('[data-flow-node="services"]');
    const pricing = $('[data-flow-node="pricing"]');
    const faq = $('[data-flow-node="faq"]');
    const contact = $('[data-flow-node="contact"]');

    const tiles = [
      $('[data-flow-node="s1"]'),
      $('[data-flow-node="s2"]'),
      $('[data-flow-node="s3"]'),
      $('[data-flow-node="s4"]'),
      $('[data-flow-node="s5"]'),
      $('[data-flow-node="s6"]'),
    ].filter(Boolean);

    if(!logo || !form || !services || !pricing || !faq || !contact) return;

    const pLogo = getCenter(logo);
    const pForm = getCenter(form);
    const pServ = getCenter(services);
    const pPricing = getCenter(pricing);
    const pFaq = getCenter(faq);
    const pContact = getCenter(contact);

    const start = { x: -120, y: pLogo.y - 10 };
    const end = { x: this.w + 120, y: pContact.y + 180 };

    // “One in / one out” concept:
    // base spine: start -> logo -> form -> services -> pricing -> faq -> contact -> end
    const spine = [start, pLogo, pForm, pServ, pPricing, pFaq, pContact, end];

    // branches from form to each tile (soft), then back to services center
    const branches = tiles.map((tEl, i) => {
      const p = getCenter(tEl);
      return { from: pForm, to: p, back: pServ, i };
    });

    this.paths = { spine, branches };

    // We'll also trigger redraw after layout changes settle
  };

  // cubic bezier with a “snake” feel (very gentle)
  function bezierPoints(a, b, i, amp){
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const sign = (i % 2 === 0) ? 1 : -1;

    const c1 = {
      x: a.x + dx * 0.25,
      y: a.y + dy * 0.10 + sign * amp
    };
    const c2 = {
      x: a.x + dx * 0.75,
      y: a.y + dy * 0.90 - sign * amp
    };
    return { c1, c2 };
  }

  // draw a “flow ribbon”: not a line, but a soft air band with gradient edges
  AirflowCanvas.prototype.drawRibbon = function(a, b, i, strength, hueShift){
    const ctx = this.ctx;

    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const dist = Math.hypot(dx, dy);

    const amp = clamp(dist * 0.12, 22, 90);
    const { c1, c2 } = bezierPoints(a, b, i, amp);

    // base gradient along segment
    const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);

    // soft cold white -> blue -> airy cyan
    const t = this.t;
    const p1 = 0.0;
    const p2 = 0.55 + 0.06*Math.sin(t*0.12 + i*0.6);
    const p3 = 1.0;

    const alpha = 0.12 * strength;
    const alpha2 = 0.18 * strength;

    grad.addColorStop(p1, `rgba(255,255,255,${alpha})`);
    grad.addColorStop(p2, `rgba(127,199,230,${alpha2})`);
    grad.addColorStop(p3, `rgba(95,169,201,${alpha})`);

    // ribbon pass 1: wide mist
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = grad;

    const baseW = clamp(34 + dist*0.02, 34, 64);
    const wobble = 1 + 0.07*Math.sin(t*0.25 + i*1.1);
    ctx.lineWidth = baseW * wobble;

    ctx.globalAlpha = 1;
    ctx.shadowColor = `rgba(127,199,230,${0.28*strength})`;
    ctx.shadowBlur = 24;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.bezierCurveTo(c1.x, c1.y, c2.x, c2.y, b.x, b.y);
    ctx.stroke();

    // ribbon pass 2: inner brighter core (still “air”, not neon)
    const grad2 = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
    grad2.addColorStop(0, `rgba(255,255,255,${0.14*strength})`);
    grad2.addColorStop(0.5, `rgba(160,225,255,${0.20*strength})`);
    grad2.addColorStop(1, `rgba(255,255,255,${0.12*strength})`);

    ctx.strokeStyle = grad2;
    ctx.shadowBlur = 18;
    ctx.lineWidth = clamp(baseW*0.35, 10, 22);
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.bezierCurveTo(c1.x, c1.y, c2.x, c2.y, b.x, b.y);
    ctx.stroke();

    // ribbon pass 3: subtle moving “air particles” (super soft dotted)
    // (very low contrast; just to feel alive)
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 0.6;
    ctx.strokeStyle = `rgba(255,255,255,${0.18*strength})`;
    ctx.lineWidth = 2.6;
    ctx.setLineDash([16, 22]);
    ctx.lineDashOffset = - (t*22 + i*18);
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.bezierCurveTo(c1.x, c1.y, c2.x, c2.y, b.x, b.y);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
  };

  AirflowCanvas.prototype.clear = function(){
    // fade clear for softness; not hard wipe
    const ctx = this.ctx;
    ctx.save();
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "rgba(245,251,255,0.22)";
    ctx.fillRect(0,0,this.w,this.h);
    ctx.restore();
  };

  AirflowCanvas.prototype.tick = function(ts){
    if(!this.last) this.last = ts;
    const dt = Math.min(64, ts - this.last);
    this.last = ts;

    // low-power throttle on mobile: aim ~30fps
    const frameSkip = (this.w < 700) ? 2 : 1;
    if(((ts/16)|0) % frameSkip !== 0){
      requestAnimationFrame(this.tick);
      return;
    }

    this.t += dt * 0.001;

    // ease scrollBoost down
    this.scrollBoost = Math.max(0, this.scrollBoost - dt*0.002);

    // rebuild anchors occasionally (layout changes while scrolling)
    if(((ts/250)|0) % 2 === 0){
      this.rebuild();
    }

    // draw
    this.clear();

    const ctx = this.ctx;

    // overall base strength (very subtle)
    const baseStrength = 0.85 + 0.12*Math.sin(this.t*0.25);

    // focus reaction
    const focusA = this.focus.a;
    if(focusA > 0){
      this.focus.a = Math.max(0, focusA - dt*0.0025);
    }

    // extra local glow near focus
    const fx = this.focus.x;
    const fy = this.focus.y;
    const focusStrength = 0.55 * this.focus.a + 0.25*this.scrollBoost;

    // Draw spine (main flow)
    const { spine, branches } = this.paths || {};
    if(spine && spine.length > 1){
      for(let i=0;i<spine.length-1;i++){
        const a = spine[i], b = spine[i+1];

        // local boost if close to focus point
        let boost = 1;
        if(focusStrength > 0 && fx > -9000){
          const mx = (a.x + b.x)/2;
          const my = (a.y + b.y)/2;
          const d = Math.hypot(mx - fx, my - fy);
          boost += focusStrength * (1 - clamp(d/520, 0, 1));
        }

        this.drawRibbon(a, b, i, baseStrength*boost, 0);
      }
    }

    // Draw branches from form -> tiles -> services center (very subtle)
    if(branches && branches.length){
      branches.forEach((br, k)=>{
        const brStrength = 0.55 + 0.10*Math.sin(this.t*0.30 + k);
        // forward
        this.drawRibbon(br.from, br.to, k+10, brStrength*0.75, 0.12);
        // back
        this.drawRibbon(br.to, br.back, k+20, brStrength*0.55, 0.10);
      });
    }

    // very gentle overall vignette fade (keeps it airy)
    ctx.save();
    const vg = ctx.createRadialGradient(this.w*0.5, this.h*0.45, this.w*0.05, this.w*0.5, this.h*0.45, this.w*0.7);
    vg.addColorStop(0, "rgba(255,255,255,0)");
    vg.addColorStop(1, "rgba(255,255,255,0.40)");
    ctx.fillStyle = vg;
    ctx.globalCompositeOperation = "screen";
    ctx.fillRect(0,0,this.w,this.h);
    ctx.restore();

    requestAnimationFrame(this.tick);
  };

  function initAirflow(){
    const canvas = $("#airflow");
    if(!canvas) return;
    const af = new AirflowCanvas(canvas);

    // rebuild after images/fonts settle
    setTimeout(()=>af.rebuild(), 250);
    setTimeout(()=>af.rebuild(), 900);
  }

  function init(){
    $("#year").textContent = String(new Date().getFullYear());
    initSmoothAnchors();
    initFAQ();
    initLeads();
    initAirflow();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
