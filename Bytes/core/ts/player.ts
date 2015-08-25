namespace Bytes {

    export enum PlayerNumber {

        UNDEFINED,
        ONE,
        TWO
    }

    export class Player extends Snake {

        playerNumber: number = PlayerNumber.UNDEFINED;

        constructor(playerNumber: PlayerNumber, position: Position) {

            super(position);
        }

        public static spawn(playerNumber: PlayerNumber, position: Position) {

           // 
        }
    }
}