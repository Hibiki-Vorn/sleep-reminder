import html from "./mail-text";

const send = async (target, timeZone) => {

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
        html: html(timeZone),
      }),
    });
    const data = await res.json();
    const reply = JSON.stringify(data)

    return new Response(reply);
}

export default {
  async fetch(request, env, ctx) {
    return await send("hiernymus@proton.me")
  },

  async scheduled(controller, env, ctx) {

    let timeZone = "Asia/Singapore"
    let target = "hiernymus@proton.me"

    if (controller.cron = "0 5 * * *") {
        timeZone = "America/Chicago"
        target = "podyqt@gmail.com"
    }

    if (controller.cron = "0 16 * * *") {
        timeZone = "Asia/Singapore"
        target = "hiernymus@proton.me"
    }

    return await send(target, timeZone)
  }
};