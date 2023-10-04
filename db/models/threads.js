import { desc, eq, and, sql } from "drizzle-orm";
import { threads } from '$db';

const first = r => r.length ? r[0] : null;

export const allThreads = ({db}) =>
  db.select()
    .from(threads)
    .all();

export const boardThreads = ({db}, board) =>
  db.select()
    .from(threads)
    .where(eq(threads.board, board))
    .all();

export const getSubjects = async ({db}, board) => {
  const data = await db.select({ id: threads.id, dat: threads.dat })
    .from(threads)
    .where(
      and(
        eq(threads.board, board),
        eq(threads.archived, false)
      )
    )
    .orderBy(desc(threads.createdAt))
    .all();

  const subjects = data.map(({ id, dat }) => {
    const lines = dat.split('\n');
    const length = lines.length - 1;
    const subject = lines[0].split('<>').pop();

    return { id, subject, length };
  });

  return {
    subjects,
    text: subjects.map(v => `${v.id}.dat<>${v.subject} (${v.length})\n`).join('')
  };
};

export const getThread = ({db}, id) =>
  db.select()
    .from(threads)
    .where(eq(threads.id, id))
    .limit(1)
    .then(r => first(r));

export const getDat = ({db}, id) =>
  db.select({ dat: threads.dat })
    .from(threads)
    .where(eq(threads.id, id))
    .limit(1)
    .then(r => first(r));

export const createThread = ({db}, board, dat) =>
  db.insert(threads)
    .values({ board, dat })
    .returning({ id: threads.id, board: threads.board })
    .then(r => first(r));

export const archivedThread = ({db}, id) =>
  db.update(threads)
    .set({ archived: true })
    .where(eq(threads.id, id));

export const updateThread = async ({db}, id, dat) => {
  const data = await db.update(threads)
    .set({
      dat: sql`${threads.dat} || ${dat}`,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(threads.id, id),
        eq(threads.archived, false)
      )
    )
    .returning({ id: threads.id, board: threads.board, dat: threads.dat })
    .then(r => first(r));

  if (data?.dat.split('\n').length >= 1000) {
    await archivedThread({db}, id);
  };

  return data;
};
