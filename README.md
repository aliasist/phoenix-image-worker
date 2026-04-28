# phoenix-image-worker

**Text-to-image** Cloudflare Worker for the Aliasist org — generates images from prompts via the configured AI provider.

**Suite:** [aliasist.com](https://aliasist.com)

## Setup

```bash
npm install
```

Configure API keys via **Wrangler secrets** or a local `.dev.vars` file (not committed) as required by the worker code.

## Develop & deploy

```bash
npx wrangler dev
npx wrangler deploy
```

See `wrangler.toml` for worker name, compatibility date, and bindings.

## Notes

- Do not commit `.dev.vars` or real secrets.
- Tune model and safety settings in source to match your product policy.
