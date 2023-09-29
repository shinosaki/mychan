import { html } from 'hono/html';

export const escaping = raw => {
  // https://stackoverflow.com/a/6234804
  return (raw)
    ? raw.replaceAll('&', '&amp;')
         .replaceAll('<', '&lt;')
         .replaceAll('>', '&gt;')
         .replaceAll('"', '&quot;')
         .replaceAll("'", '&#039;')
         .replaceAll(/\r?\n/g, '<br>')
    : raw;
};

export const unescaping = raw => {
  return (raw)
    ? raw.replaceAll(/(h?ttps?:\/\/[\w:@\-\.\/\?#=]+)/ig, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>')
    : raw;
};
