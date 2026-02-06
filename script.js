// =========================================================
// Love Hub — script.js
// Everything is driven by a few arrays below.
// Tom: edit content here whenever you want.
// =========================================================

const CONFIG = {
  // Count full days since this date (UTC midnight to avoid timezone/DST weirdness)
  startDateUTC: "2024-10-04",
  herName: "Annie",
  yourName: "Tom",
  firstVisitKey: "lovehub_first_visit_v2",
};

// --- Content (edit me) ---
const OPEN_WHEN = [
  { title: "Open when you wake up ☀️", msg: "Good morning, princess. Drink water, stretch a little, and remember this: you are deeply loved before the day even starts." },
  { title: "Open when you miss me 🌙", msg: "I miss you too. Insane amounts. Close your eyes for 5 seconds and imagine my arms around you. That’s where you belong." },
  { title: "Open when you feel anxious 🌼", msg: "Breathe in for 4, hold for 4, out for 6. You are safe. You are not behind. You are not too much. You are my girl and you are doing your best." },
  { title: "Open when you need confidence 👑", msg: "You are gorgeous, smart, and magnetic. Walk in like the room has been waiting for you. Because it has." },
  { title: "Open when you need to sleep 💤", msg: "Put the phone down in 10 minutes. Promise. I want your brain rested and your heart calm. Pretend I kissed your forehead right now." },
  { title: "Open when you feel sad 💗", msg: "It’s okay to have soft days. You don’t need to perform for me. You can be messy, quiet, emotional — I’m still here, still yours." },
  { title: "Open when you did something brave 🔥", msg: "I’m SO proud of you. Not just for the big wins — for the effort, the trying, and the not-giving-up. That’s hot actually." },
  { title: "Open when you want to smile 🧸", msg: "Tiny reminder: you’re cute when you concentrate, cute when you ramble, cute when you steal blankets, and illegally cute when you laugh." },
  { title: "Open when it’s one of those days 🌧️", msg: "Low battery day? Then today’s objective is simple: survive gently. Snack, shower, comfy clothes, little walk, one thing at a time." },
  { title: "Open when you need a promise 💍", msg: "I choose you on easy days and hard days. Across distance, moods, and chaos. I’m not going anywhere." },
];

const LOVE_LETTER = `Annie,

This whole website is my way of leaving little pieces of love around for you to find whenever you need them.

I love your laugh. I love your softness. I love your stubborn little spark. I love how you care so deeply, even when you act like you don’t.

I know life gets loud sometimes. I know distance can feel heavy. I know there are days where your mind makes everything harder than it needs to be. On those days, read this slowly:

You are not hard to love.
You are not too much.
You are not alone.

You are my favourite person. Still. Always.

I want all of it with you — the dumb jokes, the late-night talks, the chaotic errands, the slow mornings, the proud moments, the healing moments, the forever moments.

Thank you for being you. Thank you for trusting me with your heart.

I adore you, princess.

Love,
Tom 💙`;

const MONTHLY_LETTERS = [
  { label: "January note", date: "Jan 2026", text: "My goal this month: love you loudly, consistently, and in ways you can actually feel. More check-ins, more little surprises, more us." },
  { label: "February note", date: "Feb 2026", text: "You are my favourite valentine every year. I hope this month feels like pink skies, warm hugs, and silly kisses." },
  { label: "March note", date: "Mar 2026", text: "I hope your confidence grows wild this month. I hope you look in the mirror and see what I see: beauty and fire." },
  { label: "April note", date: "Apr 2026", text: "When life gets noisy, come back to us. We’re not perfect, but we’re real, and we keep choosing each other." },
  { label: "May note", date: "May 2026", text: "I hope this month gives you soft mornings, clean wins, and random moments that remind you how loved you are." },
];

const MEMORIES = [
  {
    date: "The beginning",
    title: "The day everything changed",
    text: "The moment we became us. I still remember how excited and calm I felt at the same time.",
    img: "assets/photos/1.jpg",
    cap: "The start of my favourite story."
  },
  {
    date: "Our soft era",
    title: "Learning each other",
    text: "Inside jokes, tiny rituals, and that comfortable feeling that says ‘home’.",
    img: "assets/photos/2.jpg",
    cap: "My beautiful girl."
  },
  {
    date: "Golden memory",
    title: "A day I replay in my head",
    text: "You looked unreal and I couldn’t stop smiling. That whole day felt cinematic.",
    img: "assets/photos/3.jpg",
    cap: "Main-character Annie energy."
  },
  {
    date: "Everyday magic",
    title: "The little things",
    text: "Voice notes, sleepy texts, and the way we make ordinary moments feel special."
  },
  {
    date: "Next chapter",
    title: "Coming soon",
    text: "More dates, more adventures, more photos, more everything. We’re just getting started."
  },
];

