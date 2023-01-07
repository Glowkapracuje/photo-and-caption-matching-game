const RadioWidgetIIFE = (function () {

    const MAXIMUM_ELEMENTS_NUMBER = 4;
    const ERROR_MESSAGE_RADIO_ELEMENTS_NUMBER_EXCEEDED =
        'Error: {0} exceeds the maximum number of elements which is {1}';

    function generateRadioWidget(radioWidgetContainerStyle, radioArray, titleText = '') {
        if (radioArray.length > 4) {
            console.log(ERROR_MESSAGE_RADIO_ELEMENTS_NUMBER_EXCEEDED.StringHelperIIFE.format(numberOfradioArrayToCreate, MAXIMUM_ELEMENTS_NUMBER))
            return;
        }

        let radioWidgetContainer = document.createElement('div');
        let radioContentWrapper = document.createElement('div');

        if (!StringHelperIIFE.isNill(titleText)) {
            let titleWrapper = document.createElement('div');
            let title = document.createElement('span');
            title.innerText = titleText;
            titleWrapper.setAttribute('class', 'radio-widget-title-wrapper')
            titleWrapper.appendChild(title);
            radioWidgetContainer.appendChild(titleWrapper);
        }

        radioContentWrapper.setAttribute('class', 'radio-content-wrapper')
        radioWidgetContainer.appendChild(radioContentWrapper)

        radioWidgetContainer.setAttribute('class', 'radio-widget-container');

        switch (radioArray.length) {
            case 1:
                radioContentWrapper.classList.add('radio-widget-one-button-100');
                break;
            case 2:
                radioContentWrapper.classList.add('radio-widget-two-buttons-50-50');
                break;
            case 3:
                radioContentWrapper.classList.add('radio-widget-three-buttons-33-33-33');
                break;
            case 4:
                radioContentWrapper.classList.add('radio-widget-four-buttons-25-25-25-25');
                break;
        }

        if (!StringHelperIIFE.isNill(radioWidgetContainerStyle)) {
            radioWidgetContainer.classList.add(radioWidgetContainerStyle);
        };

        radioArray.forEach(radio => {
            let radioWrapper = document.createElement('div');
            let radioElement = document.createElement('input');
            radioElement.setAttribute('type', 'radio');
            radioElement.setAttribute('name', radio.name);
            radioElement.setAttribute('value', radio.value);
            radioElement.setAttribute('id', radio.id);
            if (radio.checked) {
                radioElement.setAttribute('checked', radio.checked);
            }
            radio.onChangeFunctions.forEach(onchangeFunction => { radioElement.addEventListener('change', onchangeFunction) })

            let radioLabel = document.createElement('label');
            radioLabel.setAttribute('class', 'radio-widget-label');
            if (radio === radioArray[0]) {
                radioLabel.classList.add('radio-widget-left-rounded-corners');
            }
            if (radio === radioArray[radioArray.length - 1]) {
                radioLabel.classList.add('radio-widget-right-rounded-corners')
            }
            if (!StringHelperIIFE.isNill(radio.labelStyle)) {
                radioLabel.classList.add(labelStyle)
            }
            radioLabel.htmlFor = radioElement.id;
            radioLabel.innerText = radio.labelText;

            radioWrapper.append(radioElement, radioLabel);
            radioContentWrapper.appendChild(radioWrapper);
        });

        return radioWidgetContainer;
    }

    return {
        /**
         * @param {string} radioWidgetContainerStyle custom style for widget, expressed as a class name
         * @param {Array <string>} radioArray array that contains properties for each radio element
         * @param {string} titleText optional title that can appear before the container with radios
         * @returns An HTML element with customized radio inputs 
         */
        generateRadioWidget: function (radioWidgetContainerStyle, radioArray, titleText = '') {
            return generateRadioWidget(radioWidgetContainerStyle, radioArray, titleText);
        },
    }
})();