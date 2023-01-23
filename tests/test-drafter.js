/**
 * This is an IIFE module whose task is to declare and make public the basic test method and initialize the empty test collection.
 */
(function () {

    // Global collection of tests
    const tests = []

    /**
     * Main test function that takes properties and executes tests.
     * @param {string} testedModuleName 
     * @param {string} testedFunctionName 
     * @param {string} testDescription 
     * @param {boolean} isErrorExpected 
     * @param {function} testFunctionCallBack 
     */
    function test(testedModuleName, testedFunctionName, testDescription, isErrorExpected, testFunctionCallBack) {
        tests.push({ testedModuleName, testedFunctionName, testDescription, isErrorExpected, testFunctionCallBack })
    }

    // Exposing for a global scope the test method and the collection of tests
    window.test = test;
    window.tests = tests;

})();
