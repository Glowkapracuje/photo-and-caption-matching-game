const NumberSpinnerWidgetIIFE = (function () {

    function generatenumberSpinnerWidget(properties) {
        let numberSpinnerWidgetContainer = document.createElement('div');
        numberSpinnerWidgetContainer.setAttribute('class', 'number-spinner-wrapper columns-50-50');
        let inputWrapper = document.createElement('div');
        inputWrapper.setAttribute('class', 'number-spinner-input-wrapper')

        let input = document.createElement('input');
        input.setAttribute('type', 'number');
        input.setAttribute('id', properties.id);
        input.setAttribute('min', properties.min);
        input.setAttribute('max', properties.max);
        input.setAttribute('value', properties.value);
        for (let onChangeFunction of properties.onChangeFunctions) {
            input.addEventListener('input', onChangeFunction)
        }

        let labelWrapper = document.createElement('div');
        let label = document.createElement('label');
        label.htmlFor = input.id;
        label.innerText = properties.labelText;

        let controlsWrapper = document.createElement('div');
        controlsWrapper.setAttribute('class', 'number-spinner-widget-controls-wrapper')
        let minus = document.createElement('span');
        minus.innerText = '-';
        minus.addEventListener('click', function () {
            let inputValue = (Number(input.value));
            validateInputValue(input, inputValue, properties.min, properties.max);
            decreaseInputValue(input, inputValue, properties.min, properties.max);
        })
        let plus = document.createElement('span');
        plus.innerText = '+';
        plus.addEventListener('click', function () {
            let inputValue = (Number(input.value));
            validateInputValue(input, inputValue, properties.min, properties.max);
            increaseInputValue(input, inputValue, properties.min, properties.max);
        })

        input.addEventListener('input', function() {
            minus.classList.remove('noHover')
            plus.classList.remove('noHover')
            if (Number(input.value) === properties.min) {
                minus.classList.add('noHover')
            } else if (Number(input.value) === properties.max) {
                plus.classList.add('noHover')
            }
        })

        controlsWrapper.append(minus, plus);
        labelWrapper.appendChild(label);
        inputWrapper.appendChild(input);
        inputWrapper.appendChild(controlsWrapper);
        numberSpinnerWidgetContainer.append(labelWrapper, inputWrapper);

        return numberSpinnerWidgetContainer;
    }

    function validateInputValue(input, inputValue, minValue, maxValue) {
        try {
            if (inputValue > maxValue) {
                input.value = maxValue;
                input.dispatchEvent(new Event('input'));
            } else if (inputValue < minValue) {
                input.value = minValue;
                input.dispatchEvent(new Event('input'));
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    function decreaseInputValue(input, inputValue, minValue, maxValue) {
        try {
            if ((inputValue > minValue) && (inputValue <= maxValue)) {

                input.value = (inputValue - 1);
                input.dispatchEvent(new Event('input'));
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    function increaseInputValue(input, inputValue, minValue, maxValue) {
        try {
            if ((inputValue >= minValue) && (inputValue < maxValue)) {

                input.value = (inputValue + 1);
                input.dispatchEvent(new Event('input'));
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    return {
        /**
         * It creates an HTML element with number input fiels which value can be changed using only + and - buttons
         * @param {Array <string>} properties this param is supposed to contain consecutive values required to create the widget
         * @returns a widget HTML element with customized number input
         */
        generatenumberSpinnerWidget: function (properties) {
            return generatenumberSpinnerWidget(properties);
        }
    }
})();