const GALLERY = [
  { src: "assets/photos/1.jpg", cap: "This day was elite." },
  { src: "assets/photos/2.jpg", cap: "You look unreal here btw." },
  { src: "assets/photos/3.jpg", cap: "Miss you. Like, a lot." },
];

const REASONS = [
  "Your laugh resets my entire mood.",
  "You make me feel chosen.",
  "You’re so pretty it should be regulated.",
  "You are kind in ways people don’t always see.",
  "You’re funny without trying.",
  "You care deeply, and I adore that about you.",
  "You make ordinary days feel special.",
  "You’re my safe place.",
  "You challenge me to be better.",
  "You’re soft and strong at the same time.",
  "You give the best comfort.",
  "You look amazing in literally everything.",
  "You are my favourite notification.",
  "You make me feel lucky every single day.",
  "You are pure girlfriend material and then some.",
  "You’re my home, even from far away.",
  "You’re my peace.",
  "You’re my chaos (the cute version).",
  "You are wildly lovable.",
  "You make me believe in forever.",
  "You’re the person I want to celebrate life with.",
  "You are my best friend and my favourite crush.",
  "You deserve soft love and I want to give you that.",
  "I can be fully myself with you.",
  "You make love feel easy and exciting at once.",
  "You make hard days lighter.",
  "You’re the first person I want to tell everything to.",
  "You make me smile at my phone like an idiot.",
  "You are my person. End of story.",
  "Because you’re Annie. That’s enough forever. 💙",
];

// =========================================================
// Tiny helpers
// =========================================================
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

function clamp(n, a, b){ return Math.max(a, Math.min(b, n)); }

function formatDaysSince(isoDateUTC){
  const [y,m,d] = isoDateUTC.split("-").map(Number);
  const start = new Date(Date.UTC(y, m-1, d));
  const now = new Date();
  const todayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const diff = todayUTC - start;
  return Math.max(0, Math.floor(diff / 86400000));
}

function safeText(el, text){
  if (!el) return;
  el.textContent = text;
}

// =========================================================
// Modal
// =========================================================
function openModal(title, body){
  const modal = $("#modal");
  if (!modal) return;
  safeText($("#modalTitle"), title || "");
  const modalBody = $("#modalBody");
  if (modalBody) {
    modalBody.textContent = "";
    // If body is a string, show it as pre-line text.
    modalBody.textContent = String(body ?? "");
  }
  modal.classList.add("show");
  modal.setAttribute("aria-hidden","false");
}

function closeModal(){
  const modal = $("#modal");
  if (!modal) return;
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden","true");
}

function initModal(){
  const modal = $("#modal");
  if (!modal) return;

  $("[data-close]", modal)?.addEventListener("click", closeModal);
  $$("[data-close]", modal).forEach(btn => btn.addEventListener("click", closeModal));

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
      closeLightbox();
    }
  });
}

// =========================================================
// Lightbox
// =========================================================
function openLightbox(src, cap){
  const lb = $("#lightbox");
  if (!lb) return;
  const img = $("#lightboxImg");
  const c = $("#lightboxCap");
  if (img) img.src = src;
  if (c) c.textContent = cap || "";
  lb.classList.add("show");
  lb.setAttribute("aria-hidden","false");
}

function closeLightbox(){
  const lb = $("#lightbox");
  if (!lb) return;
  lb.classList.remove("show");
  lb.setAttribute("aria-hidden","true");
  const img = $("#lightboxImg");
  if (img) img.src = "";
}

function initLightbox(){
  const lb = $("#lightbox");
  if (!lb) return;
  $$("[data-lb-close]", lb).forEach(el => el.addEventListener("click", closeLightbox));
  $$("[data-lightbox]").forEach(fig => {
    fig.addEventListener("click", () => openLightbox(fig.dataset.full, fig.dataset.caption || ""));
  });
}

// =========================================================
// Reveal on scroll
// =========================================================
function initReveal(){
  const els = $$(".reveal");
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add("show");
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
}

