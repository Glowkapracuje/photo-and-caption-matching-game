/**
 * AssertThat is an IIFE helper module that consists of methods that throw an error a condition evaluates to false. 
 * Both, project-specific and other simple and generic cases are handled.  
 */
const AssertThat = (function () {

    /**
     * Throws an error if the given value is null or undefined
     * @param {any} value 
     * @throws {Error}
     */
    function notNullOrUndefined(value) {
        const errorMessage = `The provided value is ${JSON.stringify(value)}.`;
        _assert(value != null, errorMessage)
    }

    /**
     * Throws an error if the given value is neither null nor undefined.
     * @param {any} value 
     * @throws {Error}
     */
    function nullOrUndefined(value) {
        const errorMessage = `The value: ${JSON.stringify(value)} is neither null nor undefined.`;
        _assert(value == null, errorMessage);
    }

    /**
     * Throws an error if the type of the given value is not a string.
     * @param {any} value 
     * @throws {Error}
     */
    function typeIsString(value) {
        const errorMessage = `The type of the given value: ${JSON.stringify(value)} is a ${typeof value}.`;
        _assert(value.constructor.name === 'String', errorMessage);
    }

    /**
     * Throws an error if the given value is an empty string.
     * It also throws an error if the type of the given value is not a string.
     * @param {any} value 
     * @throws {Error}
     */
    function notEmptyString(value) {
        const errorMessage = `The given value is an empty string.`;
        typeIsString(value);
        _assert(value.trim().length !== 0, errorMessage);
    }

    /**
     * Throws an error if given values are not the same.
     * @param {any} firstValue 
     * @param {any} secondValue 
     * @throws {Error}
     */
    function valuesEqual(firstValue, secondValue) {
        const errorMessage = `The first value: ${JSON.stringify(firstValue)} is not equal to the second one: ${JSON.stringify(secondValue)}.`;
        _assert(JSON.stringify(firstValue) === JSON.stringify(secondValue), errorMessage);
    }

    /**
     * Throws an error if given values are the same.
     * @param {any} firstValue 
     * @param {any} secondValue 
     * @throws {Error}
     */
    function valuesNotEqual(firstValue, secondValue) {
        const errorMessage = `The first value: ${JSON.stringify(firstValue)} is equal to the second one: ${JSON.stringify(secondValue)}.`;
        _assert(JSON.stringify(firstValue) !== JSON.stringify(secondValue), errorMessage);
    }

    /**
     * Throws an error if the given object's references are not the same
     * @param {any} firstObject 
     * @param {any} secondObject 
     * @throws {Error}
     */
    function theSameReferrence(firstObject, secondObject) {
        const errorMessage = `References of given objects: ${JSON.stringify(firstObject)} and ${JSON.stringify(secondObject)}, are not the same`;
        _assert(Object.is(firstObject, secondObject), errorMessage);
    }

    /**
     * Throws an error if the given object's references are the same
     * @param {any} firstObject 
     * @param {any} secondObject 
     * @throws {Error}
     */
    function differentReference(firstObject, secondObject) {
        const errorMessage = `References of given objects: ${JSON.stringify(firstObject)} and ${JSON.stringify(secondObject)}, are the same`;
        _assert(!Object.is(firstObject, secondObject), errorMessage);
    }

    /**
     * Throws an error if the array does not contain the value wanted
     * @param {[any]} array 
     * @param {any} valueWanted 
     * @throws {Error}
     */
    function contains(array, valueWanted) {
        const errorMessage = `The array: ${JSON.stringify(array)} does not contain the value: ${JSON.stringify(valueWanted)}.`;
        _assert(array.includes(valueWanted), errorMessage);
    }

    /**
     * Throws an error if the array contains the value wanted
     * @param {[any]} array 
     * @param {any} valueWanted 
     * @throws {Error}
     */
    function notContains(array, valueWanted) {
        const errorMessage = `The array: ${JSON.stringify(array)} contains the value: ${JSON.stringify(valueWanted)}.`;
        _assert(!array.includes(valueWanted), errorMessage);
    }

    /**
     * Basic assert method that throws an error if the given condition does not evaluate to true.
     * @param {boolean} condition 
     * @param {string} message custom error message
     * @throws {Error}
     */
    function _assert(condition, message) {
        if (!condition) {
            throw new Error(message || 'Assertion failed.');
        }
    }

    return {
        notNullOrUndefined: notNullOrUndefined,
        nullOrUndefined: nullOrUndefined,
        typeIsString: typeIsString,
        notEmptyString: notEmptyString,
        valuesEqual: valuesEqual,
        valuesNotEqual: valuesNotEqual,
        theSameReferrence: theSameReferrence,
        differentReference: differentReference,
        contains: contains,
        notContains: notContains,
    }

})();
