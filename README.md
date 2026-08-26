# Sleep Reminder

A lightweight sleep reminder service built with [Cloudflare Workers](https://workers.cloudflare.com/).

It uses **Cloudflare Workers KV** to store individual sleep reminder schedules and **[DeoMail](https://deomail.com/)** to send reminder emails automatically.

## How It Works

The Worker is periodically invoked by a **Cloudflare Cron Trigger**.

The Cron Trigger only wakes up the Worker. User-specific reminder schedules are stored in Workers KV.

```text
Cloudflare Cron Trigger
          │
          ▼
     Worker wakes up
          │
          ▼
      Read KV keys
          │
          ▼
   Read each schedule
          │
          ▼
 Calculate user's local time
          │
          ▼
    Match cron expression
          │
       ┌──┴──┐
       │     │
     Match  No match
       │     │
       ▼     ▼
 Send email  Skip
    │
    ▼
 DeoMail API
```

Cloudflare Cron Triggers invoke the Worker's `scheduled()` handler. The Worker then checks the reminder schedules stored in KV.

## Storage Format

Each reminder is stored as one key-value pair in Workers KV.

For example:

```text
Key:
0 5 * * *

Value:
["Asia/Singapore", "hiernymus@mail.com"]
```

The **key** is the user's cron expression.

The **value** is a JSON array containing:

1. The user's IANA timezone
2. The recipient's email address

For example:

```json
["Asia/Singapore", "hiernymus@mail.com"]
```

Each reminder has its own KV key.

This project does **not** group multiple users under the same schedule.

## Example

Suppose the KV namespace contains:

```text
0 5 * * * → ["Asia/Singapore", "hiernymus@mail.com"]

30 5 * * * → ["Asia/Tokyo", "example@example.com"]

0 6 * * 1-5 → ["Europe/Berlin", "someone@example.com"]
```

When the Worker runs, it checks each schedule against the current local time of the corresponding timezone.

If a schedule matches, the Worker sends the reminder email.

## Cron Expressions

Reminder schedules use five-field cron expressions.

Examples:

```text
0 5 * * *
```

Every day at 05:00.

```text
30 5 * * *
```

Every day at 05:30.

```text
0 6 * * 1-5
```

Every weekday at 06:00.

The cron expression is interpreted using the timezone stored in the corresponding KV value.

## Timezones

Timezones use standard **IANA timezone identifiers**.

Examples:

```text
Asia/Singapore
Asia/Tokyo
Europe/London
America/New_York
```

For example:

```text
0 5 * * * → ["Asia/Singapore", "hiernymus@mail.com"]
```

means that the reminder is scheduled for **05:00 in Singapore time**.

## Email Delivery

Emails are sent through **[DeoMail](https://deomail.com/)** using its REST API.

DeoMail provides an API endpoint for sending emails:

```text
POST https://api.deomail.com/v1/send
```

The API uses an API key supplied through the `X-API-Key` HTTP header.

A typical request looks like:

```json
{
  "from": "sleep@example.com",
  "to": ["hiernymus@mail.com"],
  "subject": "It's time to sleep",
  "html": "<p>It's time to sleep. You worked hard today, too.</p>"
}
```

The API supports both HTML and plain-text email bodies.

### DeoMail API Key

Configure the DeoMail API key as a Cloudflare Worker secret:

```text
DEOMAIL_API_KEY
```

Do **not** put the API key directly in the source code or commit it to Git.

DeoMail's API documentation also recommends keeping API keys secret and never exposing them in client-side code.

## Architecture

The project consists of three main services:

### Cloudflare Workers

Runs the application logic and handles scheduled invocations.

### Cloudflare Workers KV

Stores the reminder schedules.

The data structure is intentionally simple:

```text
cron expression → [timezone, email]
```

### DeoMail

Delivers the actual reminder emails through its REST API.

```text
┌──────────────────────┐
│ Cloudflare Cron      │
│ Trigger              │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Cloudflare Worker    │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Workers KV            │
│                      │
│ cron → user config   │
└──────────┬───────────┘
           │
           │ matched reminder
           ▼
┌──────────────────────┐
│ DeoMail API          │
│ POST /v1/send        │
└──────────┬───────────┘
           │
           ▼
        Email
```

## Configuration

The project requires a DeoMail API key.

For example:

```env
DEOMAIL_API_KEY=your_api_key
```

The actual secret should be configured through Cloudflare rather than committed to the repository.

## KV Binding

Bind your KV namespace to the Worker.

For example:

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "sleep-reminder",

  "kv_namespaces": [
    {
      "binding": "KV",
      "id": "YOUR_KV_NAMESPACE_ID"
    }
  ]
}
```

The binding is then available inside the Worker as:

```js
env.KV
```

Cloudflare Workers KV supports reading and listing stored keys from a Worker.

## Cron Trigger

The Cloudflare Cron Trigger should run frequently enough to check the stored schedules.

For example:

```jsonc
{
  "triggers": {
    "crons": [
      "* * * * *"
    ]
  }
}
```

This runs the Worker every minute.

The Cron Trigger is **not** used to represent individual users' sleep schedules.

Instead:

```text
Cloudflare Cron Trigger
        │
        │ wakes Worker
        ▼
     Worker
        │
        │ checks
        ▼
   Workers KV
        │
        │ user schedule
        ▼
   Cron expression
```

## Deployment

Install Wrangler:

```bash
npm install -g wrangler
```

Log in to Cloudflare:

```bash
wrangler login
```

Configure your KV namespace and `DEOMAIL_API_KEY`, then deploy:

```bash
wrangler deploy
```

## Local Development

Start the Worker locally:

```bash
npx wrangler dev --test-scheduled
```

You can trigger the scheduled handler locally with:

```bash
curl "http://localhost:8787/__scheduled?cron=*+*+*+*+*"
```

This allows the scheduled Worker logic to be tested without waiting for an actual Cloudflare Cron Trigger.

## Managing Reminders

A reminder can be created by writing its cron expression as the KV key and its configuration as the value.

For example:

```js
await env.KV.put(
  "0 5 * * *",
  JSON.stringify([
    "Asia/Singapore",
    "hiernymus@mail.com"
  ])
);
```

The Worker can enumerate the configured reminders and retrieve their values.

For large KV namespaces, implementations should handle KV list pagination using the returned cursor.

## Why Cloudflare Workers?

This project does not require a continuously running server.

The Worker only needs to wake up periodically, inspect the reminder schedules, and send an email when necessary.

This makes Cloudflare Workers a convenient platform for the project.

## License

This project is licensed under the **GNU Affero General Public License v3.0 (AGPL-3.0)**.

See [`LICENSE`](LICENSE) for the full license text.

## Third-Party Services

This project uses the following services:

* **Cloudflare Workers** — application runtime and scheduled execution
* **Cloudflare Workers KV** — reminder schedule storage
* **DeoMail** — email delivery API

Their respective terms and policies apply when using these services.

## Disclaimer

This project is provided **"as is"**, without warranty of any kind.

You are responsible for:

* Protecting your API credentials
* Configuring your Cloudflare account correctly
* Configuring your DeoMail account correctly
* Ensuring that your use of the services complies with their terms
* Ensuring that your use of the service complies with applicable laws
