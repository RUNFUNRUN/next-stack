import { getAuth } from '@/lib/auth';
import { schema } from '@/lib/schema';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { createMiddleware } from 'hono/factory';

export const authMiddleware = createMiddleware<{
  Variables: {
    session: typeof schema.user.$inferSelect;
  };
}>(async (c, next) => {
  try {
    const { env } = await getCloudflareContext();
    const auth = await getAuth(env.DB);

    const session = await auth.api.getSession({ headers: c.req.raw.headers });
    if (!session) {
      return c.json({}, 401);
    }

    const db = drizzle(env.DB, { schema });

    const user = await db.query.user.findFirst({
      where: eq(schema.user.id, session.user.id),
    });
    if (!user) {
      return c.json({}, 401);
    }

    c.set('session', user);
    await next();
  } catch {
    return c.json({}, 500);
  }
});
