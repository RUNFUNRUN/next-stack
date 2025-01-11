import { drizzle } from 'drizzle-orm/d1';
import { schema } from './schema';

export const getDB = (db: D1Database) => {
  return drizzle(db, { schema });
};
