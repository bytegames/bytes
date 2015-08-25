import net = require('net');
import http = require('http');
import path = require('path');
import crypto = require('crypto');

import fs = require('fs');

const WEBSOCKET_HANDSHAKE_KEY = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";

namespace Bytes {

    type Socket = net.Socket;
    type Server = http.Server;
    type ServerRequest = http.ServerRequest;


    class ContentType {

        static html: string = "text/html";
        static plain: string = "text/plain";
        static js: string = "text/javascript";
        static css: string = "text/css";
    }

    export class WebServer {

        static port: number = 80;

        static server: Server;

        static games: { [index: number]: Game };
        static sessions: { [index: number]: Socket }

        static init() {

            console.log("Server init");

            this.sessions = {};
            this.server = http.createServer(WebServer.listener).listen(WebServer.port);
            this.server.addListener("upgrade", WebServer.onRequestUpgrade);
        }

        static onRequestUpgrade(request: ServerRequest, socket: Socket) {

            console.log(request.connection.remoteAddress);
            console.log();

            var clientKey: string = request.headers.hasOwnProperty('sec-websocket-key')
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
                    + "\r\n"
                    );

                socket.on("data", function (buffer, start, end) {

                    var frame: WebSocketFrame = WebSocketFrame.process(buffer);
                    console.log(frame.data);

                    //console.log("Data test length: " + length);
                    //console.log("Data real length: " + data.length);

                    //console.log("Unmasked data length: " + out.length);
                              
                    for (var i = 0; i < buffer.length; ++i) {

                        var bin = buffer[i].toString(2);
                        //output.push(Array(8 - bin.length + 1).join("0") + bin);
                    }

                    // console.log(output);
                })
            }
        }

        static getContentType(url: string) {

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
        }

        static listener(request: http.ServerRequest, response: http.ServerResponse) {

            console.log(request.headers);

            var url = request.url == "/"
                ? "/client/index.html"
                : request.url;

            try {

                var file: string = path.join(__dirname, url);
                var stat: fs.Stats = fs.statSync(file);
                var sr = fs.createReadStream(file);

                response.writeHead(200, { 'Content-Type': WebServer.getContentType(url) });
                sr.pipe(response);
            }
            catch (e) {

                response.writeHead(404);
                response.end();
            }
        }

        static onWebSocketData(buffer: Buffer) {

        }
    }
}

Bytes.WebServer.init();