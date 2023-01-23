/**
 * ArrayHelper is an IIFE module that consists of methods that help in operating on arrays.
 * Both, project-specific and other simple and generic cases are handled.  
 */
const ArrayHelperIIFE = (function () {

    /**
     * Randomizes a given array using implementation of the Durstenfeld shuffle algorithm
     * (which is an optimized version of the Fisher-Yates algorithm).
     * @param {Array<any>} anyArray
     */
    function shuffleArray(anyArray) {
        for (let i = anyArray.length - 1; i > 0; i--) {
            const randomNumber = Math.floor(Math.random() * (i + 1));
            const currentItem = anyArray[i];
            anyArray[i] = anyArray[randomNumber];
            anyArray[randomNumber] = currentItem;
        }
    }

    /**
     * Sorts a given array of numbers in ascending order.
     * @param {Array<number>} numberArray 
     */
    function sortNumbersAscending(numberArray) {
        numberArray.sort((a, b) => a - b);
    }

    /**
     * Sorts a given array of numbers in descending order.
     * @param {Array<number>} numberArray 
     */
    function sortNumbersDescending(numberArray) {
        numberArray.sort((a, b) => b - a);
    }

    /**
     * Filters a given array in order to return array without duplicates.
     * @param {Array<any>} anyArray 
     * @returns {Array<any>} array with unique values
     */
    function getUniqueItems(anyArray) {
        return anyArray.filter((item, itemIndex, anyArray) => anyArray.indexOf(item) === itemIndex);
    }

    /**
     * Creates the new array that does not contain duplicates, it takes advantage of the type 'Set' introduced in ES6.
     * @param {Array<any>} anyArray 
     * @returns {Array<any>} array with unique values
     */
    function getUniqueItemsByNewSet(anyArray) {
        return [...new Set(anyArray)];
    }

    /**
     * Takes the specified number of items from the given array and creates a new array that contains:
     * one required item (found by given index) + other random ones.
     * @param {Array<any>} initialArray an array from which the items will be picked
     * @param {number} requiredItemIndex an index of the item that has to be included in the result array
     * @param {number} numberOfItemsToReturn number of items to be returned in the result array
     * @returns {Array<any>} array with one required item and other random ones
     */
    function getArrayWithRequiredItemAndOtherRandoms(initialArray, requiredItemIndex, numberOfItemsToReturn) {
        const allItems = initialArray.slice(0);
        const requiredItems = [];
        let randomItems = [];
        let numberOfRandomItems = numberOfItemsToReturn - 1;

        requiredItems.push(allItems[requiredItemIndex]);
        allItems.splice(requiredItemIndex, 1);

        randomItems = getRandomItemsFromArray(allItems, numberOfRandomItems);

        return requiredItems.concat(randomItems);
    }

    /**
     * Takes a given number of random items from the given array and returns them as a new array
     * @param {Array<any>} initialArray an array from which the items will be picked
     * @param {number} numberOfItemsToReturn 
     * @returns {Array<any>} array with specified number of random items
     */
    function getRandomItemsFromArray(initialArray, numberOfItemsToReturn = null) {
        // clone original array in order to avoid to change the original array
        const allItems = initialArray.slice(0);
        const randomItems = [];
        let maxArraySize;
        // Set number of items to be returned in array, it depends on whether the number has been provided or not
        if (numberOfItemsToReturn !== null && numberOfItemsToReturn !== undefined && typeof numberOfItemsToReturn === 'number') {
            maxArraySize = allItems.length - numberOfItemsToReturn;
        } else {
            maxArraySize = 0;
        }
        //  Push to result array unique random items
        while (allItems.length > maxArraySize) {
            let randomIndex = Math.floor(Math.random() * allItems.length);
            let randomItem = allItems[randomIndex];
            randomItems.push(randomItem);
            allItems.splice(randomIndex, 1);
        }

        return randomItems;
    }

    /**
     * Creates a new array that contains the differences between two given arrays.
     * The result contains only unique values.
     * For example, for given arrays such that: [1,2,3], [1,2,4,4],
     * the function returns: [3,4] 
     * @param {Array<any>} firstArray 
     * @param {Array<any>} secondArray 
     * @returns {Array<any>} Unique differences between two arrays
     */
    function getDifferencesBetweenTwoArrays(firstArray, secondArray) {
        let differences = []
        let uniqueDifferences = [];

        var notIncludedInSecondArray = firstArray.filter(item => {
            return !secondArray.includes(item);
        });
        var notIncludedInFirstArray = secondArray.filter(item => {
            return !firstArray.includes(item);
        });

        differences = notIncludedInSecondArray.concat(notIncludedInFirstArray);
        uniqueDifferences = getUniqueItems(differences);

        return uniqueDifferences;
    }

    /**
     * Generates an array of consecutive numbers from range specified by the given first and the last number.
     * Default step value is equal to 1.
     * @param {number} startNumber 
     * @param {number} endNumber 
     * @param {number} step 
     * @returns {Array<number>} array of consecutive numbers from the range
     */
    function getArrayOfNumbersFromGivenRangeAndStep(startNumber, endNumber, step = 1) {
        const arrayLength = Math.floor(((endNumber - startNumber) / step)) + 1;
        return [...Array(arrayLength).keys()].map(number => (number * step) + startNumber);
    }

    return {
        shuffleArray: shuffleArray,
        sortNumbersAscending: sortNumbersAscending,
        sortNumbersDescending: sortNumbersDescending,
        getUniqueItems: getUniqueItems,
        getUniqueItemsByNewSet: getUniqueItemsByNewSet,
        getDifferencesBetweenTwoArrays: getDifferencesBetweenTwoArrays,
        getRandomItemsFromArray: getRandomItemsFromArray,
        getArrayWithRequiredItemAndOtherRandoms: getArrayWithRequiredItemAndOtherRandoms,
        getArrayOfNumbersFromGivenRangeAndStep: getArrayOfNumbersFromGivenRangeAndStep
    }

})();
