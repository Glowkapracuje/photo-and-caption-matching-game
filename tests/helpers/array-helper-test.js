(function () {
    const moduleName = 'ArrayHelperIIFE';
    const EXAMPLE_LETTER_ARRAY = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const EXAMPLE_ORDERED_ASC_NUMBER_ARRAY = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const EXAMPLE_ORDERED_DESC_NUMBER_ARRAY = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
    const EXAMPLE_UNORDERED_NUMBER_ARRAY = [3, 6, 1, 5, 2, 10, 9, 4, 8, 7];
    const NUMBER_ARRAY_FROM_1_TO_10 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const START_NUMBER = 1;
    const END_NUMBER = 10;
    const STEP = 1;

    test(moduleName, 'shuffleArray', 'should randomize the given array', false, () => {
        // given & when
        let exampleLetterArray = EXAMPLE_LETTER_ARRAY.slice(0);
        let shuffledArray = ArrayHelperIIFE.shuffleArray(exampleLetterArray);

        // then
        AssertThat.valuesNotEqual(shuffledArray, EXAMPLE_LETTER_ARRAY)
    });

    test(moduleName, 'sortNumbersAscending', 'should sort numbers ascending', false, () => {
        // given
        let numbersToSortAscending = EXAMPLE_UNORDERED_NUMBER_ARRAY.slice(0)

        // when
        ArrayHelperIIFE.sortNumbersAscending(numbersToSortAscending);

        // then
        AssertThat.valuesEqual(numbersToSortAscending, EXAMPLE_ORDERED_ASC_NUMBER_ARRAY)
    });

    test(moduleName, 'sortNumbersDescending', 'should sort numbers descending', false, () => {
        // given
        let numbersToSortDescending = EXAMPLE_UNORDERED_NUMBER_ARRAY.slice(0)

        // when
        ArrayHelperIIFE.sortNumbersAscending(numbersToSortDescending);

        // then
        AssertThat.valuesNotEqual(numbersToSortDescending, EXAMPLE_ORDERED_DESC_NUMBER_ARRAY)
    });


    test(moduleName, 'getUniqueItems', 'should return array with duplicates removed', false, () => {
        // given
        let arrayWithDuplicates = EXAMPLE_UNORDERED_NUMBER_ARRAY.concat(EXAMPLE_UNORDERED_NUMBER_ARRAY);

        // when
        let arrayWithoutDuplicates = ArrayHelperIIFE.getUniqueItems(arrayWithDuplicates);

        // then
        AssertThat.valuesEqual(arrayWithoutDuplicates, EXAMPLE_UNORDERED_NUMBER_ARRAY);
    });

    test(moduleName, 'getUniqueItemsByNewSet', 'should return array with duplicates removed', false, () => {
        // given
        let arrayWithDuplicates = EXAMPLE_UNORDERED_NUMBER_ARRAY.concat(EXAMPLE_UNORDERED_NUMBER_ARRAY);

        // when
        let arrayWithoutDuplicates = ArrayHelperIIFE.getUniqueItemsByNewSet(arrayWithDuplicates);

        // then
        AssertThat.valuesEqual(arrayWithoutDuplicates, EXAMPLE_UNORDERED_NUMBER_ARRAY);
    });

    test(moduleName, 'getArrayWithRequiredItemAndOtherRandoms',
        'should return array with required item and the other random ones', false, () => {
            // given
            let exampleLetterArray = EXAMPLE_LETTER_ARRAY.slice(0);
            let requiredItem = exampleLetterArray[exampleLetterArray.length - 1];
            let requiredItemIndex = exampleLetterArray.indexOf(requiredItem);
            let numberOfItemsToReturn = 5;

            // when
            let resultArray = ArrayHelperIIFE.getArrayWithRequiredItemAndOtherRandoms(
                exampleLetterArray, requiredItemIndex, numberOfItemsToReturn
            );

            // then
            AssertThat.contains(resultArray, requiredItem);
        });

    test(moduleName, 'getArrayWithRequiredItemAndOtherRandoms',
        'should return array with length equal to the number of items parameter provided', false, () => {
            // given
            let exampleLetterArray = EXAMPLE_LETTER_ARRAY.slice(0);
            let requiredItem = exampleLetterArray[exampleLetterArray.length - 1];
            let requiredItemIndex = exampleLetterArray.indexOf(requiredItem);
            let numberOfItemsToReturn = 5;

            // when
            let resultArray = ArrayHelperIIFE.getArrayWithRequiredItemAndOtherRandoms(
                exampleLetterArray, requiredItemIndex, numberOfItemsToReturn
            );

            // then
            AssertThat.valuesEqual(resultArray.length, numberOfItemsToReturn);
        });

    test(moduleName, 'getRandomItemsFromArray', 'should return array with random items', false, () => {
        // given
        let numberOfItemsToReturn = EXAMPLE_LETTER_ARRAY.length;

        // when
        let firstRandomItems = ArrayHelperIIFE.getRandomItemsFromArray(EXAMPLE_LETTER_ARRAY, numberOfItemsToReturn);
        let secondRandomItems = ArrayHelperIIFE.getRandomItemsFromArray(EXAMPLE_LETTER_ARRAY, numberOfItemsToReturn);

        // then
        AssertThat.valuesNotEqual(firstRandomItems, secondRandomItems);
    });

    test(moduleName, 'getRandomItemsFromArray',
        'should perform its operation even if no number of items to be returned is specified ', false, () => {
            // given, when
            let firstRandomItems = ArrayHelperIIFE.getRandomItemsFromArray(EXAMPLE_LETTER_ARRAY);
            let secondRandomItems = ArrayHelperIIFE.getRandomItemsFromArray(EXAMPLE_LETTER_ARRAY);

            // then
            AssertThat.valuesNotEqual(firstRandomItems, secondRandomItems);
        });

    test(moduleName, 'getRandomItemsFromArray', 'should return array with specified number of items', false, () => {
        // given
        let numberOfItems = 3;

        // when
        let randomItemsFromArray = ArrayHelperIIFE.getRandomItemsFromArray(EXAMPLE_LETTER_ARRAY, numberOfItems);

        // then
        AssertThat.valuesEqual(randomItemsFromArray.length, numberOfItems);
    });

    test(moduleName, 'getRandomItemsFromArray',
        'should return array with length the same as the initial one when there is no number of items parameter provided',
        false, () => {
            // given, when
            let randomItemsFromArray = ArrayHelperIIFE.getRandomItemsFromArray(EXAMPLE_LETTER_ARRAY);

            // then
            AssertThat.valuesEqual(randomItemsFromArray.length, EXAMPLE_LETTER_ARRAY.length);
        });

    test(moduleName, 'getDifferencesBetweenTwoArrays',
        'should return unique items that are differences between 2 arrays',
        false, () => {
            // given
            let firstArray = [1, 1, 4, 2]
            let secondArray = [1, 3, 2]
            let expectedDifferences = [4, 3];

            // when
            let uniqueDifferences = ArrayHelperIIFE.getDifferencesBetweenTwoArrays(firstArray, secondArray);

            // then
            AssertThat.valuesEqual(uniqueDifferences, expectedDifferences);
        });

    test(moduleName, 'getArrayOfNumbersFromGivenRangeAndStep',
        'should return array with numbers from the given range',
        false, () => {
            // given, when
            let resultArray = ArrayHelperIIFE.getArrayOfNumbersFromGivenRangeAndStep(
                START_NUMBER, END_NUMBER, STEP
            );

            // then
            AssertThat.valuesEqual(resultArray, NUMBER_ARRAY_FROM_1_TO_10);
        });

    test(moduleName, 'getArrayOfNumbersFromGivenRangeAndStep',
        'should return array with numbers from the given range with default step',
        false, () => {
            // given, when
            let resultArray = ArrayHelperIIFE.getArrayOfNumbersFromGivenRangeAndStep(
                START_NUMBER, END_NUMBER
            );

            let step = resultArray[resultArray.length - 1] - resultArray[resultArray.length - 2];

            // then
            AssertThat.valuesEqual(step, 1);
        });

})();
