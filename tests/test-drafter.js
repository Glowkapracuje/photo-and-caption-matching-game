let tests = []

function test(testedModuleName, testName, isErrorExpected, testFunctionCallBack) {
    tests.push({ testedModuleName, testName, isErrorExpected, testFunctionCallBack })
}

window.test = test;