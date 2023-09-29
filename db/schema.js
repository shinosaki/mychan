import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

const $timestamp = (name) => {
  // https://github.com/drizzle-team/drizzle-orm/blob/a7dc7e8bbdc3784f67ff32ce39bee3283f080751/examples/libsql/src/schema.ts
  return integer(name, { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`);
};

export const threads = sqliteTable('threads', {
  id: integer('id').primaryKey().default(sql`(strftime('%s', 'now'))`),
  archived: integer('archived', { mode: 'boolean' }).default(false).notNull(),
  board: text('board').notNull(),
  dat: text('dat'),
  createdAt: $timestamp('created_at').notNull(),
  updatedAt: $timestamp('updated_at').notNull(),
});

// [Feature] update updated_at in sqlite
// https://github.com/drizzle-team/drizzle-orm/issues/843
