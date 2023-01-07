"use strict";
class SliderWidget {
    constructor(slidesArray, buttonOnClickFunctions, buttonText = ['>>>', '<<<'], labelText = ['go to right', 'go to left']) {
        this.slidesArray = slidesArray;
        this.buttonOnClickFunctions = buttonOnClickFunctions;
        this.buttonText = buttonText;
        this.labelText = labelText;

        this.sliderWidgetContainer = document.createElement('div');
        this.sliderWidgetTitle = document.createElement('div');
        this.slidesWrapper = document.createElement('div')
        this.slideContainers = [];
        this.slideButtonWrapper = document.createElement('div');
        this.slideLabel = document.createElement('label');
        this.slideButton = document.createElement('button');
        this.slides = [];

        this.onInit();
    }

    set setSlidesArray(slidesArray) {
        this.slidesArray = slidesArray;
    }

    set setButtonText(buttonText) {
        this.buttonText = buttonText;
    }

    set setButtonOnClickFunctions(buttonOnClickFunctions) {
        this.buttonOnClickFunctions = buttonOnClickFunctions;
    }

    get getSlides() {
        return this.slides;
    }

    onInit() {
        this.sliderWidgetContainer.setAttribute('class', 'slider-widget-container');
        this.slideButtonWrapper.setAttribute('class', 'slider-widget-button-wrapper');
        this.slideLabel.setAttribute('class', 'slider-widget-label');
        this.slideButton.addEventListener('click', this.moveSlides.bind(this))
        this.slideButton.setAttribute('class', 'slider-widget-button');
        this.slidesWrapper.setAttribute('class', 'slides-wrapper');

        this.slideButton.setAttribute('id', 'slider-widget-button')
        this.slideButton.innerText = this.buttonText[0];

        this.slideLabel.htmlFor = this.slideButton.id;
        this.slideLabel.innerText = this.labelText[0];

        let slideLabelHrLine = document.createElement('hr');

        this.slideButtonWrapper.append(slideLabelHrLine, this.slideLabel, this.slideButton);
        this.sliderWidgetContainer.append(this.slidesWrapper, this.slideButtonWrapper);
    }

    generateSliderWidget() {
        this.buttonOnClickFunctions.forEach(onClickFunction => {
            this.slideButton.addEventListener('click', onClickFunction);
        })
        this.slides = [];

        this.slidesArray.forEach(slide => {
            let slideContainer = document.createElement('div');
            slideContainer.setAttribute('class', 'slide-container')
            slideContainer.style.marginLeft = `0%`;

            slide.forEach(slideInnerElement => {
                slideContainer.appendChild(slideInnerElement)
            })

            this.slides.push(slideContainer);
            this.slidesWrapper.appendChild(slideContainer);
        })
        this.buttonOnClickFunctions.forEach(onClickFunction => {
            this.slideButtonWrapper.addEventListener('click', onClickFunction);
        })

        return this.sliderWidgetContainer;
    }

    moveSlides = function () {
        let slides = this.getSlides;
        let position = parseFloat(this.slides[0].style.marginLeft)/100

        if (position >= 0) {
            this.slides[0].style.marginLeft = `${parseFloat(this.slides[0].style.marginLeft) - 100}%`
            this.slideButton.innerText = this.buttonText[1];
            this.slideLabel.innerText = this.labelText[1];
            this.slideButtonWrapper.style.flexDirection = 'row-reverse'
        } else if (position < 0 ){
            this.slides[0].style.marginLeft = `${parseFloat(this.slides[0].style.marginLeft) + 100}%`
            this.slideButton.innerText = this.buttonText[0];
            this.slideLabel.innerText = this.labelText[0];
            this.slideButtonWrapper.style.flexDirection = 'row'
        }
    }
}