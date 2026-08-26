import html from "./mail-text";

const send = async (target, timeZone, dotenv) => {

    const res = await fetch("https://api.deomail.com/v1/send", {
      method: "POST",
      headers: {
        "X-API-Key": dotenv.DEOMAIL_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: dotenv.DEOMAIL_ADDRESS,
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

    let timeZone = "Asia/Singapore"
    let target = "hiernymus@proton.me"

    return await send(target, timeZone, env)
  },

  async scheduled(controller, env, ctx) {

    const userValueString = await env.KV.get(controller.cron)
    const userValue = JSON.parse(userValueString)


    const timeZone = userValue[0]
    const target = userValue[1]

    console.log("env.DEOMAIL_API_KEY")
    console.log(env.DEOMAIL_API_KEY)

    return await send(target, timeZone, env)
  }
};