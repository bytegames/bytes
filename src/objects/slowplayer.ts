import { IGameObject, Position, Speed } from '../types/index.js'
import { Board, Canvas } from '../ux/index.js'
import { Snake, Coin } from './index.js'

export class SlowPlayer implements IGameObject {

	public static instances: { [index: number]: Coin } = {}
	public static items_index: number = 0
	public static items_active: number = 0

	public index: number
	public position: Position
	public color = "#3366FF"

	constructor() {

		this.index = SlowPlayer.items_index
		++SlowPlayer.items_index
		++SlowPlayer.items_active
	}

	public handle_collision(snake: Snake) {

		snake.set_speed(Speed.SLOW)
		this.destroy()
	}

	public draw() {

		if (!this.position) { return }

		var x = (this.position.X * Board.block_size) + 2
		var y = (this.position.Y * Board.block_size) + 2
		var size = Board.block_size - 4

		Canvas.draw_rect(x, y, size, size, this.color)
	}
	
	public destroy() {

		Board.remove_object_at(this.position)
		delete SlowPlayer.instances[this.index]
		--SlowPlayer.items_active
	}
}
