import os, http.server, socketserver

port = int(os.environ.get("PORT", "5500"))
handler = http.server.SimpleHTTPRequestHandler
with socketserver.TCPServer(("127.0.0.1", port), handler) as httpd:
    print(f"Serving on http://127.0.0.1:{port}")
    httpd.serve_forever()
