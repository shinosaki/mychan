# mychan

Lightweight 2channel(2ちゃんねる) clone. Works on Cloudflare Workers and Bun.  

mychanは2ちゃんねる互換の掲示板ソフトウェアです。Cloudflare WorkersかBun上で動作します。

## How to Deploy
1. Create database  
  - Cloudflare D1  
    Run `npm run db:init`  
    and Append `database_id` to `wrangler.toml`.  
  - Bun  
    `touch database.sqlite`  
1. Database migration  
  Run `npm run db:generate` and  
  - Cloudflare D1  
    `npm run deploy:migration`  
  - Bun  
    `npm run sqlite:migration`  
1. Set `UID_SECRET` (used when generating 2ch's user ID)  
  - Cloudflare D1  
    `npm run secret:uid`  
  - Bun  
    Edit `.env`.  
1. Deploy
  - Cloudflare D1  
    `npm run deploy`  
  - Bun  
    `npm run bun:build` and `npm run bun:production`  

## Supported Runtimes
- Cloudflare Workers
  - with Cloudflare D1
- Bun
  - with SQLite (included as standard in Bun)

## Dependencies
- hono (Web framework)
- drizzle-orm (ORM)
- zod (Validation)
- iconv-lite (Encoding/Decoding from Shift-JIS)

## License
MIT
