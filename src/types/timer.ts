export enum ClockType { TIMED, INFINITE }
export enum ClockTick { EVEN, ODD }

export class Timer {

    private handle: number
    private interval: number

    public type: ClockType
    public tick: ClockTick = ClockTick.EVEN
    public is_running: boolean
    public is_paused: boolean

    private handler: () => any = () => { console.log("No clock event") }

    private on_elapsed = () => {

        if (this.is_paused) {  return }
        this.tick = (this.tick === ClockTick.EVEN)
            ? ClockTick.ODD
            : ClockTick.EVEN

        this.handler()
        if (this.type == ClockType.TIMED) { this.stop() }
    }

    constructor(interval: number, duration: number, handler: () => any) {

        this.interval = interval
        this.handler = handler
        this.type = (duration == 0) ? ClockType.INFINITE : ClockType.TIMED
    }

    public start() {

        this.is_running = true
        this.handle = (this.type == ClockType.INFINITE)
            ? window.setInterval(this.on_elapsed.bind(this), this.interval)
            : window.setTimeout(this.on_elapsed.bind(this), this.interval)
    }

    public stop() {

        this.is_running = false
        return (this.type == ClockType.INFINITE)
            ? window.clearInterval(this.handle)
            : window.clearTimeout(this.handle)
    }

    public pause() { this.is_paused = true }

    public resume() { this.is_paused = false }                
}
