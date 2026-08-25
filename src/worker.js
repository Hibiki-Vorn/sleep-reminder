
    const html = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">


<style>
:root {
    color-scheme: dark;

    --bg: #070b14;
    --bg-secondary: #0d1322;

    --text: #f4f7ff;
    --text-secondary: #9aa6bd;
    --text-muted: #66728a;

    --accent: #aebfff;
    --accent-soft: rgba(174, 191, 255, 0.12);

    --border: rgba(255, 255, 255, 0.08);

    --radius-lg: 28px;
    --radius-md: 18px;
}

* {
    box-sizing: border-box;
}

html,
body {
    margin: 0;
    min-height: 100%;
}

body {
    min-height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 32px;

    background:
    radial-gradient(
        circle at 50% 20%,
        rgba(75, 94, 160, 0.16),
                    transparent 40%
    ),
    var(--bg);

    color: var(--text);

    font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
}


/* =========================
 *       主容器
 *       ========================= */

.sleep-page {
    width: min(100%, 680px);

    display: flex;
    flex-direction: column;
    align-items: center;

    text-align: center;
}


/* =========================
 *       月亮
 *       ========================= */

.moon-wrapper {
    width: 110px;
    height: 110px;

    display: flex;
    align-items: center;
    justify-content: center;

    margin-bottom: 32px;

    border-radius: 50%;

    background:
    radial-gradient(
        circle at 35% 30%,
        rgba(255, 255, 255, 0.16),
                    transparent 60%
    );

    box-shadow:
    0 0 80px rgba(139, 157, 255, 0.12);

    animation: float 5s ease-in-out infinite;
}

.moon {
    position: relative;

    width: 64px;
    height: 64px;

    border-radius: 50%;

    background: #e7ecff;

    box-shadow:
    0 0 30px rgba(210, 220, 255, 0.25);
}

.moon::after {
    content: "";

    position: absolute;

    width: 64px;
    height: 64px;

    top: -10px;
    left: 18px;

    border-radius: 50%;

    background: var(--bg);
}


/* =========================
 *       标题
 *       ========================= */

.title {
    margin: 0;

    font-size: clamp(36px, 7vw, 56px);
    font-weight: 700;

    letter-spacing: -0.04em;

    line-height: 1.1;
}

.subtitle {
    margin: 14px 0 0;

    color: var(--text-secondary);

    font-size: 17px;
    line-height: 1.6;
}


/* =========================
 *       时间
 *       ========================= */

.clock {
    margin-top: 54px;

    font-size: clamp(72px, 15vw, 128px);

    font-weight: 600;

    letter-spacing: -0.065em;

    line-height: 1;

    font-variant-numeric: tabular-nums;

    text-shadow:
    0 0 60px rgba(174, 191, 255, 0.08);
}


/* =========================
 *       倒计时卡片
 *       ========================= */

.countdown-card {
    width: 100%;

    margin-top: 42px;

    padding: 26px 28px;

    border: 1px solid var(--border);

    border-radius: var(--radius-lg);

    background:
    linear-gradient(
        145deg,
        rgba(255, 255, 255, 0.045),
                    rgba(255, 255, 255, 0.018)
    );

    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);

    box-shadow:
    0 20px 70px rgba(0, 0, 0, 0.25);
}

.countdown-label {
    color: var(--text-muted);

    font-size: 14px;
    font-weight: 500;

    letter-spacing: 0.04em;
}

.countdown {
    margin-top: 10px;

    color: var(--accent);

    font-size: 30px;
    font-weight: 600;

    font-variant-numeric: tabular-nums;
}


/* =========================
 *       底部提示
 *       ========================= */

.hint {
    margin-top: 28px;

    color: var(--text-muted);

    font-size: 14px;
}


/* =========================
 *       提醒弹窗
 *       ========================= */

.reminder-overlay {
    position: fixed;
    inset: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 24px;

    background:
    rgba(3, 5, 10, 0.82);

    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);

    opacity: 0;
    pointer-events: none;

    transition:
    opacity 300ms ease;
}

.reminder-overlay.show {
    opacity: 1;
    pointer-events: auto;
}


.reminder {
    width: min(100%, 460px);

    padding: 42px 32px;

    text-align: center;

    border: 1px solid var(--border);

    border-radius: var(--radius-lg);

    background:
    linear-gradient(
        145deg,
        #111827,
        #0b101b
    );

    box-shadow:
    0 30px 100px rgba(0, 0, 0, 0.5);

    transform: translateY(14px) scale(0.97);

    transition:
    transform 350ms cubic-bezier(.2,.8,.2,1);
}

.reminder-overlay.show .reminder {
    transform: translateY(0) scale(1);
}


.reminder-icon {
    font-size: 64px;

    margin-bottom: 20px;
}

.reminder-title {
    margin: 0;

    font-size: 36px;
    font-weight: 700;

    letter-spacing: -0.035em;
}

.reminder-text {
    margin: 14px 0 0;

    color: var(--text-secondary);

    font-size: 17px;
    line-height: 1.7;
}


/* =========================
 *       按钮
 *       ========================= */

.button {
    margin-top: 28px;

    min-width: 160px;

    padding: 13px 22px;

    border: 0;
    border-radius: 14px;

    background: var(--accent);

    color: #101522;

    font-size: 15px;
    font-weight: 650;

    cursor: pointer;

    transition:
    transform 160ms ease,
    filter 160ms ease;
}

.button:hover {
    filter: brightness(1.08);
    transform: translateY(-1px);
}

.button:active {
    transform: translateY(1px);
}


/* =========================
 *       动画
 *       ========================= */

@keyframes float {
    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-7px);
    }
}


/* =========================
 *       手机适配
 *       ========================= */

@media (max-width: 600px) {
    body {
        padding: 24px;
    }

    .moon-wrapper {
        width: 90px;
        height: 90px;
        margin-bottom: 26px;
    }

    .moon,
    .moon::after {
        width: 54px;
        height: 54px;
    }

    .clock {
        margin-top: 42px;
    }

    .countdown-card {
        margin-top: 32px;
        padding: 22px;
    }
}


/* =========================
 *       减少动画
 *       ========================= */

@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
}
</style>
</head>

<body>

<main class="sleep-page">

<div class="moon-wrapper">
<div class="moon"></div>
</div>

<h1 class="title">
It's time to sleep'
</h1>

<p class="subtitle">
You worked hard today, too. Get some rest early.
</p>

<div class="clock">
23:59:00
</div>

<section class="countdown-card">

<div class="countdown-label">
Time until bedtime
</div>

<div class="countdown">
00:01:00
</div>

</section>

<div class="hint">
A reminder to get some rest every night 🌙
</div>

</main>


<div class="reminder-overlay">

<div class="reminder">

<div class="reminder-icon">
🌙
</div>

<h2 class="reminder-title">

</h2>

<p class="reminder-text">
<br>

</p>

<button class="button">

</button>

</div>

</div>

</body>
</html>

`

const send = async (target) => {

    const res = await fetch("https://api.deomail.com/v1/send", {
      method: "POST",
      headers: {
        "X-API-Key": "deo_live_GBcAeikcxRBVuORVK41mltpqA8oWBkdH",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "no-reply@hieronymus.uk",
        to: [target],
        subject: "Warning for sleeping",
        html: html,
      }),
    });
    const data = await res.json();
    const reply = JSON.stringify(data)

    return new Response(reply);
}

export default {
  async fetch(request, env, ctx) {
    return await send("hiernymus@gmail.com")
  },

  async scheduled(controller, env, ctx) {
    return await send("hiernymus@gmail.com")
  }
};