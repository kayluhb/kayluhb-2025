## Development

Run the dev server:

```sh
pnpm run dev
```

To run Wrangler:

```sh
pnpm run build
pnpm start
```

## Typegen

Generate types for your Cloudflare bindings in `wrangler.toml`:

```sh
pnpm run typegen
```

You will need to rerun typegen whenever you make changes to `wrangler.toml`.

## Deployment

```sh
pnpm run deploy
```
