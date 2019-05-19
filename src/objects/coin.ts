import { IGameObject, Position } from '../types/index.js'
import { Canvas, Board } from '../ux/index.js'
import { Snake } from './snake.js'

export class Coin implements IGameObject {

	public static values: number[] = [200, 600, 800, 1000, 2000]
	public static instances: { [index: number]: Coin } = {}
	public static coins_index: number = 0
	public static coins_active: number = 0

	public index: number
	public value: number
	public position: Position

	public constructor(value: number) {

		this.value = value
		this.index = Coin.coins_index
		++Coin.coins_index
		++Coin.coins_active
	}

	public static create_random() {

		return new Coin(Coin.values[Math.floor(Math.random() * Coin.values.length)])            
	}

	public handle_collision(snake: Snake): void {

		snake.points += this.value
		snake.max_length += 8
		this.destroy()
	}

	public draw() {

		if (!this.position) { return }

		let x = (this.position.X * Board.block_size) + (Board.block_size / 2)
		let y = (this.position.Y * Board.block_size) + (Board.block_size / 2)
		let r = (Board.block_size / 2) - 1

		Canvas.context.beginPath()
		Canvas.context.arc(x, y, r, 0, 2 * Math.PI, false)
		Canvas.context.strokeStyle = "#FFFF00"
		Canvas.context.fillStyle = "#CCCC00"
		Canvas.context.stroke()
		Canvas.context.fill()	
	}

	public destroy() {

		Board.remove_object_at(this.position)
		delete Coin.instances[this.index]
		--Coin.coins_active           
	}
}
