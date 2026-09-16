# -*- coding: utf-8 -*-
"""Build the portfolio into ONE self-contained HTML file (CSS + JS + images inlined).
Usage:  python build_single.py            -> writes dist/portfolio-single.html
        python build_single.py <out.html> -> writes to the given path
Run `npm run build` first. Nothing here touches the network."""
import base64, mimetypes, os, re, sys

ROOT = os.path.dirname(os.path.abspath(__file__))
DIST = os.path.join(ROOT, "dist")
html = open(os.path.join(DIST, "index.html"), encoding="utf-8").read()


def read(rel):
    return open(os.path.join(DIST, rel.lstrip("/")), "rb").read()


def data_uri(rel):
    mime = mimetypes.guess_type(rel)[0] or "application/octet-stream"
    return f"data:{mime};base64," + base64.b64encode(read(rel)).decode("ascii")


# 1) inline the CSS bundle
html = re.sub(r'<link rel="stylesheet"[^>]*href="(/assets/[^"]+\.css)"[^>]*>',
              lambda m: "<style>" + read(m.group(1)).decode("utf-8") + "</style>", html)

# 2) inline the JS bundle, with image URLs inside it swapped for data URIs
def inline_js(m):
    js = read(m.group(1)).decode("utf-8")
    for f in sorted(os.listdir(DIST)):
        if f.lower().endswith((".jpg", ".jpeg", ".png", ".webp", ".svg")):
            uri = data_uri("/" + f)
            # the minified bundle may quote the path with ", ' or a template backtick
            for q in ('"', "'", "`"):
                js = js.replace(f"{q}/{f}{q}", q + uri + q)
    return "<script type=\"module\">" + js.replace("</script>", "<\\/script>") + "</script>"

html = re.sub(r'<script type="module"[^>]*src="(/assets/[^"]+\.js)"[^>]*></script>', inline_js, html)

# 3) favicon
html = re.sub(r'href="/favicon\.svg"', lambda m: 'href="' + data_uri("/favicon.svg") + '"', html)

out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(DIST, "portfolio-single.html")
open(out, "w", encoding="utf-8").write(html)
print("wrote", out, os.path.getsize(out), "bytes; external refs left:",
      len(re.findall(r'(src|href)="/(assets|[a-z0-9_-]+\.(jpg|png|webp|svg))', html)))
