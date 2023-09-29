import { html } from 'hono/html';
import { config } from '$config';

export const Layout = (props) => {
  props.siteName ??= true;

  return html`<!DOCTYPE html>
<html>
<head>
  <!-- <meta charset="utf-8"> -->
  <!-- <meta name="viewport" content="width=device-width, initial-scale=1"> -->
  <title>${props.title}${props.siteName && ` - ${config.app.name}`}</title>
</head>
<body>
  ${props.children}
</body>
</html>`;
};