# lapwatch
Stopwatch written in TypeScript

All times are saved as [DOMHighResTimeStamp](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp)s, which are milliseconds accurate to 5 microseconds.

## Installation
```
npm i lapwatch
```

## Importing
```js
// Node.js
import Lapwatch from 'lapwatch';

// Browser
import Lapwatch from 'https://unpkg.com/lapwatch';
```

**Note:** *it is a default export, so you can freely name the import*

## Constructing
Simple:
```ts
const lapwatch = new Lapwatch();
```

Advanced:
```ts
const lapwatch = new Lapwatch({
    initial: 0,
    delay: 0
});
```

**Note:** *see below for descriptions of initial and delay*

## Properties
`lapwatch.initial` - number of milliseconds added to the timer at the start

`lapwatch.delay` - number of milliseconds to wait before starting the timer

`lapwatch.laps` - array of times saved from the `lapwatch.lap()` method

## Methods
`lapwatch.start()`
- Starts the timer
- Asynchronous to allow for delay
- Throws an error if the timer is active

`lapwatch.stop(lap)`
- Stops the timer
- Passing `true` as a parameter calls the `lapwatch.lap()` method
- Returns the current elapsed amount of time
- Throws an error if the timer is inactive

`lapwatch.elapsed()`
- Returns the current elapsed amount of time

`lapwatch.lap()`
- Adds the current elapsed amount of time to the `lapwatch.laps` array
- Returns the current elapsed amount of time
- Throws an error if the timer is inactive

`lapwatch.set(time)`
- Sets the elapsed amount of time to a specific value

`lapwatch.reset()`
- Resets the timer to all initial values

## Discussion
You can discuss this repository more in my [Discord](https://discord.gg/Q8t9gcZ77s).