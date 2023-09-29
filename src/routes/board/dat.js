import { getDat } from '$db';

export default {
  get: async c => {
    const { board } = c.req.param();
    const id = c.req.param('id').replace('.dat', '');

    const { dat } = await getDat(c, id);

    return (dat)
      ? c.sjis.text(dat)
      : c.sjis.text('ＥＲＲＯＲ: データの取得に失敗しました。', 500);
  }
};