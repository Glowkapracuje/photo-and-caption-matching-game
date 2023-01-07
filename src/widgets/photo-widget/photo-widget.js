class PhotoWidget {
    constructor() {
        this.customWidgetWrapperStyle = '';
        this.photoId = '';
        this.photoTitle = '';
        this.photoAlt = '';
        this.photoSrc = '';
        this.onClickFunctions = [];
        this.onUpdateFunctions = '';

        this.widgetWrapper = document.createElement('div');
        this.photoWrapper = document.createElement('div');
        this.photo = document.createElement('img');

        this.generatePhotoWidget()

        this.idSuffix = '-photo-widget';
    }

    /**
     * Generates basic widget
     */
    generatePhotoWidget = function () {
        this.widgetWrapper.setAttribute('class', 'photo-widget-wrapper')
        this.photoWrapper.setAttribute('class', 'photo-wrapper')
        this.photoWrapper.appendChild(this.photo);
        this.widgetWrapper.appendChild(this.photoWrapper);
    };

    /**
     * Updates widget fields and updates element structure with them
     * @param {Object} properties 
     */
    updatePhotoWidget = function (properties) {
        this.customWidgetWrapperStyle = properties.customWidgetWrapperStyle;
        this.photoId = properties.photoId;
        this.photoTitle = properties.photoTitle;
        this.photoAlt = properties.photoAlt;
        this.photoSrc = properties.photoSrc;
        this.onClickFunctions = properties.onClickFunctions;
        this.onUpdateFunction = properties.onUpdateFunction;
        this.updatePhotoWidgetElement();
    }

    /**
     * Updates element structure
     */
    updatePhotoWidgetElement = function () {
        if (!StringHelperIIFE.isNill(this.customWidgetWrapperStyle)) {
            this.widgetWrapper.classList.add(this.customWidgetWrapperStyle);
        };
        this.photo.setAttribute('id', this.photoId + this.idSuffix);
        this.photo.setAttribute('title', this.photoTitle);
        this.photo.setAttribute('alt', this.photoAlt);
        this.photo.setAttribute('src', this.photoSrc);
        this.onClickFunctions.forEach(onClickFunction => {
            this.photo.addEventListener('click', onClickFunction)
        });
        this.onUpdateFunction(this.photo.title)
    }
}

