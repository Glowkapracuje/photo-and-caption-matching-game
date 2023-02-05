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
    const EXAMPLE_NUMBER = 3; 
    const EXAMPLE_DECIMAL_NUMBER = 3.14;
    const EXAMPLE_NUMBER_WITH_SCIENTIFIC_NOTATION = 123e5;
    const EXAMPLE_NUMBER_OBJECT_WRAPPED = Number(666);

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

    test(moduleName, 'typeIsNumber', 'should throw an error if the provided value is not a number', true, () => {
        // given, when & then
        AssertThat.typeIsNumber(SINGLE_QUOTES_STRING);
    });

    test(moduleName, 'typeIsNumber', 'should not throw an error if the provided value is a number', false, () => {
        // given, when & then
        AssertThat.typeIsNumber(EXAMPLE_NUMBER);
        AssertThat.typeIsNumber(EXAMPLE_DECIMAL_NUMBER);
        AssertThat.typeIsNumber(EXAMPLE_NUMBER_WITH_SCIENTIFIC_NOTATION);
        AssertThat.typeIsNumber(EXAMPLE_NUMBER_OBJECT_WRAPPED);
    });

    test(moduleName, 'notEmptyString', 'should throw an error if the provided value is an empty string', true, () => {
        // given, when & then
        AssertThat.notEmptyString(EMPTY_STRING);
    });

    test(moduleName, 'notEmptyString', 'should not throw an error if the provided value is not an empty string', false, () => {
        // given, when & then
        AssertThat.notEmptyString(NOT_EMPTY_STRING);
    });

    test(moduleName, 'valuesEqual', 'should throw an error if the provided object arrays are not the same', true, () => {
        // given
        let firstSimpleObject = [{
            vehicle: {
                name: 'monster-truck',
            },
            animal: {
                name: 'elephant',
            }
        }];

        let secondSimpleObject = [{
            vehicle: {
                name: 'snowplow',
            },
            animal: {
                name: 'shark',
            }
        }];
        // when & then
        AssertThat.valuesEqual(firstSimpleObject, secondSimpleObject);
    });

    test(moduleName, 'valuesEqual', 'should not throw an error if the provided object arrays are the same', false, () => {
        // given
        let firstSimpleObject = [{
            vehicle: {
                name: 'monster-truck',
            },
            animal: {
                name: 'elephant',
            }
        }];

        let secondSimpleObject = [{
            vehicle: {
                name: 'monster-truck',
            },
            animal: {
                name: 'elephant',
            }
        }];
        // when & then
        AssertThat.valuesEqual(firstSimpleObject, secondSimpleObject);
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

    test(moduleName, 'notContains', 'should throw an error if the array contains the given value', true, () => {
        // given, when & then
        AssertThat.notContains(EXAMPLE_LETTER_ARRAY, EXAMPLE_LETTER_ARRAY[0]);
    });

    test(moduleName, 'notContains', 'should not throw an error when the array does not contain the given value', false, () => {
        // given, when & then
        AssertThat.notContains(EXAMPLE_LETTER_ARRAY, 666);
    });

    test(moduleName, 'theSameReferrence', 'should pass when the objects have the same reference', false, () => {
        // given
        let firstObject = new String('example text');

        // when & then
        AssertThat.theSameReferrence(firstObject, firstObject);
    });

    test(moduleName, 'theSameReferrence', 'should throw an error when the objects have not the same reference', true, () => {
        // given
        let firstObject = new String('first example text');
        let secondObject = new String('second example text');

        // when & then
        AssertThat.theSameReferrence(firstObject, secondObject);
    });

    test(moduleName, 'differentReference', 'should pass when the objects have different references', false, () => {
        // given
        let firstObject = new String('example text');
        let secondObject = new String('example text');

        // when & then
        AssertThat.differentReference(firstObject, secondObject);
    });

    test(moduleName, 'differentReference', 'should throw an error when the objects have the same reference', true, () => {
        // given
        let firstObject = new String('example text');

        // when & then
        AssertThat.differentReference(firstObject, firstObject);
    });

})();
