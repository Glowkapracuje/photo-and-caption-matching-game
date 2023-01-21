(function () {
    const moduleName = 'StringHelperIIFE';

    test(moduleName, 'formatTimeWithDynamicUnit', 'should return time with padded seconds and the seconds unit', false,
        () => {
            // given
            let expectedTime = '1.001 sec.'

            // when
            let time = StringHelperIIFE.formatTimeWithDynamicUnit(1001);

            // then
            AssertThat.valuesEqual(expectedTime, time)
        });

    test(moduleName, 'formatTimeWithDynamicUnit', 'should return time with padded seconds and the minutes unit', false,
        () => {
            // given
            let expectedTime = '1:01 min.'

            // when
            let time = StringHelperIIFE.formatTimeWithDynamicUnit(61000);

            // then
            AssertThat.valuesEqual(expectedTime, time)
        });

    test(moduleName, 'formatTimeWithDynamicUnit', 'should return time with padded minutes and the hours unit', false,
        () => {
            // given
            let expectedTime = '1:01 hrs'

            // when
            let time = StringHelperIIFE.formatTimeWithDynamicUnit(3660000);

            // then
            AssertThat.valuesEqual(expectedTime, time)
        });

    test(moduleName, 'formatTimeWithDynamicUnit', 'should return the time with the unit when duration is string type', false,
        () => {
            // given
            let expectedTime = '1:01 hrs'

            // when
            let time = StringHelperIIFE.formatTimeWithDynamicUnit("3660000");

            // then
            AssertThat.valuesEqual(expectedTime, time)
        });

    test(moduleName, 'padWithTemplate', 'should return padded string', false, () => {
        // given
        let expectedResult = 'AB1'

        // when
        let paddedString = StringHelperIIFE.padWithTemplate('ABC', '1', true);

        // then
        AssertThat.valuesEqual(expectedResult, paddedString)
    });

    test(moduleName, 'padWithTemplate', 'should return left padded string', false, () => {
        // given
        let expectedResult = '001'

        // when
        let paddedString = StringHelperIIFE.padWithTemplate('000', '1', true);

        // then
        AssertThat.valuesEqual(expectedResult, paddedString)
    });

    test(moduleName, 'padWithTemplate', 'should return right padded string', false, () => {
        // given
        let expectedResult = '100'

        // when
        let paddedString = StringHelperIIFE.padWithTemplate('000', '1', false);

        // then
        AssertThat.valuesEqual(expectedResult, paddedString)
    });

    test(moduleName, 'padWithTemplate', 'should throw error when padTemplate is null', true, () => {
        // given
        let expectedWrongResult = '100'

        // when
        let paddedString = StringHelperIIFE.padWithTemplate(null, '1', false);
    });

    test(moduleName, 'padWithTemplate', 'should throw error when padTemplate is undefined', true, () => {
        // given
        let expectedWrongResult = '100'

        // when
        let paddedString = StringHelperIIFE.padWithTemplate(undefined, '1', false);
    });

    test(moduleName, 'padWithTemplate', 'should throw error when padTarget is null', true, () => {
        // given
        let expectedWrongResult = '100'

        // when
        let paddedString = StringHelperIIFE.padWithTemplate('000', null, false);
    });

    test(moduleName, 'padWithTemplate', 'should throw error when padTarget is undefined', true, () => {
        // given
        let expectedWrongResult = '100'

        // when
        let paddedString = StringHelperIIFE.padWithTemplate('000', undefined, false);
    });

    test(moduleName, 'padWithTemplate', 'example failing test for presentation purposes only', false, () => {
        StringHelperIIFE.padWithTemplate('000', undefined, false);
    });

})();
