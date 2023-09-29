import { Hono } from 'hono';
import { board, test } from '$routes';
import { config, boards } from '$config';
import { Layout, Board } from '$lib/layouts';
import { realIP, sjisResponse } from '$lib/middlewares';

const app = new Hono();

app.use('*', realIP()); // c.realip
app.use('*', sjisResponse()); // c.sjis

app.get('/', c => c.html(
  <Layout {...{ title: config.app.name, siteName: false }} >
    <main>
      <h1>{config.app.name}</h1>
      <hr />
      <h2>板一覧</h2>
      <ul>
        {Object.keys(boards).map(key => (
          <li>
            <a href={`/${key}`}>{boards[key].title.name}</a>
          </li>
        ))}
      </ul>
    </main>
  </Layout>
));

app.route('/test', test);
app.route(`/:board{${ Object.keys(boards).join('|') }}`, board);

app.get(`/:board{${Object.keys(boards).join('|')}/?}`, c => {
  const board = c.req.param('board').replace(/\/$/, '');
  return c.html(
    <Layout {...{ title: boards[board].title.name }}>
      <Board {...{ board }} />
    </Layout>
  )
});

export default app;
