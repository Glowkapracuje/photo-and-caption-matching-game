const AccordionWidgetIIFE = (function () {
    let defaultIconExpandedText = '↑';
    let defaultIconShortenedText = '↓';

    /**
     * Generates an element that appears as an expandable accordion
     * @param {{titleHtml: string, titleText: string, iconExpandedText: string, iconShortenedText: string, bodyText: string }} properties 
     * @returns HTML element
     */
    function generateAccordionWidget(properties) {
        let accordionWidgetContainer = document.createElement('div')
        let headerWrapper = document.createElement('div');
        let title = document.createElement('span')
        let icon = document.createElement('span');
        let bodyWrapper = document.createElement('div');

        accordionWidgetContainer.setAttribute('class', 'accordion-widget-container');
        headerWrapper.setAttribute('class', 'header-wrapper');
        bodyWrapper.setAttribute('class', 'body-wrapper');
        title.setAttribute('class', 'title');
        icon.setAttribute('class', 'icon');

        let titleHtml = properties.titleHtml || '';
        let titleText = properties.titleText || '';
        let iconExpandedText = properties.iconExpandedText || defaultIconExpandedText;
        let iconShortenedText = properties.iconShortenedText || defaultIconShortenedText;
        let bodyText = properties.bodyText;

        headerWrapper.append(title, icon);
        accordionWidgetContainer.append(headerWrapper, bodyWrapper);

        if (titleHtml) {
            title.innerHTML = titleHtml;
        } else {
            title.innerText = titleText;
        }

        icon.innerText = iconShortenedText;
        bodyWrapper.innerText = bodyText;

        headerWrapper.addEventListener('click', function () {
            if (bodyWrapper.style.maxHeight) {
                bodyWrapper.style.maxHeight = null;
                icon.textContent  = iconShortenedText;
            } else {
                bodyWrapper.style.maxHeight = bodyWrapper.scrollHeight + "px";
                icon.textContent = iconExpandedText;
            }
        })

        return accordionWidgetContainer;
    }

    return {
        generateAccordionWidget: generateAccordionWidget,
    }

})();
