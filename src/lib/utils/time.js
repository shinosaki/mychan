const zeroPad = (value, length = 2) => value.toString().padStart(length, '0');
const Join = (arr, separator = '-') => arr.join(separator);
const isDate = (date) => !Number.isNaN(date.getTime());

export const timestamp = (now = Date.now()) => ({
  sec: Math.trunc(now / 1000),
  msec: now,
});

export const ParseDate = (raw) => {
  const date = (raw instanceof Date) ? raw
    : (Number(raw)) ? new Date((raw.length === 10) ? Number(raw) * 1000 : Number(raw))
    : new Date(raw);

  if (!isDate(date)) {
    throw new Error('Invalid Date');
  };

  const yyyy = date.getFullYear().toString();
  const mm = zeroPad(date.getMonth());
  const dd = zeroPad(date.getDate());
  const HH = zeroPad(date.getHours());
  const MM = zeroPad(date.getMinutes());
  const SS = zeroPad(date.getSeconds());
  const msec = zeroPad(date.getMilliseconds());

  const Month = (locale = 'default', format) => date.toLocaleString(locale, { month: format });
  const Week =  (locale = 'default', format) => date.toLocaleString(locale, { weekday: format });

  return {
    raw,
    date,
    yyyy,
    mm,
    dd,
    HH,
    MM,
    SS,
    SSS: msec,
    msec,

    dat2ch: `${yyyy}/${mm}/${dd}(${Week('ja', 'short')}) ${HH}:${MM}:${SS}.${msec}`,

    Month: (locale = 'en') => Month(locale, 'long'),
    month: (locale = 'en') => Month(locale, 'short'),

    Week: (locale = 'en') => Week(locale, 'long'),
    week: (locale = 'en') => Week(locale, 'short'),

    yymmdd:   (s) => Join([ yyyy, mm, dd ], s),
    yyyymmdd: (s) => Join([ yyyy, mm, dd ], s),
    
    mmddyy:   (s) => Join([ mm, dd, yyyy ], s),
    mmddyyyy: (s) => Join([ mm, dd, yyyy ], s),
    
    ddmmyy:   (s) => Join([ dd, mm, yyyy ], s),
    ddmmyyyy: (s) => Join([ dd, mm, yyyy ], s),
  };
};
