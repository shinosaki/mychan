import { Hono } from 'hono';
import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';
import APP from './app';

const app = new Hono();

app.use('*', async (c, next) => {
  c.db = drizzle(new Database(process.env.DB ?? 'database.sqlite'));
  await next();
});
app.route('/', APP);

export default app;
