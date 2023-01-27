(function () {
    const moduleName = 'PerformanceTime';

    test(moduleName, 'new PerformanceTime()', 'should create 2 independent object instances', true,
        () => {
            // given & when
            let firstPerformance = new PerformanceTime();
            let secondPerformance = new PerformanceTime();

            // then
            AssertThat.theSameReferrence(firstPerformance, secondPerformance);
        });

        test(moduleName, 'new PerformanceTime()', 'should create 2 object instances that are able to measure time independently', false,
        () => {
            // given & when
            let firstPerformance = new PerformanceTime();
            let secondPerformance = new PerformanceTime();

            // then
            AssertThat.theSameReferrence(firstPerformance, firstPerformance);
        });

        test(moduleName, 'new PerformanceTime()', 'should create 2 object instances that are able to measure time independently', false,
        () => {
            // given & when
            let firstPerformance = new PerformanceTime();
            let secondPerformance = new PerformanceTime();

            // then
            AssertThat.theSameReferrence(firstPerformance.getTotalTime(), firstPerformance.getTotalTime());
        });


})();