// =========================================================
// Particles (sparkles)
// =========================================================
let sparklesOn = true;
const sparkChars = ["✨","⭐","🫧","☁️","🎀","💙","💗","✦","✧"];

function spawnParticle(x, y){
  const p = document.createElement("div");
  p.className = "particle";
  p.textContent = sparkChars[Math.floor(Math.random() * sparkChars.length)];
  p.style.left = `${x}px`;
  p.style.top = `${y}px`;
  p.style.fontSize = `${14 + Math.floor(Math.random()*10)}px`;
  p.style.transform = `translate(-50%, -50%) rotate(${(Math.random()*24 - 12).toFixed(1)}deg)`;
  document.body.appendChild(p);
  setTimeout(() => p.remove(), 950);
}

function initParticles(){
  const toggle = $("#toggleSparkles");
  if (toggle){
    toggle.addEventListener("click", () => {
      sparklesOn = !sparklesOn;
      toggle.textContent = `Sparkles: ${sparklesOn ? "ON" : "OFF"}`;
    });
  }

  window.addEventListener("pointerdown", (e) => {
    if (!sparklesOn) return;

    // Don't spam when tapping on controls
    const tag = (e.target.tagName || "").toLowerCase();
    if (tag === "button" || tag === "a" || tag === "input" || tag === "textarea") return;

    const n = 3 + Math.floor(Math.random()*3);
    for(let i=0;i<n;i++){
      spawnParticle(
        e.clientX + (Math.random()*26 - 13),
        e.clientY + (Math.random()*26 - 13)
      );
    }
  }, { passive: true });
}

// =========================================================
// Cute click sound (WebAudio, no file needed)
// =========================================================
let soundOn = true;
let audioReady = false;
let ctx = null;

function ensureAudio(){
  if (!soundOn) return false;
  if (audioReady && ctx) return true;
  try{
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    audioReady = true;
    return true;
  } catch {
    soundOn = false;
    const btn = $("#toggleSound");
    if (btn) btn.textContent = "Sound: OFF";
    return false;
  }
}

