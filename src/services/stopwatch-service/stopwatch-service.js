const StopwatcServiceIIFE = (function () {

    let startTime
    let endTime
    let running
    let currentDuration = 0;
    let measurementsCount = 0;
    let totalTime = 0;
    let averageTime = 0;

    function start() {
        reset();
        if (running)
            throw new Error('Stopwatch has already started.');

        running = true;
        startTime = new Date();
        measurementsCount++;
    };

    function stop() {
        if (!running) {
            if (currentDuration > 0) {
                return;
            } else {
                throw new Error('Stopwatch is not started.');
            }
        }

        running = false;
        endTime = new Date();

        const miliseconds = (endTime.getTime() - startTime.getTime());
        currentDuration = miliseconds;
        totalTime += miliseconds;

        calculateAverageTime();
    };

    function reset() {
        startTime = null;
        endTime = null;
        running = false;
        currentDuration = 0;
    };

    function calculateAverageTime() {
        averageTime = totalTime / measurementsCount;
    }

    return {
        start: function () {
            return start()
        },
        stop: function () {
            return stop()
        },
        reset: function () {
            return reset()
        },
        currentDuration: function () {
            return currentDuration;
        },
        getAverageTime: function () {
            return averageTime;
        }
    }

})();
