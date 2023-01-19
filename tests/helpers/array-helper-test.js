(function () {
    const moduleName = 'ArrayHelperIIFE';
    const EXAMPLE_LETTER_ARRAY = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const EXAMPLE_ORDERED_ASC_NUMBER_ARRAY = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const EXAMPLE_ORDERED_DESC_NUMBER_ARRAY = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
    const EXAMPLE_UNORDERED_NUMBER_ARRAY = [3, 6, 1, 5, 2, 10, 9, 4, 8, 7];

    test(moduleName, 'shuffleArray should randomize the given array', false, () => {
        // given & when
        let shuffledArray = ArrayHelperIIFE.shuffleArray(EXAMPLE_LETTER_ARRAY);

        // then
        AssertThat.notEquals(shuffledArray, EXAMPLE_LETTER_ARRAY)
    });

    test(moduleName, 'sortNumbersAscending should sort numbers ascending', false, () => {
        // given
        let numbersToSortAscending = EXAMPLE_UNORDERED_NUMBER_ARRAY.slice(0)

        // when
        ArrayHelperIIFE.sortNumbersAscending(numbersToSortAscending);

        // then
        AssertThat.notEquals(numbersToSortAscending, EXAMPLE_ORDERED_ASC_NUMBER_ARRAY)
    });

    test(moduleName, 'sortNumbersDescending should sort numbers descending', false, () => {
        // given
        let numbersToSortDescending = EXAMPLE_UNORDERED_NUMBER_ARRAY.slice(0)

        // when
        ArrayHelperIIFE.sortNumbersAscending(numbersToSortDescending);

        // then
        AssertThat.notEquals(numbersToSortDescending, EXAMPLE_ORDERED_DESC_NUMBER_ARRAY)
    });


    test(moduleName, 'getUniqueItems should return array with duplicates removed', false, () => {
        // given
        let arrayWithDuplicates = EXAMPLE_UNORDERED_NUMBER_ARRAY.concat(EXAMPLE_UNORDERED_NUMBER_ARRAY);

        // when
        let arrayWithoutDuplicates = ArrayHelperIIFE.getUniqueItems(arrayWithDuplicates);

        // then
        AssertThat.equals(arrayWithoutDuplicates, EXAMPLE_UNORDERED_NUMBER_ARRAY);
    });

})();
