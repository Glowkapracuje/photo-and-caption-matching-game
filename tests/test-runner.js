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

    let testsResultContainer;
    let resultTable;
    let resultTableBody;

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

    let overallTestCounter = 0;

    function getMainContainers() {
        testsResultContainer = document.getElementById('tests-result-container');
        resultTable = document.createElement('table');
        resultTableBody = document.createElement('tbody');
        resultTable.appendChild(resultTableBody);
        testsStatictics = document.createElement('div');
        testsStatictics.setAttribute('class', 'tests-statistics-container')
        testsResultContainer.appendChild(resultTable);
        testsResultContainer.appendChild(testsStatictics);
    };

    function runTests() {
        tests.forEach(test => {
            try {
                test.testFunctionCallBack()
                console.log(`%c${checkMarkUniCode} ${test.testedModuleName}: ${test.testedFunctionName} ${test.testDescription}`, `color: ${darkGreenColor}`);
                createTableResultRow(test, TEST_STATUS.passed);
                statusCounter.passed++;
            } catch (error) {
                if (test.isErrorExpected) {
                    console.log(`%c${checkMarkUniCode} ${test.testedModuleName}: ${test.testedFunctionName} ${test.testDescription}`, `color: ${darkBlueColor}`);
                    createTableResultRow(test, TEST_STATUS.expectedError)
                    statusCounter.passed++;
                    statusCounter.errorExpected++;
                } else {
                    console.log(`%c${ballotXUniCode} ${test.testedModuleName}: ${test.testedFunctionName} ${test.testDescription}`, `color: ${darkRedColor}`);
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

        let rowStyleDependingOnStatus;
        let statusPillStyle;

        switch (testStatus) {
            case TEST_STATUS.passed:
                rowStyleDependingOnStatus = 'test-passed'
                statusPillStyle = 'status-pill--status-passed'
                break;
            case TEST_STATUS.failed:
                rowStyleDependingOnStatus = 'test-failed'
                statusPillStyle = 'status-pill--status-failed'
                break;
            case TEST_STATUS.expectedError:
                rowStyleDependingOnStatus = 'test-expected-error'
                statusPillStyle = 'status-pill--status-expected-error'
                break;
            default:
                rowStyleDependingOnStatus = '';
                statusPillStyle = ''
                break;
        }
        const tableRow = document.createElement('tr');
        tableRow.classList.add(rowStyleDependingOnStatus, statusPillStyle);
        let testResultMessageHTML = `<span>${testedModuleName}: <em><strong>${testedFunctionName}</strong></em> ${testDescription}</span>`;

        if (stackTrace) {
            let properties = {
                titleHtml: testResultMessageHTML,
                titleText: '',
                iconExpandedText: '',
                iconShortenedText: '',
                bodyText: stackTrace,
            }
            let accordionWidget = AccordionWidgetIIFE.generateAccordionWidget(properties);
            tableRow.appendChild(accordionWidget);
        } else {
            tableRow.innerHTML = testResultMessageHTML;
        }

        resultTableBody.appendChild(tableRow);
    }

    function createStatistics() {
        let passedCounter = document.createElement('span');
        passedCounter.innerText = statusCounter.passed;
        passedCounter.classList.add('status-pill--status-passed');
        testsStatictics.appendChild(passedCounter);

        let failedCounter = document.createElement('span');
        failedCounter.innerText = statusCounter.failed;
        failedCounter.classList.add('status-pill--status-failed')
        testsStatictics.appendChild(failedCounter);

        let expectedErrorCounter = document.createElement('span');
        expectedErrorCounter.innerText = statusCounter.errorExpected;
        expectedErrorCounter.classList.add('status-pill--status-expected-error')
        testsStatictics.appendChild(expectedErrorCounter);

        let alltestsNumber = document.createElement('span');
        alltestsNumber.innerText = overallTestCounter;
        alltestsNumber.classList.add('status-pill--status-overall-test-number');
        testsStatictics.appendChild(alltestsNumber);
    }

})();
