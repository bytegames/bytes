import { Speed, Direction, Position, ScreenEdge, ClockTick, IPlayerObject, IGameObject } from '../types/index.js'
import { SnakeSegment } from './snakesegment.js'
import { Board } from '../ux/index.js'
import { Game } from '../game.js'

export class Snake extends SnakeSegment implements IPlayerObject {

	public jump_distance: number = 8

	public skip_next_turn: boolean = false
	public hit_detected: boolean = false
	public is_alive: boolean = false
	
	public speed: Speed = Speed.NORMAL
	public direction: Direction = Direction.NONE
	public position: Position 

	public hi_score: number = 0
	public points: number = 0
	public lives: number = 9000001

	public segments: SnakeSegment[] = []
	public max_length: number = Snake.default_length

	constructor(position: Position) {

		super(position)
		
		this.position = position
		this.segments[0] = this
		this.is_alive = true

		Board.place_object(this, position)
	}

	public jump() {

		var position: Position = Position.copy(this.position)

		switch (this.direction) {

			case Direction.UP:
				position.Y -= this.jump_distance
				break

			case Direction.DOWN:
				position.Y += this.jump_distance
				break

			case Direction.LEFT:
				position.X -= this.jump_distance
				break

			case Direction.RIGHT:
				position.X += this.jump_distance
				break
		}

		this.updateBoard(position)
	}

	public on_hit_screen_edge(edge: ScreenEdge) {
		
		switch (edge) {
			
			// TODO: Implement various edge functions
			case ScreenEdge.NORTH:
			case ScreenEdge.SOUTH:
			case ScreenEdge.EAST:
			case ScreenEdge.WEST:
		}
	}

	public die() {
		
		this.hit_detected = true
		this.hi_score = this.points > this.hi_score
			? this.points
			: this.hi_score
		
		Game.hi_score = this.hi_score > Game.hi_score
			? this.hi_score
			: Game.hi_score

		if (this.lives == 0) {

			this.is_alive = false
			return Game.reset()
		}

		this.lives -= 1
		this.destroy()

		this.position = new Position(0, 0)
		this.direction = Direction.NONE
	}

	public set_speed(speed: Speed) {
		
		this.speed = speed
		this.skip_next_turn = (speed === Speed.SLOW)
	}

	public process_turn() {
					
		// Don't process if dead
		if (!this.is_alive) { return }
					
		// Skip every other clock tick unless moving fast
		if (this.speed != Speed.FAST && Game.clock.tick == ClockTick.ODD) { return }

		// Skip 3 clock ticks if moving slow
		if (this.speed == Speed.SLOW && Game.clock.tick == ClockTick.EVEN) {

			this.skip_next_turn = !this.skip_next_turn
			if (this.skip_next_turn) { return  }
		}
		
		this.hit_detected = false

		let is_moving = true
		let pos: Position = Position.copy(this.position)

		switch (this.direction) {

			case Direction.UP:
				pos.Y -= 1
				break

			case Direction.DOWN:
				pos.Y += 1
				break

			case Direction.LEFT:
				pos.X -= 1
				break

			case Direction.RIGHT:
				pos.X += 1
				break

			case Direction.NONE:
				is_moving = false
		}
		
		if (is_moving) {

			if (pos.X < 0) {
				pos.X = Board.width - 1
				// this.onHitScreenEdge(ScreenEdge.WEST)
			}
			else if (pos.Y < 0) {
				pos.Y = Board.height - 1
				// this.onHitScreenEdge(ScreenEdge.NORTH)
			}
			else if (pos.X == Board.width) {
				pos.X = 0
				// this.onHitScreenEdge(ScreenEdge.SOUTH)
			}
			else if (pos.Y == Board.height) {
				pos.Y = 0
				// this.onHitScreenEdge(ScreenEdge.SOUTH)
			}

			if (Board.grid[pos.X][pos.Y]) {
				var object: IGameObject = Board.grid[pos.X][pos.Y]
				object.handle_collision(this)
			}
		}
		
		if (!this.is_alive) { this.destroy() }
		else if (!this.hit_detected) { this.updateBoard(pos) }
	}

	private updateBoard(pos: Position) {

		let lastPosition = Position.copy(this.position)
		for (var i = 0, ii = this.segments.length; i != ii; i++) {

			let segment = this.segments[i]
			let newPosition = (i == 0)
				? pos
				: lastPosition

			lastPosition = segment.position
			Board.move_object(segment, newPosition)                
		}

		if (this.segments.length <= this.max_length) {

			let newSegment = new SnakeSegment(lastPosition)
			this.segments.push(newSegment)

			Board.place_object(newSegment, lastPosition)                
		}            
	}        

	private destroy() {

		for (var i = 0, ii = this.segments.length; i != ii; i++) {
			Board.remove_object_at(this.segments[i].position)                
		}

		this.segments = [this]
		this.max_length = Snake.default_length
	}
}
