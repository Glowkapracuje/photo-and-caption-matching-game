/**
 * AssertThat is an IIFE helper module that consists of methods that throw an error a condition evaluates to false. 
 * Both, project-specific and other simple and generic cases are handled.  
 */
const AssertThat = (function () {

    /**
     * Throws an error if the given value is null or undefined
     * @param {any} value 
     */
    function notNullOrUndefined(value) {
        const errorMessage = `The provided value is ${value}, which is unexpected.`;
        _assert(value != null, errorMessage)
    }

    /**
     * Throws an error if the given value is neither null nor undefined.
     * @param {any} value 
     */
    function nullOrUndefined(value) {
        const errorMessage = `The value: ${value} is neither null nor undefined.`;
        _assert(value == null, errorMessage);
    }

    /**
     * Throws an error if the type of the given value is not a string.
     * @param {any} value 
     */
    function typeIsString(value) {
        const errorMessage = `The type of the: ${value} is not a string.`;
        _assert(typeof value === 'string', errorMessage);
    }

    /**
     * Throws an error if the given value is an empty string.
     * It also throws an error if the type of the given value is not a string.
     * @param {any} value 
     */
    function notEmptyString(value) {
        const errorMessage = `The given value is an empty string.`
        typeIsString(value);
        _assert(value.trim() !== '', errorMessage);
    }

    /**
     * Throws an error if given objects are not the same.
     * @param {Array<number | string>} firstValue 
     * @param {Array<number | string>} secondValue 
    */
    function equals(firstValue, secondValue) {
        const errorMessage = `The first item with value: ${firstValue} does not equal to the second one with value: ${secondValue}`
        _assert(JSON.stringify(firstValue) === JSON.stringify(secondValue), errorMessage);
    }

    /**
    * Throws an error if given values are the same.
    * @param {any} firstValue 
    * @param {any} secondValue 
    */
    function notEquals(firstValue, secondValue) {
        const errorMessage = `The first value: ${firstValue} does not equal to the second one: ${secondValue}`
        _assert(firstValue !== secondValue, errorMessage);
    }

    /**
     * Basic assert method that throws an error if the given condition does not evaluate to true.
     * @param {boolean} condition 
     * @param {string} message custom error message
     */
    function _assert(condition, message) {
        if (!condition) {
            throw new Error(message || "Assertion failed");
        }
    }

    return {
        notNullOrUndefined: notNullOrUndefined,
        nullOrUndefined: nullOrUndefined,
        typeIsString: typeIsString,
        notEmptyString: notEmptyString,
        equals: equals,
        notEquals: notEquals,
    }

})();
