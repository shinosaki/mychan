import { boards } from '$config';
import { sjis } from '$lib/utils';

export const checkBoard = () => {
  return async (c, next) => {
    const { board } = c.req.param();
    if (!(board in boards)) {
      return c.notFound();
    };

    await next();
  };
};

export const realIP = () => {
  return async (c, next) => {
    const cfip = c.req.header('CF-Connecting-IP');
    const xfip = c.req.header('X-Forwarded-For');
    c.realip = cfip ?? xfip ?? '127.0.0.1';

    await next();
  }
};

export const sjisResponse = () => {
  return async (c, next) => {
    c.sjis = {
      text: (value, status = 200) => {
        c.header('Content-Type', 'text/plain; charset=shift_jis');
        return c.body(sjis(value), status);
      },

      html: (value, status = 200) => {
        c.header('Content-Type', 'text/html; charset=shift_jis');
        return c.body(sjis(value), status);
      }
    };

    await next();
  }
};
