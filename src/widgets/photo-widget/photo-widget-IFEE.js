const ImageWidgetIIFE = (function () {

    function generateImageWidget(properties) {
        let customImageWidgetContainerStyle = properties.imageWidgetContainerStyle;
        let imageId = properties.imageId;
        let imageTitle = properties.imageTitle;
        let imageAlt = properties.imageAlt;
        let imageSrc = properties.imageSrc;
        let onClickFunctions = properties.onClickFunctions;

        let imageWidgetContainer = document.createElement('div');
        imageWidgetContainer.setAttribute('class', 'image-widget-container')
        if (!StringHelperIIFE.isNill(customImageWidgetContainerStyle)) {
            imageWidgetContainer.classList.add(customImageWidgetContainerStyle);
        };

        let imageWrapper = document.createElement('div');
        let image = document.createElement('img');
        image.setAttribute('id', imageId);
        image.setAttribute('title', imageTitle);
        image.setAttribute('alt', imageAlt);
        image.setAttribute('src', imageSrc);
        for (onClickFunction of onClickFunctions) {
            image.addEventListener('click', onClickFunction)
        }
 
        imageWrapper.appendChild(image);
        imageWidgetContainer.appendChild(imageWrapper);
        return imageWidgetContainer;
    }

    return {
        generateImageWidget: function (properties) {
           return generateImageWidget(properties);
        },
        updateImageWidget: function (dataToUpdate) {
            this.updateImageWidget(dataToUpdate)
        }
    }
})();