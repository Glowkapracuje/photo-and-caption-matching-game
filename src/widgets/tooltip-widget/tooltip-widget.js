const TooltipWidget = (function () {
    function generateTooltipWidget(properties, parentElementToAppendTo) {
        let tooltipWidgetContainer = document.createElement('div');

        let titleAndBodyWrapper = document.createElement('div');
        let title = document.createElement('span');
        let body = document.createElement('span')

        title.innerText = properties.titleText;
        body.innerText = properties.bodyText;
        
        tooltipWidgetContainer.setAttribute('class', 'tooltip-widget-container');
        titleAndBodyWrapper.setAttribute('class', 'title-and-body-wrapper')
        title.setAttribute('class', 'title');
        body.setAttribute('class', 'body');

        titleAndBodyWrapper.append(title, body);
        tooltipWidgetContainer.appendChild(titleAndBodyWrapper);
        if (properties.iconText) {
            let iconWrapper = document.createElement('div');
            let icon = document.createElement('span')
            iconWrapper.appendChild(icon);
            
            iconWrapper.setAttribute('class', 'icon-wrapper')
            icon.setAttribute('class', 'icon')
            icon.innerText = properties.iconText;
            tooltipWidgetContainer.appendChild(iconWrapper);
        }

        parentElementToAppendTo.classList.add('tooltip-trigger');
        parentElementToAppendTo.appendChild(tooltipWidgetContainer);
    }

    return {
        generateTooltipWidget: generateTooltipWidget
    }
})();
