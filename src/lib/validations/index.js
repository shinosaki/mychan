// import { z } from 'zod'
// import { zValidator } from '@hono/zod-validator'

// export const rules = {
//   bbs: z.string().trim(),
//   key: z.coerce.number(),
//   FROM: z.string().trim(),
//   mail: z.string().trim(),
//   subject: z.string().trim(),
//   MESSAGE: z.string(),
// };

// export const validation = (schema, target = 'form') => {
//   return zValidator(target, schema, (r, c) => {
//     if (!r.success) {
//       return c.json({ status: false, message: 'Invalid request' }, 400);
//     };
//   });
// };
