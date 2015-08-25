namespace Bytes {

    export interface IObjectList {

        gameObjects: { [index: number]: GameObject };
        nextIndex: number;
        constructor;
        insert(gameObject: IGameObject);
        update(gameObject: IGameObject);
        delete(gameObject: IGameObject);
    }

    export class ObjectList implements IObjectList {

        public static initStackSize = 1024;
        
        public gameObjects: { [index: number]: GameObject };
        public get nextIndex(): number {

            for (var i in this.gameObjects) {
                if (this.gameObjects[i] == null) {
                    return i;
                }
            }
            
            return i + 1;
        }

        public constructor() {

            // Define gameObjects
            this.gameObjects = {};
            for (var i = 0, ii = ObjectList.initStackSize; i != ii; ++i) {

                // Initialize to null
                this.gameObjects[i] = null;
            }
        }
        
        public insert(gameObject: IGameObject) {

            // Update gameObject with next available index
            gameObject.index = this.nextIndex;
            this.gameObjects[gameObject.index] = gameObject;
        }

        public update(gameObject: IGameObject) {

            var objectToUpdate = this.gameObjects[gameObject.index];
            for (var property in objectToUpdate) {

                if (typeof objectToUpdate[property] !== 'function') {
                    objectToUpdate[property] = gameObject[property];
                }
            }
        }

        public delete(gameObject: IGameObject) {

            var index = gameObject.index;
            var objectToDelete = this.gameObjects[index];
            for (var property in objectToDelete) {

                gameObject[property] = null;
                objectToDelete[property] = null;
            }
            
            gameObject = null;
            this.gameObjects[index] = null;
        }
    }
}