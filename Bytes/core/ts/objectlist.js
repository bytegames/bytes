var Bytes;
(function (Bytes) {
    var ObjectList = (function () {
        function ObjectList() {
            // Define gameObjects
            this.gameObjects = {};
            for (var i = 0, ii = ObjectList.initStackSize; i != ii; ++i) {
                // Initialize to null
                this.gameObjects[i] = null;
            }
        }
        Object.defineProperty(ObjectList.prototype, "nextIndex", {
            get: function () {
                for (var i in this.gameObjects) {
                    if (this.gameObjects[i] == null) {
                        return i;
                    }
                }
                return i + 1;
            },
            enumerable: true,
            configurable: true
        });
        ObjectList.prototype.insert = function (gameObject) {
            // Update gameObject with next available index
            gameObject.index = this.nextIndex;
            this.gameObjects[gameObject.index] = gameObject;
        };
        ObjectList.prototype.update = function (gameObject) {
            var objectToUpdate = this.gameObjects[gameObject.index];
            for (var property in objectToUpdate) {
                if (typeof objectToUpdate[property] !== 'function') {
                    objectToUpdate[property] = gameObject[property];
                }
            }
        };
        ObjectList.prototype.delete = function (gameObject) {
            var index = gameObject.index;
            var objectToDelete = this.gameObjects[index];
            for (var property in objectToDelete) {
                gameObject[property] = null;
                objectToDelete[property] = null;
            }
            gameObject = null;
            this.gameObjects[index] = null;
        };
        ObjectList.initStackSize = 1024;
        return ObjectList;
    })();
    Bytes.ObjectList = ObjectList;
})(Bytes || (Bytes = {}));
//# sourceMappingURL=objectlist.js.map