var http = require('http');
var path = require('path');
var crypto = require('crypto');
var fs = require('fs');
var WEBSOCKET_HANDSHAKE_KEY = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
var Bytes;
(function (Bytes) {
    var ContentType = (function () {
        function ContentType() {
        }
        ContentType.html = "text/html";
        ContentType.plain = "text/plain";
        ContentType.js = "text/javascript";
        ContentType.css = "text/css";
        return ContentType;
    })();
    var WebServer = (function () {
        function WebServer() {
        }
        WebServer.init = function () {
            console.log("Server init");
            this.sessions = {};
            this.server = http.createServer(WebServer.listener).listen(WebServer.port);
            this.server.addListener("upgrade", WebServer.onRequestUpgrade);
        };
        WebServer.onRequestUpgrade = function (request, socket) {
            console.log(request.connection.remoteAddress);
            console.log();
            var clientKey = request.headers.hasOwnProperty('sec-websocket-key')
                ? request.headers['sec-websocket-key']
                : null;
            if (clientKey) {
                var hash = crypto.createHash('sha1');
                hash.update(clientKey.concat(WEBSOCKET_HANDSHAKE_KEY));
                // socket.setEncoding("hex");
                socket.write("HTTP/1.1 101 Switching Protocols\r\n"
                    + "Upgrade: WebSocket\r\n"
                    + "Connection: Upgrade\r\n"
                    + "Sec-WebSocket-Accept: " + hash.digest("base64") + "\r\n"
                    + "WebSocket-Location: ws://localhost:80/\r\n"
                    + "\r\n");
                socket.on("data", function (buffer, start, end) {
                    var frame = WebSocketFrame.process(buffer);
                    console.log(frame.data);
                    //console.log("Data test length: " + length);
                    //console.log("Data real length: " + data.length);
                    //console.log("Unmasked data length: " + out.length);
                    for (var i = 0; i < buffer.length; ++i) {
                        var bin = buffer[i].toString(2);
                    }
                    // console.log(output);
                });
            }
        };
        WebServer.getContentType = function (url) {
            if (/\/css\//.test(url)) {
                return ContentType.css;
            }
            if (/\/js\//.test(url)) {
                return ContentType.js;
            }
            if (/\/index/.test(url)) {
                return ContentType.html;
            }
            return ContentType.plain;
        };
        WebServer.listener = function (request, response) {
            console.log(request.headers);
            var url = request.url == "/"
                ? "/client/index.html"
                : request.url;
            try {
                var file = path.join(__dirname, url);
                var stat = fs.statSync(file);
                var sr = fs.createReadStream(file);
                response.writeHead(200, { 'Content-Type': WebServer.getContentType(url) });
                sr.pipe(response);
            }
            catch (e) {
                response.writeHead(404);
                response.end();
            }
        };
        WebServer.onWebSocketData = function (buffer) {
        };
        WebServer.port = 80;
        return WebServer;
    })();
    Bytes.WebServer = WebServer;
})(Bytes || (Bytes = {}));
Bytes.WebServer.init();
//# sourceMappingURL=server.js.map