function popSound(){
  if (!soundOn) return;
  if (!ensureAudio()) return;
  if (ctx.state === "suspended") ctx.resume();

  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = "triangle";

  const now = ctx.currentTime;
  o.frequency.setValueAtTime(740, now);
  o.frequency.exponentialRampToValueAtTime(280, now + 0.07);

  g.gain.setValueAtTime(0.0001, now);
  g.gain.exponentialRampToValueAtTime(0.12, now + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

  o.connect(g);
  g.connect(ctx.destination);
  o.start(now);
  o.stop(now + 0.10);
}

function initSfx(){
  const btn = $("#toggleSound");
  if (btn){
    btn.addEventListener("click", () => {
      soundOn = !soundOn;
      btn.textContent = `Sound: ${soundOn ? "ON" : "OFF"}`;
      if (soundOn) ensureAudio();
    });
  }

  // Prime audio on first interaction (helps mobile)
  window.addEventListener("pointerdown", () => ensureAudio(), { once: true, passive: true });

  // Attach to things marked data-sfx
  $$("[data-sfx]").forEach(el => {
    el.addEventListener("mouseenter", popSound, { passive: true });
    el.addEventListener("pointerdown", popSound, { passive: true });
  });
}

// =========================================================
// Theme toggle
// =========================================================
function setTheme(theme){
  const isNight = theme === "night";
  document.body.classList.toggle("theme-night", isNight);
  document.body.classList.toggle("theme-sky", !isNight);

  const btn = $("#toggleTheme");
  if (btn) btn.textContent = `Theme: ${isNight ? "Night" : "Sky"}`;

  try { localStorage.setItem("lovehub_theme", theme); } catch {}
}

function initTheme(){
  const saved = (() => {
    try { return localStorage.getItem("lovehub_theme"); } catch { return null; }
  })();
  setTheme(saved || "sky");

  $("#toggleTheme")?.addEventListener("click", () => {
    const next = document.body.classList.contains("theme-night") ? "sky" : "night";
    setTheme(next);
  });
}

// =========================================================
// Nav (mobile)
// =========================================================
function initNav(){
  const t = $("#navToggle");
  const links = $("#navLinks");
  if (t && links){
    t.addEventListener("click", () => links.classList.toggle("show"));
  }
}

// =========================================================
// Landing bits
// =========================================================
function initLanding(){
  safeText($("#daysTogether"), formatDaysSince(CONFIG.startDateUTC));
  // little vibe generator
  const vibes = ["cozy", "soft", "cute", "warm", "safe", "sweet", "calm"];
  safeText($("#todayNice"), vibes[Math.floor(Math.random()*vibes.length)]);
}

// =========================================================
// Home bits
// =========================================================
function randomVibe(){
  const vibeWords = [
    { w:"cozy", line:"blanket + cuddles energy" },
    { w:"soft", line:"gentle day. gentle you." },
    { w:"cute", line:"you’re my favourite person ever" },
    { w:"warm", line:"like a hug but digital" },
    { w:"safe", line:"you’re safe with me" },
  ];
  return vibeWords[Math.floor(Math.random()*vibeWords.length)];
}

function initHome(){
  safeText($("#daysTogether"), formatDaysSince(CONFIG.startDateUTC));

  const v = randomVibe();
  safeText($("#vibeWord"), v.w);
  safeText($("#vibeLine"), v.line);

  const surpriseBtn = $("#btnSurprise");
  const surpriseBtn2 = $("#btnSurprise2");
  const surprises = [
    "Hi Annie 💙 Just a reminder: you’re loved. Like, a lot.",
    "If you could see how much I miss you, you’d be embarrassed for me.",
    "You’re my favourite. That’s it. That’s the message.",
    "I’m proud of you. Even on the days you don’t feel proud of yourself.",
    "Come here (respectfully). 💙",
  ];

  function doSurprise(){
    openModal("Hi Annie 💙", surprises[Math.floor(Math.random()*surprises.length)]);
  }

  surpriseBtn?.addEventListener("click", doSurprise);
  surpriseBtn2?.addEventListener("click", doSurprise);

  // First visit popup
  try{
    if (!localStorage.getItem(CONFIG.firstVisitKey)){
      setTimeout(() => {
        openModal("Hi Annie 💙", "I made this little site for you because I miss you loads. Have a look around yeah 💙");
      }, 650);
      localStorage.setItem(CONFIG.firstVisitKey, "1");
    }
  } catch {}
}

// =========================================================
// Letters page
// =========================================================
function renderOpenWhen(){
  const grid = $("#openWhenGrid");
  if (!grid) return;

  grid.innerHTML = "";
  OPEN_WHEN.forEach((item, idx) => {
    const btn = document.createElement("button");
    btn.className = "card glass";
    btn.type = "button";
    btn.setAttribute("data-sfx", "");
    btn.innerHTML = `
      <div class="card__icon">💌</div>
      <div class="card__title">${escapeHtml(item.title)}</div>
      <div class="card__text muted">tap to open</div>
    `;
    btn.addEventListener("click", () => openModal(item.title, item.msg));
    grid.appendChild(btn);
  });

  // (re)attach sfx to newly created elements
  $$("[data-sfx]", grid).forEach(el => {
    el.addEventListener("mouseenter", popSound, { passive: true });
    el.addEventListener("pointerdown", popSound, { passive: true });
  });

  $("#openRandomLetter")?.addEventListener("click", () => {
    const pick = OPEN_WHEN[Math.floor(Math.random()*OPEN_WHEN.length)];
    openModal(pick.title, pick.msg);
  });
}

function renderLetter(){
  const letter = $("#mainLetter");
  if (!letter) return;
  letter.textContent = LOVE_LETTER;

  $("#copyLetter")?.addEventListener("click", async () => {
    try{
      await navigator.clipboard.writeText(LOVE_LETTER);
      toast("Copied 💙");
    } catch {
      toast("Couldn’t copy (browser blocked it) 😭");
    }
  });

  $("#openLetterModal")?.addEventListener("click", () => openModal("A letter for you 💙", LOVE_LETTER));
}

function renderMonthlyLetters(){
  const wrap = $("#monthlyLetters");
  if (!wrap) return;

  wrap.innerHTML = "";
  MONTHLY_LETTERS.forEach((m, i) => {
    const div = document.createElement("div");
    div.className = "acc";
    div.innerHTML = `
      <div class="acc__head" role="button" tabindex="0" aria-expanded="false">
        <div>
          <div class="acc__title">${escapeHtml(m.label)}</div>
          <div class="tiny muted">${escapeHtml(m.date || "")}</div>
        </div>
        <div class="acc__chev">▾</div>
      </div>
      <div class="acc__body muted" style="white-space:pre-line;">${escapeHtml(m.text || "")}</div>
    `;

    const head = $(".acc__head", div);
    const toggle = () => {
      const open = div.classList.toggle("open");
      head.setAttribute("aria-expanded", open ? "true" : "false");
    };
    head.addEventListener("click", toggle);
    head.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); } });

    wrap.appendChild(div);
  });
}

