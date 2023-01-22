(function () {
    document.addEventListener("DOMContentLoaded", () => {
        getMainContainers();
        runTests()
        createStatistics()
    });

    const checkMarkUniCode = '\u2714';
    const ballotXUniCode = '\u2718';
    const darkGreenColor = 'rgb(0, 160, 60)';
    const darkRedColor = 'rgb(160, 0, 0)';
    const darkBlueColor = 'rgb(10, 60, 160)';

    let statusCounter = {
        passed: 0,
        failed: 0,
        errorExpected: 0
    }

    const TEST_STATUS = Object.freeze({
        passed: 'PASSED',
        failed: 'FAILED',
        expectedError: 'EXPECTED_ERROR'
    })

    let testsResultContainer;
    let resultTable;
    let resultTableBody;

    let overallTestCounter = 0;

    function getMainContainers() {
        testsResultContainer = document.getElementById('tests-result-container');
        resultTable = document.createElement('table');
        resultTableBody = document.createElement('tbody');
        resultTable.appendChild(resultTableBody);
        testsStaticticsWrapper = document.createElement('div');
        testsStaticticsWrapper.setAttribute('class', 'tests-statistics-container')
        testsResultContainer.appendChild(resultTable);
        testsResultContainer.appendChild(testsStaticticsWrapper);
    };

    function runTests() {
        tests.forEach(test => {
            try {
                test.testFunctionCallBack()
                console.log(
                    `%c${checkMarkUniCode} ${test.testedModuleName}: ${test.testedFunctionName} ${test.testDescription}`, `color: ${darkGreenColor}`
                );
                createTableResultRow(test, TEST_STATUS.passed);
                statusCounter.passed++;
            } catch (error) {
                if (test.isErrorExpected) {
                    console.log(
                        `%c${checkMarkUniCode} ${test.testedModuleName}: ${test.testedFunctionName} ${test.testDescription}`, `color: ${darkBlueColor}`
                    );
                    createTableResultRow(test, TEST_STATUS.expectedError)
                    statusCounter.passed++;
                    statusCounter.errorExpected++;
                } else {
                    console.log(
                        `%c${ballotXUniCode} ${test.testedModuleName}: ${test.testedFunctionName} ${test.testDescription}`, `color: ${darkRedColor}`
                    );
                    console.log(error.stack)
                    createTableResultRow(test, TEST_STATUS.failed, error.stack)
                    statusCounter.failed++;
                }
            }
            overallTestCounter++;
        })
    }

    function createTableResultRow(test, testStatus, stackTrace = '') {
        const testedModuleName = test.testedModuleName;
        const testedFunctionName = test.testedFunctionName;
        const testDescription = test.testDescription;
        const tableRow = document.createElement('tr');

        if (testStatus === TEST_STATUS.passed) {
            let statusBadgePassed = document.createElement('span');
            statusBadgePassed.setAttribute('class', 'status-badge status-badge--success');
            statusBadgePassed.innerText = '✓ PASSED';
            tableRow.appendChild(statusBadgePassed);
            tableRow.setAttribute('class', 'test-passed');
        }
        else if (testStatus === TEST_STATUS.expectedError) {
            let statusBadgePassed = document.createElement('span');
            let statusBadgeExpectedError = document.createElement('span');
            statusBadgePassed.setAttribute('class', 'status-badge status-badge--success');
            statusBadgePassed.innerText = '✓ PASSED';
            statusBadgeExpectedError.setAttribute('class', 'status-badge status-badge--info');
            statusBadgeExpectedError.innerText = 'ERROR EXPECTED';
            tableRow.append(statusBadgePassed, statusBadgeExpectedError);
            tableRow.setAttribute('class', 'test-expected-error');
        }
        else if (testStatus === TEST_STATUS.failed) {
            let statusBadgeFailed = document.createElement('span');
            statusBadgeFailed.setAttribute('class', 'status-badge status-badge--fail');
            statusBadgeFailed.innerText = '✕ FAILED';
            tableRow.appendChild(statusBadgeFailed);
            tableRow.setAttribute('class', 'test-failed');
        }

        let testResultMessage = document.createElement('span');
        testResultMessage.innerHTML =
            `${testedModuleName}: <em><strong>${testedFunctionName}</strong></em> ${testDescription}`;

        if (stackTrace) {
            let properties = {
                titleHtml: testResultMessage.innerHTML,
                titleText: '',
                iconExpandedText: '',
                iconShortenedText: '',
                bodyText: `\n${stackTrace}\n\n`,
            }
            let accordionWidget = AccordionWidgetIIFE.generateAccordionWidget(properties);
            tableRow.appendChild(accordionWidget);
        } else {
            tableRow.appendChild(testResultMessage);
        }

        resultTableBody.appendChild(tableRow);
    }

    function createStatistics() {
        let numberOfPassedTests = document.createElement('span');
        let numberOfExpectedErrors = document.createElement('span');
        let numberOfFailedTests = document.createElement('span');
        let numberOfAllTests = document.createElement('span');

        numberOfPassedTests.innerText = statusCounter.passed;
        numberOfExpectedErrors = statusCounter.errorExpected;
        numberOfFailedTests = statusCounter.failed;
        numberOfAllTests = overallTestCounter;

        let statusBadgePassed = document.createElement('span');
        let statusBadgeExpectedError = document.createElement('span');
        let statusBadgeFailed = document.createElement('span');
        let statusBadgeOverallCount = document.createElement('span');

        statusBadgePassed.setAttribute('class', 'status-badge status-badge--success');
        statusBadgeExpectedError.setAttribute('class', 'status-badge status-badge--info');
        statusBadgeFailed.setAttribute('class', 'status-badge status-badge--fail');
        statusBadgeOverallCount.setAttribute('class', 'status-badge status-badge--warning');

        statusBadgePassed.innerText = '✓ PASSED'
        statusBadgeExpectedError.innerText = '✓ ERROR EXPECTED'
        statusBadgeFailed.innerText = '✕ FAILED'
        statusBadgeOverallCount.innerText = '🧪 OVERALL'

        let passedTestsWrapper = document.createElement('div');
        let expectedErrorsWrapper = document.createElement('div');
        let failedTestsWrapper = document.createElement('div');
        let overallNumberOfTestsWrapper = document.createElement('div');

        passedTestsWrapper.setAttribute('class', 'number-and-badge-wrapper');
        expectedErrorsWrapper.setAttribute('class', 'number-and-badge-wrapper');
        failedTestsWrapper.setAttribute('class', 'number-and-badge-wrapper');
        overallNumberOfTestsWrapper.setAttribute('class', 'number-and-badge-wrapper');

        passedTestsWrapper.append(numberOfPassedTests, statusBadgePassed);
        expectedErrorsWrapper.append(numberOfExpectedErrors, statusBadgeExpectedError);
        failedTestsWrapper.append(numberOfFailedTests, statusBadgeFailed);
        overallNumberOfTestsWrapper.append(numberOfAllTests, statusBadgeOverallCount);

        testsStaticticsWrapper.append(
            passedTestsWrapper, expectedErrorsWrapper, failedTestsWrapper, overallNumberOfTestsWrapper
        );
    }

})();
