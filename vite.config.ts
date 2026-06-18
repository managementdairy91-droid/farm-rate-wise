// @lovable.dev/vite-tanstack-config ships with sensible defaults for the Lovable
// sandbox (Cloudflare Workers). For Vercel deployments we switch the Nitro
// preset to "vercel" so `vite build` emits the `.vercel/output/` directory
// that Vercel auto-detects, and we DO NOT override the server entry — the
// custom src/server.ts wrapper is Cloudflare-Workers-shaped and would 404
// every route on Vercel.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const isVercel = !!process.env.VERCEL;

export default defineConfig({
  // Only use the custom Cloudflare wrapper when NOT on Vercel.
  ...(isVercel
    ? {
        nitro: {
          preset: "vercel",
        } as any,
      }
    : {
        tanstackStart: {
          server: { entry: "server" },
        },
      }),
});