function initNotes(){
  const ta = $("#noteFromAnnie");
  const status = $("#noteStatus");
  if (!ta) return;

  const key = "lovehub_note_from_annie";
  try{
    const saved = localStorage.getItem(key);
    if (saved) ta.value = saved;
  } catch {}

  $("#saveNote")?.addEventListener("click", () => {
    try{
      localStorage.setItem(key, ta.value);
      if (status) status.textContent = "Saved 💙";
      setTimeout(() => { if (status) status.textContent = ""; }, 1400);
    } catch {
      if (status) status.textContent = "Couldn’t save (storage blocked)";
    }
  });

  $("#clearNote")?.addEventListener("click", () => {
    ta.value = "";
    try { localStorage.removeItem(key); } catch {}
    if (status) status.textContent = "Cleared";
    setTimeout(() => { if (status) status.textContent = ""; }, 1200);
  });
}

function initLetters(){
  renderOpenWhen();
  renderLetter();
  renderMonthlyLetters();
  initNotes();
}

// =========================================================
// Memories page
// =========================================================
function initMemories(){
  safeText($("#daysTogether"), formatDaysSince(CONFIG.startDateUTC));

  const tl = $("#timeline");
  if (!tl) return;
  tl.innerHTML = "";

  MEMORIES.forEach(m => {
    const item = document.createElement("div");
    item.className = "tl";
    const hasImg = !!m.img;

    item.innerHTML = `
      <div class="tl__dot" aria-hidden="true"></div>
      <div class="tl__card glass">
        <div class="tl__date">${escapeHtml(m.date || "")}</div>
        <div class="tl__title">${escapeHtml(m.title || "")}</div>
        <div class="tl__text">${escapeHtml(m.text || "")}</div>
        ${hasImg ? `
          <div class="tl__media" data-lightbox data-full="${escapeAttr(m.img)}" data-caption="${escapeAttr(m.cap || "")}">
            <img src="${escapeAttr(m.img)}" alt="Memory photo" loading="lazy">
          </div>
        ` : ""}
      </div>
    `;
    tl.appendChild(item);
  });

  // attach lightbox to newly created items
  $$("[data-lightbox]", tl).forEach(el => {
    el.addEventListener("click", () => openLightbox(el.dataset.full, el.dataset.caption || ""));
  });

  $("#addMemoryHint")?.addEventListener("click", () => {
    openModal(
      "Adding new memories ✍️",
      "Tom: open script.js and edit the MEMORIES array.\n\nEach memory looks like:\n{ date, title, text, img(optional), cap(optional) }\n\nYou can also add more photos and reference them like: assets/photos/4.jpg"
    );
  });
}

// =========================================================
// Gallery page
// =========================================================
function initGallery(){
  const grid = $("#galleryGrid");
  if (!grid) return;

  grid.innerHTML = "";
  GALLERY.forEach((g, i) => {
    const fig = document.createElement("figure");
    fig.className = "g-item glass";
    fig.setAttribute("data-lightbox","");
    fig.dataset.full = g.src;
    fig.dataset.caption = g.cap || "";
    fig.innerHTML = `
      <img src="${escapeAttr(g.src)}" alt="Gallery photo" loading="lazy">
      <figcaption class="g-cap muted">${escapeHtml(g.cap || "")}</figcaption>
    `;
    fig.addEventListener("click", () => openLightbox(g.src, g.cap));
    grid.appendChild(fig);
  });
}

// =========================================================
// Reasons page
// =========================================================
let lastReason = "";

