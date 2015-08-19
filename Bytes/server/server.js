var http = require('http');
var path = require('path');
var crypto = require('crypto');
var fs = require('fs');
var WEBSOCKET_HANDSHAKE_KEY = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
// import Game = require('js/game');
var ContentType = (function () {
    function ContentType() {
    }
    ContentType.html = "text/html";
    ContentType.plain = "text/plain";
    ContentType.js = "text/javascript";
    ContentType.css = "text/css";
    return ContentType;
})();
var WebSocketFrame = (function () {
    function WebSocketFrame() {
        // Create mask from 4 bytes of a random number
        this.buffer = new Buffer(1);
        this.mask = new Buffer(Math.random().toString().substring(2, 6));
    }
    Object.defineProperty(WebSocketFrame.prototype, "fin", {
        get: function () {
            return (this.buffer[0] >> 4) === 8;
        },
        set: function (state) {
            this.buffer[0] ^= state ? 8 : 0;
        },
        enumerable: true,
        configurable: true
    });
    WebSocketFrame.process = function (buffer) {
        var frame = new WebSocketFrame();
        frame.buffer = buffer;
        frame.opcode = frame.buffer[0] % 16;
        frame.length = frame.buffer[1] % 128;
        frame.start = 6;
        // Check for invalid opcode    
        if ([0, 1, 2, 8, 9, 10].indexOf(frame.opcode) === -1) {
            return;
        }
        // Update indexers for large data packets
        if (frame.length > 125) {
            // Update frame start position first
            frame.start += (frame.length === 126)
                ? 2
                : 8;
            // Update frame length
            frame.length = (frame.length === 126)
                ? buffer.readInt16BE(2)
                : buffer.readUInt32BE(2) * Math.pow(2, 32) + buffer.readUInt32BE(6);
        }
        // Retrieve mask and data
        frame.mask = buffer.slice(frame.start - 4, frame.start);
        frame.data = buffer.slice(frame.start, frame.start + frame.length);
        // Unmask frame data
        for (var i = 0, ii = frame.data.length; i !== ii; ++i) {
            frame.data[i] ^= frame.mask[i % 4];
        }
        return frame;
    };
    WebSocketFrame.prototype.toString = function () {
    };
    return WebSocketFrame;
})();
var WebServer = (function () {
    function WebServer() {
    }
    WebServer.init = function () {
        console.log("Server init");
        this.server = http.createServer(WebServer.listener).listen(WebServer.httpPort);
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
            socket.on("data", , start, end);
            {
                //console.log("Data test length: " + length);
                //console.log("Data real length: " + data.length);
                console.log("Unmasked data length: " + out.length);
                for (var i = 0; i < buffer.length; ++i) {
                    // Grab frame
                    // var s = data[i];
                    // out += s;
                    var bin = buffer[i].toString(2);
                    output.push(Array(8 - bin.length + 1).join("0") + bin);
                }
            }
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
            ? "/index.html"
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
    WebServer.httpPort = 80;
    return WebServer;
})();
WebServer.init();
//# sourceMappingURL=server.js.map