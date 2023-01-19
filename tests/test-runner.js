(function () {
    'use strict';

    const checkMarkUniCode = '\u2714';
    const ballotXUniCode = '\u2718';
    const greenColor = '#228B22';
    const darkRedColor = '#B22222';
    const orangeColor = '#FF8C00';

    tests.forEach(test => {
        try {
            test.testFunctionCallBack()
            console.log(`%c${checkMarkUniCode} ${test.testedModuleName}: ${test.testName}`, `color: ${greenColor}`);
        } catch (error) {
            if (test.isErrorExpected) {
                console.log(`%c${checkMarkUniCode} ${test.testedModuleName}: ${test.testName}`, `color: ${orangeColor}`);
            } else {
                console.log(`%c${ballotXUniCode} ${test.testedModuleName}: ${test.testName}`, `color: ${darkRedColor}`);
                console.log(error.stack)
            }
        }
    })
})();
