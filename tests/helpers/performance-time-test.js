(function () {
    const moduleName = 'PerformanceTime';

    test(moduleName, 'new PerformanceTime()', 'should create 2 independent object instances', false,
        () => {
            // given & when
            let firstPerformance = new PerformanceTime();
            let secondPerformance = new PerformanceTime();

            // then
            AssertThat.differentReference(firstPerformance, secondPerformance);
        });

        test(moduleName, 'new PerformanceTime()', 'should create 2 object instances that are able to measure time independently', false,
        () => {
            // given 
            let firstPerformance = new PerformanceTime();
            let secondPerformance = new PerformanceTime();

            // when 
            firstPerformance.startTiming();
            secondPerformance.startTiming();
            secondPerformance.endTiming();

            // then
            AssertThat.valuesNotEqual(firstPerformance.isRunning(),  secondPerformance.isRunning());
        });
})();
