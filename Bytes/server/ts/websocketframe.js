var Bytes;
(function (Bytes) {
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
    Bytes.WebSocketFrame = WebSocketFrame;
})(Bytes || (Bytes = {}));
//# sourceMappingURL=websocketframe.js.map