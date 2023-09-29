import { Hono } from 'hono';
import { drizzle } from 'drizzle-orm/d1';
import APP from './app';

const app = new Hono();

app.use('*', async (c, next) => {
  c.db = drizzle(c.env.DB);
  await next();
});
app.route('/', APP);

export default app;
