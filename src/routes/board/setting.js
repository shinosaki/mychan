export default {
  get: c => {
    const { board } = c.req.param();
    const { title, nanashi, limit } = boards[board];

    return c.sjis.text([
      board,
      `BBS_TITLE=${title.name ?? 'まいちゃん(管理)'}`,
      `BBS_TITLE_ORIG=${title.name ?? 'まいちゃん(管理)'}`,
      `BBS_TITLE_PICTURE=${title.logo ?? ''}`,
      `BBS_NONAME_NAME=${nanashi ?? 'まいちゃん'}`,
      `BBS_SUBJECT_COUNT=${limit.subject ?? '96'}`,
      `BBS_NAME_COUNT=${limit.name ?? '96'}`,
      `BBS_MAIL_COUNT=${limit.mail ?? '96'}`,
      `BBS_MESSAGE_COUNT=${limit.message ?? '4096'}`,
      `BBS_THREAD_TATESUGI=${limit.thread ?? '8'}`
    ].join('\n'));
  }
};