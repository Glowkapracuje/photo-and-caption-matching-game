class ProgressBar {
    constructor() {
        this.itemArray = [];
        this.customWidgetWrapperStyle = '';
        this.currentVehicleIndex = 0;
        this.matchesCount = 0;
        this.averageMatchingTime = 0;

        this.widgetWrapper = document.createElement('div');
        this.progressBarWrapper = document.createElement('div');
        this.labelWrapper = document.createElement('div');
        this.label = document.createElement('span');

        this.generateProgressBar()
        this.widgetWrapper.appendChild(this.progressBarWrapper);
        this.widgetWrapper.appendChild(this.labelWrapper);
        this.labelWrapper.appendChild(this.label)
    }

    generateProgressBar = function () {
        this.widgetWrapper.setAttribute('class', 'progress-bar-widget-wrapper');
        this.progressBarWrapper.setAttribute('class', 'progress-bar-wrapper')
        this.labelWrapper.setAttribute('class', 'progress-bar-label-wrapper')
    }

    updateProgressBar = function (properties) {
        this.itemArray = properties.itemArray;
        this.currentVehicleIndex = properties.currentVehicleIndex;
        this.matchesCount = properties.matchesCount;
        this.averageMatchingTime = properties.averageMatchingTime;
        this.updateProgressBarElement();
    }

    updateProgressBarElement = function () {
        if (!StringHelperIIFE.isNill(this.customWidgetWrapperStyle)) {
            this.widgetWrapper.classList.add(this.customWidgetWrapperStyle);
        };

        this.progressBarWrapper.innerHTML = '';
        let bar = document.createElement('div');
        bar.setAttribute('class', 'progress-bar-bar')
        let stripe = document.createElement('div');
        stripe.setAttribute('class', 'progress-bar-stripe')
        
        let allItemsNumber = this.itemArray.length;
        let currentPosition = this.matchesCount;
        let oneStepPercent = Math.round(((100 / allItemsNumber) + Number.EPSILON) * 100) / 100
        // to ensure things like 1.005 round correctly, Number.EPSILON has been used
        let widthToSet = oneStepPercent * currentPosition;

        widthToSet >= 100 ? widthToSet = 100 : widthToSet;

        stripe.setAttribute('style', `width: ${widthToSet}%`)
        this.progressBarWrapper.append(bar, stripe);
        let averageTime = Math.floor(this.averageMatchingTime * 100) / 100
        let formatedTime = StringHelperIIFE.stringToHHMMSS(averageTime);
        this.label.innerHTML = `<em><span>matches: <strong>${this.matchesCount}</strong> / ${this.itemArray.length}</span>, <span>avg. time: <strong>${averageTime}</em></strong> sec.</span>`
    }
 
}