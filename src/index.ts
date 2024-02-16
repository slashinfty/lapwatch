export default class Lapwatch {
    /**
     * Time added to the timer at the start
     */
    initial: number;

    /**
     * Amount of time to wait before starting
     */
    delay: number;

    /**
     * Time when the timer was started
     */
    #start: number | null;

    /**
     * Amount of time that has elapsed when the timer stops
     */
    #elapsed: number;

    /**
     * Array of times from the lap method
     */
    laps: Array<number>;

    /**
     * Construct a new stopwatch
     * @param options Optionally set the initial and delay times
     */
    constructor(options: {
        initial: number,
        delay: number
    } = {initial: 0, delay: 0}) {
        this.initial = options.initial;
        this.delay = options.delay;
        this.#start = null;
        this.#elapsed = 0;
        this.laps = [];
    }

    #wait(ms: number): Promise<any> {
        return new Promise((res) => setTimeout(res, ms));
    }

    /**
     * Start the stopwatch
     */
    async start(): Promise<void> {
        if (this.#start !== null) throw 'Timer has already started';
        if (this.#elapsed === 0) {
            this.#elapsed += this.initial;
            if (this.delay > 0) await this.#wait(this.delay);
        }
        this.#start = performance.now();
    }

    /**
     * Stop the stopwatch
     * @param lap Whether or not to add the current time to laps
     * @returns The elapsed time at stopping
     */
    stop(lap: boolean = false): number {
        if (this.#start === null) throw 'Timer is not active';
        if (lap) this.lap();
        this.#elapsed += performance.now() - this.#start;
        this.#start = null;
        return this.#elapsed;
    }

    /**
     * Retrieve the current elapsed amount of time
     * @returns Amount of time elapsed
     */
    elapsed(): number {
        return this.#elapsed + (this.#start !== null ? performance.now() - this.#start : 0);
    }

    /**
     * Adds the current elapsed time to the laps array
     * @returns Amount of time elapsed
     */
    lap(): number {
        if (this.#start === null) throw 'Timer is not active';
        const lap = this.elapsed();
        this.laps.push(lap);
        return lap;
    }
    
    /**
     * Set the elapsed time to a specific value
     * @param time The amount of time
     */
    set(time: number): void {
        this.#start = performance.now();
        this.#elapsed = time;
    }

    /**
     * Resets the timer to initial values
     */
    reset(): void {
        this.#start = null;
        this.#elapsed = 0;
        this.laps = [];
    }
}