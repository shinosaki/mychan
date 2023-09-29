import { z } from 'zod';
import { sjis2utf8, DAT, genUID } from '$lib/utils';
import { boards } from '$config';
import { createThread, updateThread } from '$db';

export default {
  validator: async (c, next) => {    
    const arrayBuffer = c.req.bodyCache.arrayBuffer ?? (await c.req.raw.arrayBuffer());

    const decode = new TextDecoder().decode(arrayBuffer);
    const form = (decode.includes('新規スレッド作成'))
      ? Object.fromEntries(new URLSearchParams(decode))
      : Object.fromEntries(new URLSearchParams(sjis2utf8(arrayBuffer)));

    if (!(form.bbs in boards)) {
      return c.sjis.text('ＥＲＲＯＲ: 板が存在しません', 400);
    };

    const { limit } = boards[form.bbs];

    const parsed = z.object({
      bbs: z.string().trim(),
      key: z.coerce.number().optional(),
      FROM: z.string().trim().max(limit.name).optional(),
      mail: z.string().trim().max(limit.mail),
      subject: z.string().trim().max(limit.subject).optional(),
      MESSAGE: z.string().max(limit.message),
      submit: z.string(),
    }).safeParse(form);

    if (!parsed.success) {
      console.error(parsed.error)
      return c.sjis.text('ＥＲＲＯＲ: 不正なリクエスト', 400)
    };
    
    c.req.addValidatedData('form', parsed.data);
    await next();
  },

  post: async c => {
    const url = new URL(c.req.url);
    let { bbs, key, FROM, mail, subject, MESSAGE, submit } = c.req.valid('form');

    if (!['書き込む', '新規スレッド作成'].includes(submit)) {
      return c.sjis.text('ＥＲＲＯＲ: 不正なリクエスト', 400);
    };

    const dat = DAT({
      id: await genUID(c, bbs),
      name: FROM || boards[bbs].nanashi,
      mail,
      subject,
      message: MESSAGE,
    });

    let data;
    if (key) {
      // 書き込み
      data = await updateThread(c, key, dat);
      if (!data) {
        return c.sjis.text('ＥＲＲＯＲ: 書き込みに失敗しました', 500);
      };
    } else {
      // スレ立て
      data = await createThread(c, bbs, dat);
      if (!data) {
        return c.sjis.text('ＥＲＲＯＲ: スレッドを作成できません', 500);
      };
    };

    return c.sjis.html(
<html lang="ja">
<head>
<title>書きこみました。</title>
<meta http-equiv="Content-Type" content="text/html; charset=Shift_JIS" />
<meta content={`1;URL=//${url.host}/test/read.cgi/${data.board}/${data.id}`} http-equiv="refresh" />
</head>
<body>書きこみが終わりました。<br /><br />
画面を切り替えるまでしばらくお待ち下さい。<br /><br />
</body>
</html>
    );
  }
};