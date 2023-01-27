(function () {
    document.addEventListener("DOMContentLoaded", () => {
        getMainContainers();
        runTests()
        createStatistics()
    });

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
                createTableResultRow(test, TEST_STATUS.passed);
                statusCounter.passed++;
            } catch (error) {
                if (test.isErrorExpected) {
                    createTableResultRow(test, TEST_STATUS.expectedError, error.stack)
                    statusCounter.passed++;
                    statusCounter.errorExpected++;
                } else {
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
            let statusBadgePassed = _createStatusBadgePassed();
            tableRow.appendChild(statusBadgePassed);
            tableRow.setAttribute('class', 'row-style-test-passed');
        }
        else if (testStatus === TEST_STATUS.expectedError) {
            let statusBadgePassed = _createStatusBadgePassed();
            let statusBadgeExpectedError = _createStatusBadgeErrorExpected()
            tableRow.setAttribute('class', 'row-style-test-expected-error');

            tableRow.append(statusBadgePassed, statusBadgeExpectedError);
        }
        else if (testStatus === TEST_STATUS.failed) {
            let statusBadgeFailed = _createStatusBadgeFailed();
            tableRow.appendChild(statusBadgeFailed);
            tableRow.setAttribute('class', 'row-style-test-failed');
        }

        let testResultMessage = document.createElement('span');
        testResultMessage.innerHTML =
            `${testedModuleName}: <em><strong>${testedFunctionName}</strong></em> ${testDescription}.`;

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

    function _createStatusBadgePassed() {
        let statusBadgePassed = document.createElement('span');
        statusBadgePassed.setAttribute('class', 'status-badge status-badge--success');
        statusBadgePassed.innerText = '✓ PASSED';

        let tooltipProperties = {
            titleText: 'Test status: Passed',
            bodyText: 'This test has been performed successfully.',
            iconText: ''
        }
        TooltipWidget.generateTooltipWidget(tooltipProperties, statusBadgePassed);
        return statusBadgePassed;
    }

    function _createStatusBadgeErrorExpected() {
        let statusBadgeErrorExpected = document.createElement('span');
        statusBadgeErrorExpected.setAttribute('class', 'status-badge status-badge--info');
        statusBadgeErrorExpected.innerText = '✓ ERROR EXPECTED';

        let tooltipProperties = {
            titleText: 'Test status: Passed',
            bodyText: 'The tested method has thrown the expected error.',
            iconText: ''
        }
        TooltipWidget.generateTooltipWidget(tooltipProperties, statusBadgeErrorExpected);
        return statusBadgeErrorExpected;
    }

    
    function _createStatusBadgeFailed() {
        let statusBadgeFailed = document.createElement('span');
        statusBadgeFailed.setAttribute('class', 'status-badge status-badge--fail');
        statusBadgeFailed.innerText = '✕ FAILED';

        let tooltipProperties = {
            titleText: 'Test status: Failed',
            bodyText: 'The tested method has thrown an unexpected error.',
            iconText: '!'
        }
        TooltipWidget.generateTooltipWidget(tooltipProperties, statusBadgeFailed);
        return statusBadgeFailed;
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

        statusBadgePassed.innerText = '✓ PASSED';
        statusBadgeExpectedError.innerText = '✓ ERROR EXPECTED';
        statusBadgeFailed.innerText = '✕ FAILED';
        statusBadgeOverallCount.innerText = '🧪 OVERALL';

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
