import http.server
import socketserver
import mimetypes
import os

PORT = 3000

# Explicitly register all modern web MIME types
mimetypes.init()
mimetypes.add_type('image/webp', '.webp')
mimetypes.add_type('image/png', '.png')
mimetypes.add_type('image/jpeg', '.jpeg')
mimetypes.add_type('image/jpg', '.jpg')
mimetypes.add_type('image/svg+xml', '.svg')
mimetypes.add_type('application/javascript', '.js')
mimetypes.add_type('text/css', '.css')
mimetypes.add_type('application/json', '.json')
mimetypes.add_type('model/gltf-binary', '.glb')
mimetypes.add_type('audio/mpeg', '.mp3')
mimetypes.add_type('application/manifest+json', '.webmanifest')

class NoCacheMimeHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Prevent aggressive browser caching of scripts & stylesheets during local development
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

    def guess_type(self, path):
        base, ext = os.path.splitext(path)
        ext = ext.lower()
        if ext == '.webp':
            return 'image/webp'
        if ext == '.png':
            return 'image/png'
        if ext == '.js':
            return 'application/javascript'
        if ext == '.css':
            return 'text/css'
        if ext == '.glb':
            return 'model/gltf-binary'
        if ext == '.mp3':
            return 'audio/mpeg'
        return super().guess_type(path)

socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(("", PORT), NoCacheMimeHTTPRequestHandler) as httpd:
    print(f"Serving HTTP on 0.0.0.0 port {PORT} with full MIME and no-cache headers...")
    httpd.serve_forever()
