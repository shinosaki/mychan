import { getThread } from '$db';
import { parseDat, parseRange } from '$lib/utils';
import { Read } from '$lib/layouts';

export default {
  get: async c => {
    const board = c.req.param('boardName');
    const [ id, range ] = c.req.param('id').split('/');

    const data = await getThread(c, id);

    if (!data) {
      return c.text('ＥＲＲＯＲ: データの取得に失敗しました。', 500);
    };

    let { subject, comments } = parseDat(data.dat);

    // if (range) {
    //   const { res, start, end } = parseRange(range);
    //   comments = (res)
    //     ? comments.filter(({ id }) => res.includes(id))
    //     : comments.filter(({ id }) => start <= id && id <= end);
    // };

    return c.html(
      <Read {...{ id, board, subject, comments, archived: data.archived }} />
    );
  }
};
