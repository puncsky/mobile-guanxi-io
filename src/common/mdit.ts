//@ts-ignore
import MarkdownIt from "markdown-it";
//@ts-ignore
import markMiddleware from "markdown-it-mark";
import { getReadabilityStyles } from "./get-readability-styles";

export const mdit = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true
}).use(markMiddleware);

export function getHtml(content: string): string {
  const viewportTag = `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
${getReadabilityStyles()}`;
  return `<!doctype html>
<html>

<head>
  <meta charset="utf-8">
  ${viewportTag}
</head>

<body>
<article>
${content}
</article>

  <!-- Google Analytics: change UA-XXXXX-Y to be your site's ID. -->
  <script>
    window.ga = function () { ga.q.push(arguments) }; ga.q = []; ga.l = +new Date;
    ga('create', 'UA-43072488-4', 'auto'); ga('set','transport','beacon'); ga('send', 'pageview')
  </script>
  <script src="https://www.google-analytics.com/analytics.js" async></script>
</body>

</html>`;
}
