import { Position } from './position.js'
import { Snake } from '../objects/snake.js'

interface Drawable { draw(): void }

export interface IPlayerObject extends Drawable {
	position: Position
}

export interface IGameObject extends Drawable {
	position: Position
	handle_collision(object: Snake): void
}