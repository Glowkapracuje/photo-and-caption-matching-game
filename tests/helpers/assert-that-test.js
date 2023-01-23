(function () {
    const moduleName = 'AssertThat';
    const EXAMPLE_VALUE_NOT_NULL_NOT_UNDEFINED = 'notNullNotUndefinedValue'
    const SINGLE_QUOTES_STRING = 'single quotes string';
    const DOUBLE_QUOTES_STRING = "double quotes string";
    const BACKTICKS_STRING = `backticks string`;
    const STRING_OBJECT_WRAPPED = String('string object wrapped');
    const EMPTY_STRING = '';
    const NOT_EMPTY_STRING = 'not empty string';
    const FIRST_SIMPLE_NUMBER_ARRAY = [1, 2, 3]
    const SECOND_SIMPLE_NUMBER_ARRAY = [1, 2, 3]
    const FIRST_OBJECT_ARRAY = [{ a: 1, b: 2 }]
    const SECOND_OBJECT_ARRAY = [{ a: 1, b: 2 }]
    const EXAMPLE_LETTER_ARRAY = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

    test(moduleName, 'notNullOrUndefined', 'should throw an error if the provided value is null or undefined', true, () => {
        // given, when & then
        AssertThat.notNullOrUndefined(null);
        AssertThat.notNullOrUndefined(undefined);
    });

    test(moduleName, 'notNullOrUndefined', 'should not throw an error if the provided value is not null or undefined', false, () => {
        // given, when & then
        AssertThat.notNullOrUndefined(EXAMPLE_VALUE_NOT_NULL_NOT_UNDEFINED);
    });

    test(moduleName, 'nullOrUndefined', 'should not throw an error if the provided value is null or undefined', false, () => {
        // given, when & then
        AssertThat.nullOrUndefined(null);
        AssertThat.nullOrUndefined(undefined);
    });

    test(moduleName, 'nullOrUndefined', 'should throw an error if the provided value is neither null nor undefined', true, () => {
        // given, when & then
        AssertThat.nullOrUndefined(EXAMPLE_VALUE_NOT_NULL_NOT_UNDEFINED);
    });

    test(moduleName, 'typeIsString', 'should throw an error if the provided value is not a string', true, () => {
        // given, when & then
        AssertThat.typeIsString(1);
    });

    test(moduleName, 'typeIsString', 'should not throw an error if the provided value is a string', false, () => {
        // given, when & then
        AssertThat.typeIsString(SINGLE_QUOTES_STRING);
        AssertThat.typeIsString(DOUBLE_QUOTES_STRING);
        AssertThat.typeIsString(BACKTICKS_STRING);
        AssertThat.typeIsString(STRING_OBJECT_WRAPPED);
    });

    test(moduleName, 'notEmptyString', 'should throw an error if the provided value is an empty string', true, () => {
        // given, when & then
        AssertThat.notEmptyString(EMPTY_STRING);
    });

    test(moduleName, 'notEmptyString', 'should not throw an error if the provided value is not an empty string', false, () => {
        // given, when & then
        AssertThat.notEmptyString(NOT_EMPTY_STRING);
    });

    test(moduleName, 'valuesEqual', 'should throw an error if the provided values are not the same', true, () => {
        // given, when & then
        AssertThat.valuesEqual(EMPTY_STRING, NOT_EMPTY_STRING);
    });

    test(moduleName, 'valuesEqual', 'should not throw an error if the provided values are the same', false, () => {
        // given, when & then
        AssertThat.valuesEqual(FIRST_SIMPLE_NUMBER_ARRAY, SECOND_SIMPLE_NUMBER_ARRAY);
        AssertThat.valuesEqual(FIRST_OBJECT_ARRAY, SECOND_OBJECT_ARRAY);
    });

    test(moduleName, 'valuesNotEqual', 'should throw an error if the provided values are the same', true, () => {
        // given, when & then
        AssertThat.valuesNotEqual(FIRST_SIMPLE_NUMBER_ARRAY, SECOND_SIMPLE_NUMBER_ARRAY);
        AssertThat.valuesNotEqual(FIRST_OBJECT_ARRAY, SECOND_OBJECT_ARRAY);
    });

    test(moduleName, 'contains', 'should throw an error if the array does not contain the given value', true, () => {
        // given, when & then
        AssertThat.contains(EXAMPLE_LETTER_ARRAY, 5);
    });

    test(moduleName, 'contains', 'should not throw an error when the array contains the given value', false, () => {
        // given, when & then
        AssertThat.contains(EXAMPLE_LETTER_ARRAY, EXAMPLE_LETTER_ARRAY[0]);
    });

})();
