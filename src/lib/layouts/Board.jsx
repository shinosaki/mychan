import { boards } from '$config';

export const ThreadForm = (props) => (
  <form action="/test/bbs.cgi" method="POST" accept-charset="Shift_JIS" style="display: grid; gap: 1rem;">
    <input type="hidden" name="bbs" value={props.board} />

    <label style="display: grid; grid-template-columns: 1fr 2fr;">
      <span>スレッドタイトル</span>
      <input type="text" name="subject" required />
    </label>

    <label style="display: grid; grid-template-columns: 1fr 2fr;">
      <span>メール</span>
      <input type="text" name="mail" />
    </label>

    <label style="display: grid; grid-template-columns: 1fr 2fr;">
      <span>本文</span>
      <textarea name="MESSAGE" />
    </label>

    <button name="submit" value="新規スレッド作成">新規スレッド作成</button>
  </form>
);

export const Board = (props) => (
  <main>
    <h1>{boards[props.board].title.name}</h1>
    <hr />

    <a href={`/${props.board}/subback.html`}>スレッド一覧</a>
    <hr />

    <ThreadForm {...props} />
  </main>
);