import { Speed, Position, IGameObject } from '../types/index.js'
import { Board, Canvas } from '../ux/index.js'
import { Snake, Coin } from './index.js'

export class FastPlayer implements IGameObject {

	public static instances: { [index: number]: Coin } = { }
	public static items_index: number = 0
	public static items_active: number = 0

	public index: number
	public color = "#3366FF"
	public position: Position

	constructor() {

		this.index = FastPlayer.items_index
		++FastPlayer.items_index
		++FastPlayer.items_active
	}

	public handle_collision(snake: Snake) {

		snake.set_speed(Speed.FAST)
		this.destroy()
	}

	public draw() {

		if (!this.position) { return }

		let x = (this.position.X * Board.block_size) + 2
		let y = (this.position.Y * Board.block_size) + 2
		let size = Board.block_size - 4

		Canvas.draw_rect(x, y, size, size, this.color)
	}

	public destroy() {

		Board.remove_object_at(this.position)
		delete FastPlayer.instances[this.index]
		--FastPlayer.items_active
	}
}