import { Hono } from 'hono';
import { boards } from '$config';
import bbs from './bbs';
import read from './read';

const app = new Hono();

app.post('/bbs.cgi', bbs.validator, bbs.post);
app.get('/read.cgi/:boardName/:id{[0-9]+\/?l?[0-9]{0,4}[-,]?[0-9]{0,4}}', read.get);

export default app;
