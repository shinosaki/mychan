# mychan

Lightweight 2channel(2ちゃんねる) clone. Works on Cloudflare Workers and Bun.  
Like `zerochplus` or `d1ch.cc`.

mychanは2ちゃんねる互換の掲示板ソフトウェアです。Cloudflare WorkersかBun上で動作します。  

## How to Deploy
1. Edit `config/index.js`.  
   `boards` settings are based on [2ch's SETTING.TXT](https://info.5ch.net/index.php/SETTING.TXT).
   ```js
   export const config = {
     app: {
       name: 'mychan掲示板' // Website's name
     }
   };
   
   export const boards = {
     poverty: { // Object's key is the board name
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
   ```
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
