import { IGameObject } from '../types/gameobjects.js'
import { Position } from '../types/position.js'
import { Canvas } from './canvas.js'

export class Board {

    public static bg_color: string = "#000A1F"
    public static grid_color: string = "#001F5C"

    public static block_size = 8
    public static height = 0
    public static width = 0

    public static grid: IGameObject[][]

    public static place_object(object: IGameObject, position: Position) {

        Board.grid[position.X][position.Y] = object
        object.position = Position.copy(position)
    }

    public static remove_object_at(position: Position) {

        Board.grid[position.X][position.Y] = null
    }

    public static move_object(object: IGameObject, newPosition: Position) {

        Board.remove_object_at(object.position)
        Board.place_object(object, newPosition)            
    }

    public static place_at_random(object: IGameObject) {

        var position = Board.generate_random_position()
        Board.place_object(object, position)
    }

    public static move_to_random(object: IGameObject) {

        var position = Board.generate_random_position()
        Board.move_object(object, position)
    }
    
    public static generate_random_position() {

        var position: Position
        while (!position) {

            var x = Math.floor(Math.random() * Board.width)
            var y = Math.floor(Math.random() * Board.height)
            if (!Board.grid[x][y]) { return new Position(x, y) }
        }
    }

    public static init() {

        Board.height = Canvas.height / Board.block_size
        Board.width = Canvas.width / Board.block_size

        Board.grid = new Array(Board.width)
        for (var i = 0, ii = Board.width; i != ii; ++i) {
            
            Board.grid[i] = new Array(Board.height)
        }
    }
    
    public static draw() {

        Canvas.fill(Board.bg_color)

        for (var cx = 0; cx < Board.width; cx++) {

            for (var cy = 0; cy < Board.height; cy++) {

                if (Board.grid[cx][cy]) { Board.grid[cx][cy].draw() }
            }
        }
    }
}
