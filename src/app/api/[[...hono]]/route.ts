import { getAuth } from '@/lib/auth';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { authMiddleware } from './middleware';

const app = new Hono()
  .basePath('/api')
  .on(['GET', 'POST'], '/auth/**', (c) => {
    const { env } = getCloudflareContext();
    const auth = getAuth(env.DB);
    return auth.handler(c.req.raw);
  })
  .get('/hello', authMiddleware, (c) => {
    return c.json({ message: `Hello ${c.var.user.name} from Hono!` });
  });

export type AppType = typeof app;

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
