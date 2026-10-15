import os, http.server

port = int(os.environ.get("PORT", "5500"))
handler = http.server.SimpleHTTPRequestHandler
with http.server.ThreadingHTTPServer(("127.0.0.1", port), handler) as httpd:
    print(f"Serving on http://127.0.0.1:{port}")
    httpd.serve_forever()
