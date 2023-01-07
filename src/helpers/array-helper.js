const ArrayHelperIIFE = (function () {

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const randomNumber = Math.floor(Math.random() * (i + 1));
            const currentItem = array[i];
            array[i] = array[randomNumber];
            array[randomNumber] = currentItem;
        }
    }

    function getArrayWithRequiredItemAndOtherRandoms(array, requiredItemKey, resultArrayLength) {
        // clone original array in order to operate on an independent array
        const initialArray = array.slice(0);
        const requiredItems = [];
        let randomItems = [];
        let numberOfRandomItems = resultArrayLength - 1;

        requiredItems.push(initialArray[requiredItemKey]);
        initialArray.splice(requiredItemKey, 1);

        randomItems = getRandomItemsFromArray(initialArray, numberOfRandomItems);

        return requiredItems.concat(randomItems);
    }

    function getRandomItemsFromArray(array, numberOfItemsToReturn = null) {
        // clone original array in order to avoid to change the original array
        const initialArray = array.slice(0);
        const randomItems = [];
        let maxArraySize;

        // Set number of items to be returned in array, it depends on whether the number has been provided or not
        if (numberOfItemsToReturn !== null && numberOfItemsToReturn !== undefined && typeof numberOfItemsToReturn === 'number') {
            maxArraySize = initialArray.length - numberOfItemsToReturn;
        } else {
            maxArraySize = initialArray.length;
        }

        //  Push to result array unique random items
        while (initialArray.length > maxArraySize) {
            let randomIndex = Math.floor(Math.random() * initialArray.length);
            let randomItem = initialArray[randomIndex];
            randomItems.push(randomItem);
            initialArray.splice(randomIndex, 1);
        }

        return randomItems;
    }

    function uniqueXorFromTwoArrays(firstArray, secondArray) {
        let xorArray = []
        let uniqueXorArray = [];

        var notIncludedInSecondArray = firstArray.filter(item => {
            return !secondArray.includes(item);
        });
        var notIncludedInFirstArray = secondArray.filter(item => {
            return !firstArray.includes(item);
        });

        xorArray = notIncludedInSecondArray.concat(notIncludedInFirstArray);
        uniqueXorArray = uniqueItems(xorArray);

        return uniqueXorArray;
    }

    function uniqueItems(array) {
        return array.filter((item, itemIndex, array) => array.indexOf(item) === itemIndex);
        // Alternative approach:
        // return [...new Set(array)];
    }

    function getArrayOfNumbersFromGivenRangeAndStep(startNumber, endNumber, step) {
        const arrayLength = Math.floor(((endNumber - startNumber) / step)) + 1;
        return [...Array(arrayLength).keys()].map(number => (number * step) + startNumber);
    }

    return {
        shuffleArray: function (array) {
            return shuffleArray(array)
        },
        uniqueItems: function (array) {
            return uniqueItems(array)
        },
        uniqueXorFromTwoArrays: function (firstArray, secondArray) {
            return uniqueXorFromTwoArrays(firstArray, secondArray)
        },
        getArrayWithRequiredItemAndOtherRandoms: function (array, requiredItemKey, numberOfRandomItems) {
            return getArrayWithRequiredItemAndOtherRandoms(array, requiredItemKey, numberOfRandomItems)
        },
        getRandomItemsFromArray: function (array, numberOfItemsToReturn = null) {
            return getRandomItemsFromArray(array, numberOfItemsToReturn)
        },
        getArrayOfNumbersFromGivenRangeAndStep: function (startNumber, endNumber, step = 1) {
            return getArrayOfNumbersFromGivenRangeAndStep(startNumber, endNumber, step)
        }
    }

})();