function initReasons(){
  const list = $("#reasonsList");
  if (list){
    list.innerHTML = "";
    REASONS.forEach(r => {
      const li = document.createElement("li");
      li.textContent = r;
      list.appendChild(li);
    });
  }

  const bubble = $("#jarBubble");
  const jarBtn = $("#jarBtn");
  const copy = $("#copyReason");

  function pick(){
    const r = REASONS[Math.floor(Math.random()*REASONS.length)];
    lastReason = r;
    if (bubble) bubble.textContent = r;
  }

  jarBtn?.addEventListener("click", pick);

  copy?.addEventListener("click", async () => {
    if (!lastReason) pick();
    try{
      await navigator.clipboard.writeText(lastReason);
      toast("Copied 💙");
    } catch {
      toast("Couldn’t copy 😭");
    }
  });

  // pick one by default
  pick();
}

// =========================================================
// Secret page (runaway No button)
// =========================================================
function initSecret(){
  const no = $("#noBtn");
  const yes = $("#yesBtn");
  if (!no || !yes) return;

  const container = no.parentElement;
  if (!container) return;

  // Make it positionable
  container.style.position = "relative";

  let jumps = 0;

  function moveNo(){
    jumps++;
    const rect = container.getBoundingClientRect();
    const maxX = rect.width - no.offsetWidth;
    const maxY = rect.height - no.offsetHeight;

    // Keep it within container
    const x = Math.random() * clamp(maxX, 0, 9999);
    const y = Math.random() * clamp(maxY, 0, 9999);

    no.style.position = "absolute";
    no.style.left = `${x}px`;
    no.style.top = `${y}px`;

    if (jumps >= 6){
      no.textContent = "Okay fine 😭";
    }
  }

  no.addEventListener("mouseenter", moveNo);
  no.addEventListener("pointerdown", moveNo);

  yes.addEventListener("click", () => {
    openModal("Correct ✅", "Good girl. 💙\n\n(You can go back to the hub now hehe.)");
  });
}

// =========================================================
// Our song (optional mp3)
// =========================================================
function initSong(){
  const audio = $("#ourSong");
  const btn = $("#songBtn");
  const status = $("#songStatus");
  if (!audio || !btn || !status) return;

  const setUI = (playing) => {
    btn.textContent = playing ? "Pause ⏸️" : "Play 🎧";
    status.textContent = playing ? "Now playing" : "Not playing";
  };

  setUI(false);

  btn.addEventListener("click", async () => {
    try{
      if (audio.paused){
        await audio.play();
        setUI(true);
      } else {
        audio.pause();
        setUI(false);
      }
    } catch {
      status.textContent = "Tap again to play";
    }
  });

  audio.addEventListener("ended", () => setUI(false));
  audio.addEventListener("pause", () => setUI(false));
  audio.addEventListener("play", () => setUI(true));
}

// =========================================================
// Toast helper (for copy buttons etc.)
// =========================================================
let toastTimer = null;
function toast(msg){
  const el = $("#toast");
  if (!el) return;
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 1300);
}

// =========================================================
// Escaping helpers (basic safety for template strings)
// =========================================================
function escapeHtml(str){
  return String(str)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}
function escapeAttr(str){
  // conservative
  return escapeHtml(str).replaceAll("`","&#096;");
}


function initDreams(){
  const btn = $("#dreamBtn");
  const out = $("#dreamText");
  if (!btn || !out) return;
  const dreams = [
    "Matching hoodies, rainy day coffee, and a long walk where we talk about everything.",
    "A weekend escape with no alarms, just cuddles and room service pancakes.",
    "A silly photo booth strip that we keep in our wallet forever.",
    "Cooking together badly, laughing too much, and ordering dessert anyway.",
    "A cozy movie night with fairy lights and you falling asleep on my chest.",
    "Passport stamps, beach sunsets, and me taking 200 photos of you.",
  ];
  btn.addEventListener("click", () => {
    const d = dreams[Math.floor(Math.random()*dreams.length)];
    out.textContent = d;
    popSound();
  });
}

// =========================================================
// Boot
// =========================================================
(function boot(){
  initTheme();
  initNav();
  initModal();
  initLightbox();
  initReveal();
  initParticles();
  initSfx();
  initSong();

  // shared counter
  $$("#daysTogether").forEach(el => safeText(el, formatDaysSince(CONFIG.startDateUTC)));

  const page = document.body.dataset.page || "";

  if (page === "landing") initLanding();
  if (page === "home") initHome();
  if (page === "letters") initLetters();
  if (page === "memories") initMemories();
  if (page === "gallery") initGallery();
  if (page === "reasons") initReasons();
  if (page === "secret") initSecret();
  if (page === "dreams") initDreams();
})();
