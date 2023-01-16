/**
 * AssertThat is an IIFE helper module that consists of methods that throw an error a condition evaluates to false. 
 * Both, project-specific and other simple and generic cases are handled.  
 */
const AssertThat = (function () {

    /**
     * Throws an error if the given value is null or undefined
     * @param {any} value 
     */
    function isNotNullOrUndefined(value) {
        const errorMessage = `The provided value is ${value}, which is unexpected.`;
        assert(value != null, errorMessage)
    }

    /**
     * Throws an error if the given value is neither null nor undefined.
     * @param {any} value 
     */
    function isNullOrUndefined(value) {
        const errorMessage = `The value: ${value} is neither null nor undefined.`;
        assert(value == null, errorMessage);
    }

    /**
     * Throws an error if the type of the given value is not a string.
     * @param {any} value 
     */
    function isString(value) {
        const errorMessage = `The type of the: ${value} is not a string.`;
        assert(typeof value === 'string', errorMessage);
    }

    /**
     * Throws an error if the given value is an empty string.
     * It also throws an error if the type of the given value is not a string.
     * @param {any} value 
     */
    function isNotEmptyString(value) {
        const errorMessage = `The given value is an empty string.`
        isString(value);
        assert(value.trim() !== '', errorMessage);
    }

    /**
     * Basic assert method that throws an error if the given condition does not evaluate to true.
     * @param {boolean} condition 
     * @param {string} message custom error message
     */
    function assert(condition, message) {
        if (!condition) {
            throw new Error(message || "Assertion failed");
        }
    }

    return {
        isNullOrUndefined: isNullOrUndefined,
        isNotNullOrUndefined: isNotNullOrUndefined,
        isString: isString,
        isNotEmptyString: isNotEmptyString,
    }

})();
