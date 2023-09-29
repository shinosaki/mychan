import { Hono } from 'hono';
import { boards } from '$config';
import { Layout, Board, Subback } from '$lib/layouts';
import { getSubjects } from '$db';
import subject from './subject';
import setting from './setting';
import dat from './dat';

const app = new Hono();

app.get('/subject.txt', subject.get);
app.get('/SETTING.TXT', setting.get);
app.get('/dat/:id{[0-9]+\.dat}', dat.get);

app.get('/subback.html', async c => {
  const { board } = c.req.param();

  const { subjects } = await getSubjects(c, board);

  return c.html(
    <Layout {...{ title: boards[board].title.name + 'のスレッド一覧' }}>
      {(subjects.length)
        ? <Subback {...{ board, subjects }} />
        : <p>スレッドはありません</p>
      }
    </Layout>
  );
});


export default app;
