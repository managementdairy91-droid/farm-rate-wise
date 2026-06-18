// @lovable.dev/vite-tanstack-config ships with sensible defaults for the Lovable
// sandbox (Cloudflare Workers). For Vercel deployments we switch the Nitro
// preset to "vercel" so `vite build` emits the `.vercel/output/` directory
// that Vercel auto-detects.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const isVercel = !!process.env.VERCEL;

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  // Only override when building on Vercel — keep Cloudflare defaults for Lovable previews/publish.
  ...(isVercel
    ? {
        nitro: {
          preset: "vercel",
        } as any,
      }
    : {}),
});
