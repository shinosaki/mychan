import { sha1, escaping, unescaping, ParseDate } from '$lib/utils';

export const genUID = async (c, bbs) => {
  // http://age.s22.xrea.com/talk2ch/id.txt
  const ip = await sha1(c.realip);
  const date = ParseDate(new Date()).yyyymmdd();
  const secret = c.env.UID_SECRET ?? process.env.UID_SECRET ?? 'secret';

  const { hex } = await sha1(ip.hex.slice(-4) + bbs + date + secret);
  return btoa(hex).slice(0, 8);
};

export const DAT = (options = {}) => {
  const { id, name, mail, message, subject } = options;

  return [
    escaping(name),
    escaping(mail),
    `${ParseDate(new Date()).dat2ch} ID:${id}`,
    escaping(message),
    escaping(subject)
  ].join('<>') + '\n';
};

export const parseDat = (dat) => {
  const lines = dat.split('\n');
  const subject = lines[0].split('<>').pop();

  const comments = lines.filter(v=>v).map((v, i) => {
    const [ name, mail, meta, rawMessage ] = v.split('<>');
    const [ rawDate, uid, be ] = meta.split(/ ID:| BE:/);

    // タイムゾーン周りを考慮しないといけない
    // '2023/08/27(水) 17:15:13.363'
    // to [ "2023", "08", "27", "水", "", "17", "15", "13", "363" ]
    const [ year, month, day, week, _, hour, min, sec, msec ] = rawDate.split(/[\/\(\)\s\.:]/);
    const date = new Date(year, month - 1, day, hour, min, sec, msec);

    return {
      id: i + 1,
      message: unescaping(rawMessage),
      uid, be, name, mail, date, rawDate, rawMessage,
    };
  });

  return {
    res: lines.length - 1,
    subject,
    comments,
  };
};

// const today = () => {
//   const date = new Date()

//   date.setHours(0)
//   date.setMinutes(0)
//   date.setSeconds(0)
//   date.setMilliseconds(0)

//   return date.getTime()
// }

// const rand16 = async (salt = 'random') => {
//   const { buffer } = await sha1(today() + salt)

//   const hashBInt = new DataView(buffer).getBigInt64(0, false);
//   const hash16byte = Math.abs(Number(hashBInt)).toString().slice(0, 16)

//   return Number(hash16byte)
// }
