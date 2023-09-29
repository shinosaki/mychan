export * from './hash';
export * from './time';
export * from './2ch';
export * from './encoding';
export * from './escaping';

export const parseRange = (v) => {
  const [ id, range ] = v.split('/');
  const [ start, end ] = range.split(/l|-/);

  return {
    id,
    start: start || '0',
    end,
    res: (range.includes(',')) ? range.split(',') : null
  };
};
