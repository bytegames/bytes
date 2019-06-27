import { Direction, GameKey } from '../types/index.js'
import { Game } from '../game.js'

export class Controls {

    static player_one_last_key: number = null
    static player_two_last_key: number = null

    static on_key_up = (ev: KeyboardEvent) => {
        const key = ev.keyCode
        const player_one_keys = new Set([
            GameKey.PLAYER_ONE_UP,
            GameKey.PLAYER_ONE_DOWN,
            GameKey.PLAYER_ONE_LEFT,
            GameKey.PLAYER_ONE_RIGHT,
            GameKey.PLAYER_ONE_JUMP]);

        const player_two_keys = new Set([
            GameKey.PLAYER_TWO_UP,
            GameKey.PLAYER_TWO_DOWN,
            GameKey.PLAYER_TWO_LEFT,
            GameKey.PLAYER_TWO_RIGHT,
            GameKey.PLAYER_TWO_JUMP]);

        if (player_one_keys.has(key)) {
            Controls.player_one_last_key = key;
        } else if (player_two_keys.has(key)) {
            Controls.player_two_last_key = key;
        }
    }

    static process_input() {

        if (!Controls.player_one_last_key && !Controls.player_two_last_key) { return }

        switch (Controls.player_one_last_key) {

            case GameKey.PLAYER_ONE_UP:
                if (Game.player_one.direction != Direction.DOWN) {
                    Game.player_one.direction = Direction.UP
                }
                break

            case GameKey.PLAYER_ONE_DOWN:
                if (Game.player_one.direction != Direction.UP) {
                    Game.player_one.direction = Direction.DOWN
                }
                break

            case GameKey.PLAYER_ONE_LEFT:
                if (Game.player_one.direction != Direction.RIGHT) {
                    Game.player_one.direction = Direction.LEFT
                }
                break

            case GameKey.PLAYER_ONE_RIGHT:
                if (Game.player_one.direction != Direction.LEFT) {
                    Game.player_one.direction = Direction.RIGHT
                }
                break

            case GameKey.PLAYER_ONE_JUMP:
                Game.player_one.jump()
        }

        switch (Controls.player_two_last_key) {

            case GameKey.PLAYER_TWO_UP:
                if (Game.player_two.direction != Direction.DOWN) {
                    Game.player_two.direction = Direction.UP
                }
                break

            case GameKey.PLAYER_TWO_DOWN:
                if (Game.player_two.direction != Direction.UP) {
                    Game.player_two.direction = Direction.DOWN
                }
                break

            case GameKey.PLAYER_TWO_LEFT:
                if (Game.player_two.direction != Direction.RIGHT) {
                    Game.player_two.direction = Direction.LEFT
                }
                break

            case GameKey.PLAYER_TWO_RIGHT:
                if (Game.player_two.direction != Direction.LEFT) {
                    Game.player_two.direction = Direction.RIGHT
                }
                break

            case GameKey.PLAYER_TWO_JUMP:
                Game.player_two.jump()
        }
        Controls.player_one_last_key = null
        Controls.player_two_last_key = null
    }
}
