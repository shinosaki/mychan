import { html } from 'hono/html';

export const KakikomiForm = (props) => (
  <form action="/test/bbs.cgi" method="POST" accept-charset="Shift_JIS" style="display: grid; gap: 1rem;">
    <input type="hidden" name="bbs" value={props.board} />
    <input type="hidden" name="key" value={props.id} />

    <label style="display: grid; grid-template-columns: 1fr 2fr;">
      <span>名前</span>
      <input type="text" name="FROM" />
    </label>

    <label style="display: grid; grid-template-columns: 1fr 2fr;">
      <span>Email</span>
      <input type="text" name="mail" />
    </label>

    <label style="display: grid; grid-template-columns: 1fr 2fr;">
      <span>本文</span>
      <textarea name="MESSAGE" />
    </label>

    {(props.archived)
      ? <p style="text-align: center">このスレッドには書き込めません</p>
      : <button name="submit" value="書き込む">書き込む</button>
    }
  </form>
);

export const Comments = (props) => (
  <ul>
    {props.comments.map(({ id, name, mail, date, uid, message }) => (
      <li>
        <p>
          <span>{id}</span>
          {mail ? (<a href={`mailto:${mail}`}>{name}</a>) : (<span>{name}</span>)}
          <span>{date}</span>
          <span>{`ID:${uid}`}</span>
        </p>
        <div>{html(message)}</div>
      </li>
    ))}
  </ul>
);

export const Read = (props) => (
  <div>
    <h1>{props.subject}</h1>
    <a href={`/${props.board}/dat/${props.id}.dat`}>datを取得</a>
    <hr />

    <Comments {...props} />
    <hr />

    <KakikomiForm {...props} />
  </div>
);