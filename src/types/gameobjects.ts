import { Position } from './position.js'
import { Snake } from '../objects/snake.js'

export interface IDrawable {
	position: Position
	draw(): void 
}

export interface IPlayerObject extends IDrawable {

}

export interface IGameObject extends IDrawable {
	handle_collision(object: Snake): void
}