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
    async start(): void {
        if (this.#elapsed === 0) {
            this.#elapsed += this.initial;
            if (this.delay > 0) await this.#wait(this.delay);
        }
        this.#start = performance.now();
    }

    /**
     * Stop the stopwatch
     * @param lap Whether or not to add the final time to laps
     * @returns The final elapsed time
     */
    stop(lap: boolean = false): number {
        this.#elapsed += performance.now() - this.#start;
        if (lap) this.lap();
        this.#start = null;
        return this.#elapsed;
    }

    /**
     * Retrieve the current elapsed amount of time
     * @returns Amount of time elapsed
     */
    elapsed(): number {
        return this.#start === null ? 0 : this.#elapsed + performance.now() - this.#start;
    }

    /**
     * Adds the current elapsed time to the laps array
     * @returns Amount of time elapsed
     */
    lap(): number {
        const lap = this.elapsed();
        this.laps.push(lap);
        return lap;
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