import type { OpenNextConfig } from '@opennextjs/aws/types/open-next.js';
import cache from '@opennextjs/cloudflare/kv-cache';

export default {
  default: {
    override: {
      wrapper: 'cloudflare-node',
      converter: 'edge',
      // Set `incrementalCache` to "dummy" to disable KV cache
      incrementalCache: async () => cache,
      tagCache: 'dummy',
      queue: 'dummy',
    },
  },
  middleware: {
    external: true,
    override: {
      wrapper: 'cloudflare-edge',
      converter: 'edge',
      proxyExternalRequest: 'fetch',
    },
  },
} satisfies OpenNextConfig;
