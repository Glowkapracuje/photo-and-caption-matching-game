class CaptionWidget {
    constructor() {
        this.customWidgetWrapperStyle = '';
        this.captionName = '';
        this.captionOnClickFunctions = [];
        this.labelOnClickFunctions = [];
        this.customLabelStyle = ''
        this.items = [];
        this.isMatch = false;
        this.showResult = false;
        this.chosenCaptionId = null;

        this.captionWidgetWrapper = document.createElement('div');
        this.symbols = [];
        this.idSuffix = '-caption-widget';
        this.generateCaptionWidget()
    }

    /**
     * Generates basic widget
     */
    generateCaptionWidget = function () {
        this.captionWidgetWrapper.setAttribute('class', 'caption-widget-wrapper')
    };

    /**
     * Updates widget fields and updates element structure with them
     * @param {Object} properties 
     */
    updateCaptionWidget = function (properties) {
        this.customWidgetWrapperStyle = properties.customWidgetWrapperStyle;
        this.customLabelStyle = properties.customLabelStyle;
        this.items = properties.items;
        this.captionName = properties.captionName;
        this.captionValue = properties.captionValue;
        this.captionOnClickFunctions = properties.captionOnClickFunctions;
        this.labelOnClickFunctions = properties.labelOnClickFunctions;
        this.currentVehicleId = properties.currentVehicleId;
        this.isMatch = properties.isMatch;
        this.showResult = properties.showResult;
        this.chosenCaptionId = properties.chosenCaptionId;
        this.updateCaptionWidgetElement();
    }

    /**
     * Updates element structure
     */
    updateCaptionWidgetElement = function () {
        this.clearCaptionWidgetWrapper()
        if (!StringHelperIIFE.isNill(this.customWidgetWrapperStyle)) {
            this.captionWidgetWrapper.classList.add(this.customWidgetWrapperStyle);
        };
        this.symbols = [];

        let language = GameStateServiceIIFE.getGameState().language;

        this.items.forEach(item => {
            const captionWrapper = document.createElement('div');
            const input = document.createElement('input');
            const label = document.createElement('label');
            const symbol = document.createElement('span');

            input.setAttribute('type', 'radio');
            input.setAttribute('id', item.id + this.idSuffix);
            input.setAttribute('name', this.captionName);
            input.setAttribute('value', item.id);
            // debugger
            if (this.currentVehicleId === input.value && this.chosenCaptionId === input.value) {
                input.setAttribute('checked', true);
            }
            this.captionOnClickFunctions.forEach(onClickFunction => {
                input.addEventListener('click', onClickFunction)
            })

            label.setAttribute('class', 'caption-label')
            if (!StringHelperIIFE.isNill(this.customLabelStyle)) {
                label.classList.add(this.customLabelStyle);
            };
            label.htmlFor = input.id;
            label.innerText = item.caption[language];
            this.labelOnClickFunctions.forEach(onClickFunction => {
                label.addEventListener('click', onClickFunction)
            })

            symbol.setAttribute('class', 'caption-label-symbol')
            symbol.setAttribute('id', item.id);

            this.symbols.push(symbol);

            captionWrapper.setAttribute('class', 'caption-wrapper')

            label.appendChild(symbol)
            captionWrapper.append(input, label);
            this.captionWidgetWrapper.appendChild(captionWrapper)
        });

        this.updadeCaptionLabelSymbolOnAnswer(this.currentVehicleId, this.isMatch, this.showResult)
    }

    clearCaptionWidgetWrapper = function () {
        this.captionWidgetWrapper.innerHTML = '';
    }

    updadeCaptionLabelSymbolOnAnswer(inputIdToCompare, isMatch, showResult) {
        this.symbols.forEach(symbol => {
            if (!showResult) {
                symbol.classList.add('caption-label-symbol--neutral')
            } else if (showResult && isMatch) {
                if (symbol.id === inputIdToCompare) {
                    symbol.classList.add('caption-label-symbol--correct-answer');
                } else {
                    symbol.classList.add('caption-label-symbol--wrong-answer')
                }
            }
        })
    }
}
