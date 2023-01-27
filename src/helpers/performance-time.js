const PerformanceTime = (function () {

    function PerformanceTime() {
        let performance = {
            startTime: 0,
            pauseTime: 0,
            endTime: 0,
            totalTime: 0,
            isRunning: false,
        }

        startTiming = function () {
            performance.startTime = window.performance.now();
            performance.isRunning = true;
        }

        pauseTiming = function () {
            performance.pauseTime = window.performance.now();
            performance.isRunning = false;
        }

        endTiming = function () {
            performance.endTime = performance.pauseTime || window.performance.now();
            performance.totalTime += (performance.endTime - performance.startTime);
            _resetTiming();
        }

        isRunning = function () {
            return performance.isRunning;
        }

        getTotalTime = function () {
            return performance.totalTime;
        }

        function _resetTiming() {
            performance.startTime = 0;
            performance.pauseTime = 0;
            performance.endTime = 0;
            performance.isRunning = false;
        }

        return {
            startTiming: startTiming,
            pauseTiming: pauseTiming,
            endTiming: endTiming,
            getTotalTime: getTotalTime,
            isRunning: isRunning,
        };
    }

    return PerformanceTime;
})();
