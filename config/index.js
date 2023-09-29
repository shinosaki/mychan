export const config = {
  app: {
    name: 'mychan掲示板'
  }
};

export const boards = {
  // https://info.5ch.net/index.php/SETTING.TXT
  poverty: {
    // cookie: true,
    // turnstile: true,
    title: {
      name: 'まいちゃん(嫌儲)', // BBS_TITLE, BBS_TITLE_ORIG
      logo: null, // BBS_TITLE_PICTURE
    },
    nanashi: 'セルフホストの名無し', // BBS_NONAME_NAME
    limit: {
      subject: 128, // BBS_SUBJECT_COUNT
      name: 96, // BBS_NAME_COUNT
      mail: 96, // BBS_MAIL_COUNT
      message: 4096, // BBS_MESSAGE_COUNT
      thread: 8 // BBS_THREAD_TATESUGI
    }
  }
};
