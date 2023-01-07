const CheckboxWidgetIIFE = (function () {

    function generateCheckboxWidget (properties) {
        let customCheckboxWidgetContainerStyle = properties.widgetContainerStyle;
        let checkboxId = properties.checkboxId;
        let isChecked = properties.isChecked;
        let labelText = properties.labelText;
        let onChangeFunctions = properties.onChangeFunctions;

        let checkboxWidgetContainer = document.createElement('div');
        checkboxWidgetContainer.setAttribute('class', 'checkbox-widget-container small');

        if (!StringHelperIIFE.isNill(customCheckboxWidgetContainerStyle)) {
            checkboxWidgetContainer.classList.add(customCheckboxWidgetContainerStyle);
        }

        let labelWrapper = document.createElement('div');
        let label = document.createElement('label');

        let checkboxWrapper = document.createElement('div');
        let checkbox = document.createElement('input')

        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('id', checkboxId);
        checkbox.setAttribute('checked', isChecked)
        for (let onChangeFunction of onChangeFunctions) {
            checkbox.addEventListener('change', onChangeFunction);
        }

        label.htmlFor = checkbox.id;
        label.innerText = labelText;

        labelWrapper.appendChild(label);
        checkboxWrapper.appendChild(checkbox);
        checkboxWidgetContainer.append(checkboxWrapper, labelWrapper)
        return checkboxWidgetContainer;
    }

    return {
        /**
         * It creates an HTML element with checkbox field and allows to manage it via callback functions assigned with the event listeners
         * @param {Array <string>} properties this param is supposed to contain consecutive values required to create the widget
         * @returns a widget HTML element with customized checkbox
         */
        generateCheckboxWidget: function (properties) {
            return generateCheckboxWidget(properties);
        }
    }
})();
