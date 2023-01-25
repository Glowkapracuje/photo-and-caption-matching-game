const PerformanceIIFE = (function() {
    
    let performance = {
        startTime: 0,
        endTime: 0,
        totalTime: 0,
        isRunning: false,
    }

    function startPerformance() {
        if (performance.isRunning) {
            performance.startTime = 0;
            performance.endTime = 0;
        }

        let startTime = window.performance.now();
        performance.startTime = startTime;
        performance.isRunning = true;
    }

    function endPerformance() {
        let endTime = window.performance.now();
        performance.endTime = endTime;
        performance.totalTime = performance.endTime - performance.startTime;
        performance.isRunning = false;
    }

    function getTotalTime() {
        return performance.totalTime;
    }

    return {
        startPerformance: startPerformance,
        endPerformance: endPerformance,
        getTotalTime: getTotalTime,
    }

})();
