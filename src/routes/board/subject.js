import { getSubjects } from '$db';

export default {
  get: async c => {
    const { board } = c.req.param();

    const data = await getSubjects(c, board);

    if (!data) {
      return c.sjis.text('ＥＲＲＯＲ: データの取得に失敗しました。', 500);
    };

    // const body = data.map(({ id, dat }) => {
    //   const lines = dat.split('\n');
    //   const subject = lines[0].split('<>').pop();

    //   return `${id}.dat<>${subject} (${lines.length})\n`;
    // }).join('');

    return c.sjis.text(data.text);
  }
};
