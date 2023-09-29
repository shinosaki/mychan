export const sha = async (value, algo = 'SHA-1') => {
  const data = new TextEncoder().encode(value);
  const buffer = await crypto.subtle.digest(algo, data);

  return {
    buffer,
    hex: [...new Uint8Array(buffer)]
      .map(b => b.toString(16).padStart(2, '0'))
      .join(''),
  };
};

export const sha1 = (v) => sha(v, 'SHA-1');
export const sha256 = (v) => sha(v, 'SHA-256');
export const sha384 = (v) => sha(v, 'SHA-384');
export const sha512 = (v) => sha(v, 'SHA-512');
