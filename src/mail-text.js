function getTime(timeZone) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());

  const p = Object.fromEntries(
    parts
      .filter(x => x.type !== "literal")
      .map(x => [x.type, x.value])
  );

  return `${p.hour}:${p.minute}:${p.second}`;
}


function getTimeUntil(target, timeZone) {
  const [targetHour, targetMinute, targetSecond] =
    target.split(":").map(Number);

  const now = new Date();

  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);

  const p = Object.fromEntries(
    parts
      .filter(x => x.type !== "literal")
      .map(x => [x.type, x.value])
  );

  const current = new Date(
    Date.UTC(
      Number(p.year),
      Number(p.month) - 1,
      Number(p.day),
      Number(p.hour),
      Number(p.minute),
      Number(p.second)
    )
  );

  let targetTime = new Date(current);

  targetTime.setUTCHours(
    targetHour,
    targetMinute,
    targetSecond,
    0
  );

  if (targetTime <= current) {
    targetTime.setUTCDate(
      targetTime.getUTCDate() + 1
    );
  }

  const diff = targetTime - current;

  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor(
    (diff % 3600000) / 60000
  );
  const seconds = Math.floor(
    (diff % 60000) / 1000
  );

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}


export default (timeZone) => {
  return `
<!DOCTYPE html>

<html lang="zh-CN">

<head>

<meta charset="UTF-8">

<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0"
>

<style type="text/css">

html,
body {
    margin: 0 !important;
    padding: 0 !important;
    width: 100% !important;
}

body {
    background-color: #070b14;
    color: #f4f7ff;

    font-family:
        Arial,
        Helvetica,
        sans-serif;
}

table {
    border-collapse: collapse;
    border-spacing: 0;
}

td {
    border-collapse: collapse;
}

img {
    border: 0;
    display: block;
}

.email-container {
    width: 680px;
    max-width: 680px;
}

.mobile-padding {
    padding-left: 32px !important;
    padding-right: 32px !important;
}

@media only screen and (max-width: 720px) {

    .email-container {
        width: 100% !important;
        max-width: 100% !important;
    }

    .mobile-padding {
        padding-left: 24px !important;
        padding-right: 24px !important;
    }

    .moon-wrapper {
        width: 90px !important;
        height: 90px !important;
    }

    .moon {
        width: 54px !important;
        height: 54px !important;
    }

    .clock {
        font-size: 72px !important;
    }

    .countdown-card {
        padding: 22px !important;
    }

}

</style>

</head>


<body
    style="
        margin:0;
        padding:0;
        width:100%;
        background-color:#070b14;
        color:#f4f7ff;
    "
>


<!-- =========================
     外层背景表格
     ========================= -->

<table
    role="presentation"
    width="100%"
    border="0"
    cellpadding="0"
    cellspacing="0"
    bgcolor="#070b14"
    style="
        width:100%;
        background-color:#070b14;
    "
>

<tr>

<td
    align="center"
    valign="top"
    style="
        padding:48px 0;
    "
>


<!-- =========================
     主容器
     ========================= -->

<table
    role="presentation"
    class="email-container"
    width="680"
    border="0"
    cellpadding="0"
    cellspacing="0"
    style="
        width:680px;
        max-width:680px;
    "
>

<tr>

<td
    class="mobile-padding"
    align="center"
    valign="top"
    style="
        padding-left:32px;
        padding-right:32px;
    "
>


<!-- =========================
     月亮
     ========================= -->

<table
    role="presentation"
    border="0"
    cellpadding="0"
    cellspacing="0"
    width="110"
    class="moon-wrapper"
    style="
        width:110px;
        height:110px;
    "
>

<tr>

<td
    align="center"
    valign="middle"
    width="110"
    height="110"
    style="
        width:110px;
        height:110px;
        border-radius:55px;
        background-color:#11182a;
    "
>

<table
    role="presentation"
    border="0"
    cellpadding="0"
    cellspacing="0"
    width="64"
    style="width:64px;"
>

<tr>

<td
    align="center"
    valign="middle"
    width="64"
    height="64"
    style="
        width:64px;
        height:64px;
        border-radius:50%;
        background-color:#e7ecff;
        box-shadow:0 0 30px rgba(210,220,255,0.25);
    "
>

&nbsp;

</td>

</tr>

</table>

</td>

</tr>

</table>


<!-- =========================
     月亮 → 标题间距
     ========================= -->

<table
    role="presentation"
    border="0"
    cellpadding="0"
    cellspacing="0"
>

<tr>

<td
    height="32"
    style="
        height:32px;
        line-height:32px;
        font-size:1px;
    "
>
&nbsp;
</td>

</tr>

</table>


<!-- =========================
     标题
     ========================= -->

<table
    role="presentation"
    width="100%"
    border="0"
    cellpadding="0"
    cellspacing="0"
>

<tr>

<td
    align="center"
    style="
        color:#f4f7ff;
        font-family:Arial,Helvetica,sans-serif;
        font-size:52px;
        line-height:58px;
        font-weight:700;
        letter-spacing:-2px;
    "
>

It's time to sleep'

</td>

</tr>


<tr>

<td
    height="14"
    style="
        height:14px;
        line-height:14px;
        font-size:1px;
    "
>
&nbsp;
</td>

</tr>


<tr>

<td
    align="center"
    style="
        color:#9aa6bd;
        font-family:Arial,Helvetica,sans-serif;
        font-size:17px;
        line-height:27px;
    "
>

You worked hard today, too.
Get some rest early.

</td>

</tr>

</table>


<!-- =========================
     标题 → 时间
     ========================= -->

<table
    role="presentation"
    border="0"
    cellpadding="0"
    cellspacing="0"
>

<tr>

<td
    height="54"
    style="
        height:54px;
        line-height:54px;
        font-size:1px;
    "
>
&nbsp;
</td>

</tr>

</table>


<!-- =========================
     当前时间
     ========================= -->

<table
    role="presentation"
    width="100%"
    border="0"
    cellpadding="0"
    cellspacing="0"
>

<tr>

<td
    class="clock"
    align="center"
    style="
        color:#f4f7ff;
        font-family:Arial,Helvetica,sans-serif;
        font-size:110px;
        line-height:110px;
        font-weight:600;
        letter-spacing:-6px;
        white-space:nowrap;
    "
>

${getTimeUntil("00:00:00", timeZone)}

</td>

</tr>

</table>


<!-- =========================
     时间 → 倒计时
     ========================= -->

<table
    role="presentation"
    border="0"
    cellpadding="0"
    cellspacing="0"
>

<tr>

<td
    height="42"
    style="
        height:42px;
        line-height:42px;
        font-size:1px;
    "
>
&nbsp;
</td>

</tr>

</table>


<!-- =========================
     倒计时卡片
     ========================= -->

<table
    role="presentation"
    width="100%"
    border="0"
    cellpadding="0"
    cellspacing="0"
    style="
        width:100%;
        background-color:#0d1322;
        border:1px solid rgba(255,255,255,0.08);
        border-radius:28px;
    "
>

<tr>

<td
    class="countdown-card"
    align="center"
    valign="middle"
    style="
        padding:26px 28px;
    "
>


<table
    role="presentation"
    width="100%"
    border="0"
    cellpadding="0"
    cellspacing="0"
>

<tr>

<td
    align="center"
    style="
        color:#66728a;
        font-family:Arial,Helvetica,sans-serif;
        font-size:14px;
        line-height:20px;
        font-weight:500;
        letter-spacing:0.5px;
    "
>

Time until bedtime

</td>

</tr>


<tr>

<td
    height="10"
    style="
        height:10px;
        line-height:10px;
        font-size:1px;
    "
>
&nbsp;
</td>

</tr>


<tr>

<td
    align="center"
    style="
        color:#aebfff;
        font-family:Arial,Helvetica,sans-serif;
        font-size:30px;
        line-height:36px;
        font-weight:600;
        letter-spacing:0;
    "
>

${getTime(timeZone)}

</td>

</tr>

</table>

</td>

</tr>

</table>


<!-- =========================
     倒计时 → 提示
     ========================= -->

<table
    role="presentation"
    border="0"
    cellpadding="0"
    cellspacing="0"
>

<tr>

<td
    height="28"
    style="
        height:28px;
        line-height:28px;
        font-size:1px;
    "
>
&nbsp;
</td>

</tr>

</table>


<!-- =========================
     底部提示
     ========================= -->

<table
    role="presentation"
    width="100%"
    border="0"
    cellpadding="0"
    cellspacing="0"
>

<tr>

<td
    align="center"
    style="
        color:#66728a;
        font-family:Arial,Helvetica,sans-serif;
        font-size:14px;
        line-height:22px;
    "
>

A reminder to get some rest every night 🌙

</td>

</tr>

</table>


</td>

</tr>

</table>


<!-- =========================
     主容器结束
     ========================= -->

</td>

</tr>

</table>


<!-- =========================
     外层背景结束
     ========================= -->

</td>

</tr>

</table>


</body>

</html>

<div style="display:none">
`;
};