import type { Config } from '@react-router/dev/config';

export default {
  // ssr: true,
  async prerender() {
    return ['/', '/projects', '/about'];
  },
} satisfies Config;
