import iconv from 'iconv-lite';

export const sjis = (v) => iconv.encode(v, 'SJIS');
export const utf8 = (v) => iconv.decode(v, 'SJIS');

const percent2bytes = (encoded) => {
  const data = [];

  for (let i = 0; i < encoded.length; i++) {
    (encoded[i] === '%')
      ? (
        data.push(parseInt(encoded.slice(i + 1, i + 3), 16)),
        i += 2
      )
      : data.push(encoded.charCodeAt(i));
  };

  return new Uint8Array(data);
};

export const sjis2utf8 = (body) => {
  const str = new TextDecoder().decode(body);

  try {
    decodeURIComponent(str);
    return str;
  } catch {
    return iconv.decode(percent2bytes(str), 'Shift_JIS');
  };
};
