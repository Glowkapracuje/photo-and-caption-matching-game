/**
 * When the DOM is ready, generates color panels and gets their computed styles
 */
document.addEventListener("DOMContentLoaded", () => {
    initiallyUpdateGameState();

    getMainContainers();

    generateSidebarWidgets();
    generatePageContent();
});

const RADIO_BUTTON_ID_SUFFIX = '-radio-button'

const NAVIGATION_BUTTON = {
    attributes: {
        id: 'navigation-button'
    },
    callToActionText: {
        start: 'START',
        check: 'CHECK',
        tryAgain: 'TRY AGAIN',
        continue: 'CONTINUE'
    }
}

const CHECK_MARKS = {
    tick: '✓',
    cross: '✕',
    questionMark: '?'
}

const SOUNDS_PATH = './resources/sounds/';
const SOUNDS = {
    correctAnswer: {
        filename: 'correct-answer.mp3',
    },
    wrongAnswer: {
        filename: 'wrong-answer.mp3'
    }
}

const GAME_STATE_DEPRECATED = {
    currentVehicleKeyIndex: 0,
    // currentVehicleKey: Object.keys(VEHICLES)[0],
    // currentVehicle: Object.values(VEHICLES)[0],
    isMatch: false,
}

const LIST_ORDER_TYPES = {
    random: 'RANDOM',
    sorted: 'SORTED'
}

const GAME_MODE = {
    captionsNumber: 3,
    sound: true,
    speechSynthesis: true,
    speechSynthesisOnInit: true,
    vehiclesOrder: 'SORTED',
}

const VEHICLE_PHOTO_WIDGET = new PhotoWidget();
const VEHICLE_CAPTION_WIDGET = new CaptionWidget();
const PROGRESS_BAR = new ProgressBar();

let mainVehiclesContainer;
let mainNavigationContainer;
let mainTagContainer;
let mainSidebarContainer;
let mainProgressBarContainer;

function getMainContainers() {
    mainVehiclesContainer = document.getElementById('vehicles-container');
    mainNavigationContainer = document.getElementById('navigation-container');
    mainTagContainer = document.getElementById('tag-container');
    mainSidebarContainer = document.getElementById('sidebar-container');
    mainProgressBarContainer = document.getElementById('progress-bar-container');
    mainFooterContainer = document.getElementById('footer-container');
}

function generateSidebarWidgets() {
    let slides = []
    let firstSlideWidgets = []
    let secondSlideWidgets = []

    let inputForCaptionsNumber = generateInputForCaptionsNumber();
    let inputForSoundToggle = generateInputForSoundToggle();
    let inputForSpeachSynthesisToggle = generateInputForSpeachSynthesisToggle()
    let inputForVehiclesOrderType = generateInputForVehiclesOrderType();
    let inputForChangingTheme = generateInputForChangingColorTheme();
    let inputForLanguageChange = generateInputForChangingLanguage();
    let pillTags = generatePillTags();

    firstSlideWidgets.push(inputForSoundToggle, inputForSpeachSynthesisToggle, inputForCaptionsNumber, inputForLanguageChange, inputForVehiclesOrderType, inputForChangingTheme);

    secondSlideWidgets.push(pillTags);

    slides.push(firstSlideWidgets, secondSlideWidgets);

    const sliderWidget = new SliderWidget(slides, [], ['>', '<'], ['Show list of the vehicles', 'Back to settings'])
    let sidebarSlides = sliderWidget.generateSliderWidget();

    mainSidebarContainer.appendChild(sidebarSlides);
}

function initiallyUpdateGameState() {
    GameStateServiceIIFE.updateCurrentCaptionsArray();
}

function generatePageContent() {
    generateMatchingGameContent();
    generateNavigationButtons();
    generateOrUpdateProgressBar();
}

function generatePillTags() {
    let tagsArray = GameStateServiceIIFE.getGameState().vehicleList.slice(0);
    let pillTagOnClickFunctions = [GameStateServiceIIFE.clearChosenCaptionId, GameStateServiceIIFE.updateCurrentCaptionsArray, generateMatchingGameContent, resetNavigationButton];
    return TagWidgetIIFE.generateTagWidget(tagsArray, pillTagOnClickFunctions);
}

function generateInputForCaptionsNumber() {
    let numberSpinnerWidgetProperties = {
        id: 'number-spinner-widget-number-of-captions',
        min: 1,
        max: 4,
        value: GAME_MODE.captionsNumber,
        onChangeFunctions: [GameStateServiceIIFE.updateGameStateWithCaptionNumber, generateOrUpdateVehicleCaptions],
        labelText: 'Captions number'
    }
    return NumberSpinnerWidgetIIFE.generatenumberSpinnerWidget(numberSpinnerWidgetProperties)
}

function generateInputForSoundToggle() {
    let checkboxForSoundToggleProperties = {
        widgetContainerStyle: '',
        checkboxId: 'checkbox-widget-sounds-toggle',
        isChecked: GAME_MODE.sound,
        labelText: 'Play sounds',
        onChangeFunctions: [updateGameModeWithSoundToggle]
    }
    return CheckboxWidgetIIFE.generateCheckboxWidget(checkboxForSoundToggleProperties)
}

function generateInputForSpeachSynthesisToggle() {
    let checkboxForSynthesisToggleProperties = {
        widgetContainerStyle: '',
        checkboxId: 'checkbox-widget-speech-synthesis-toggle',
        isChecked: GAME_MODE.speechSynthesisOnInit,
        labelText: 'Speech synthesis on new image',
        onChangeFunctions: [updateGameModeWithSpeechSynthesisToggle]
    }
    return CheckboxWidgetIIFE.generateCheckboxWidget(checkboxForSynthesisToggleProperties)
}

function generateInputForVehiclesOrderType() {
    let title = 'Items order'
    let radioWidgetContainerStyle = '';
    let radios = [
        {
            id: 'radio-widget-vehicles-order-sorted',
            value: VehicleListServiceIIFE.sortType.alphabetical,
            name: 'radio-widget-vehicles-order',
            labelText: 'Alphabetical',
            labelStyle: '',
            checked: (GameStateServiceIIFE.getGameState().vehiclesListSortingOrder === VehicleListServiceIIFE.sortType.alphabetical),
            onChangeFunctions: [GameStateServiceIIFE.updateGameStateWithVehiclesOrderType]
        },
        // {
        //     id: 'radio-widget-vehicles-order-category',
        //     value: VehicleListServiceIIFE.sortType.category,
        //     name: 'radio-widget-vehicles-order',
        //     labelText: 'Category',
        //     labelStyle: '',
        //     checked: (GameStateServiceIIFE.getGameState().vehiclesListSortingOrder === VehicleListServiceIIFE.sortType.category),
        //     onChangeFunctions: [GameStateServiceIIFE.updateGameStateWithVehiclesOrderType]
        // },
        {
            id: 'radio-widget-vehicles-order-random',
            value: VehicleListServiceIIFE.sortType.random,
            name: 'radio-widget-vehicles-order',
            labelText: 'Random',
            labelStyle: '',
            checked: (GameStateServiceIIFE.getGameState().vehiclesListSortingOrder === VehicleListServiceIIFE.sortType.random),
            onChangeFunctions: [GameStateServiceIIFE.updateGameStateWithVehiclesOrderType]
        }
    ];

    return RadioWidgetIIFE.generateRadioWidget(radioWidgetContainerStyle, radios, title);
}


function generateInputForChangingColorTheme() {
    let title = 'Color theme'
    let radioWidgetContainerStyle = '';
    let radioWidgetProperties = [
        {
            id: 'radio-widget-theme-light',
            value: ColorThemeServiceIIFE.colorThemeNames.light,
            name: 'radio-widget-color-theme',
            labelText: 'light',
            labelStyle: '',
            checked: (GameStateServiceIIFE.getGameState().colorTheme === ColorThemeServiceIIFE.colorThemeNames.light),
            onChangeFunctions: [GameStateServiceIIFE.updateGameStateWithColorTheme]
        },
        {
            id: 'radio-widget-theme-mixed',
            value: ColorThemeServiceIIFE.colorThemeNames.mixed,
            name: 'radio-widget-color-theme',
            labelText: 'mixed',
            labelStyle: '',
            checked: (GameStateServiceIIFE.getGameState().colorTheme === ColorThemeServiceIIFE.colorThemeNames.mixed),
            onChangeFunctions: [GameStateServiceIIFE.updateGameStateWithColorTheme]
        },
        // {
        //     id: 'radio-widget-theme-dark',
        //     value: ColorThemeServiceIIFE.colorThemeNames.dark,
        //     name: 'radio-widget-color-theme',
        //     labelText: 'dark',
        //     labelStyle: '',
        //     checked: (GameStateServiceIIFE.getGameState().colorTheme === ColorThemeServiceIIFE.colorThemeNames.dark),
        //     onChangeFunctions: [GameStateServiceIIFE.updateGameStateWithColorTheme]
        // }
    ];

    return RadioWidgetIIFE.generateRadioWidget(radioWidgetContainerStyle, radioWidgetProperties, title);
}

function generateInputForChangingLanguage() {
    let radioWidgetContainerStyle = '';
    let title = 'Captions language'
    let radioWidgetProperties = [
        {
            id: 'radio-widget-en-language',
            value: LanguageServiceIIFE.getLanguages().en,
            name: 'radio-widget-language',
            labelText: 'EN',
            labelStyle: '',
            checked: (GameStateServiceIIFE.getGameState().language === LanguageServiceIIFE.getLanguages().en),
            onChangeFunctions: [GameStateServiceIIFE.updateGameStateWithLanguage, generateMatchingGameContent]
        },
        {
            id: 'radio-widget-pl-language',
            value: LanguageServiceIIFE.getLanguages().pl,
            name: 'radio-widget-language',
            labelText: 'PL',
            labelStyle: '',
            checked: (GameStateServiceIIFE.getGameState().language === LanguageServiceIIFE.getLanguages().pl),
            onChangeFunctions: [GameStateServiceIIFE.updateGameStateWithLanguage, generateMatchingGameContent]
        }
    ];

    return RadioWidgetIIFE.generateRadioWidget(radioWidgetContainerStyle, radioWidgetProperties, title);
}

function generateNavigationButtons() {
    let navigationButtonWrapper = document.createElement('div');
    navigationButtonWrapper.setAttribute('class', 'pushable-button-wrapper');

    let navigationButton = document.createElement('button');
    navigationButton.setAttribute('class', 'pushable-button pushable--orange')
    navigationButton.setAttribute('id', NAVIGATION_BUTTON.attributes.id)
    navigationButton.innerText = NAVIGATION_BUTTON.callToActionText.check;
    navigationButton.addEventListener('click', gameManagement);

    navigationButtonWrapper.appendChild(navigationButton);
    mainNavigationContainer.appendChild(navigationButtonWrapper);
}

function gameManagement() {
    let navigationButton = document.getElementById(NAVIGATION_BUTTON.attributes.id)

    if (GameStateServiceIIFE.getGameState().isMatch) {
        // Case 2: continue has been pushed and the caption still matches the vehicle photo
        // Generate new captions, change game state (current vehicle), set match to false
        if (navigationButton.innerText === NAVIGATION_BUTTON.callToActionText.continue) {
            navigationButton.innerText = NAVIGATION_BUTTON.callToActionText.check;
            // updateGameStateDependingOnVehiclesSortType();
            GameStateServiceIIFE.updateGameStateWithSettingIsMatchToFalse();
            GameStateServiceIIFE.updateGameStateWithShowResultToggle();
            GameStateServiceIIFE.updateGameStateWithNextVehicleIndexValue();
            GameStateServiceIIFE.updateGameStateWithMatchCounter();
            GameStateServiceIIFE.updateCurrentCaptionsArray();
            GameStateServiceIIFE.clearChosenCaptionId();
            generateMatchingGameContent();
            generateOrUpdateProgressBar()
            navigationButton.classList.remove('pushable--green');
            navigationButton.classList.add('pushable--orange');
        } else {
            // Happy path Case 1: check has been pushed and the caption matches the vehicle photo
            navigationButton.innerText = NAVIGATION_BUTTON.callToActionText.continue;
            // updateCaptionIcons()
            GameStateServiceIIFE.updateGameStateWithShowResultToggle();
            onCheckUpdateVehicleCaptions();
            playAnswerSound(SOUNDS.correctAnswer.filename);
            navigationButton.classList.remove('pushable--orange');
            navigationButton.classList.add('pushable--green');
        }
    } else {
        // Case 3: check has been pushed and there is no match
        navigationButton.innerText = NAVIGATION_BUTTON.callToActionText.check;
        playAnswerSound(SOUNDS.wrongAnswer.filename);
        navigationButton.classList.remove('pushable--green');
        navigationButton.classList.add('pushable--orange');
    }
}

function generateMatchingGameContent() {
    StopwatcServiceIIFE.start();
    generateOrUpdateVehiclePhoto();
    generateOrUpdateVehicleCaptions();
}

function resetNavigationButton() {
    let navigationButton = document.getElementById(NAVIGATION_BUTTON.attributes.id)
    navigationButton.innerText = NAVIGATION_BUTTON.callToActionText.check;
    navigationButton.classList.remove('pushable--green');
    navigationButton.classList.add('pushable--orange');
}

function updateGameStateDependingOnVehiclesSortType() {
    let nextVehicleKeyIndex;
    let allVehiclesNumber = Object.keys(VEHICLES).length;

    if (GAME_MODE.vehiclesOrder === LIST_ORDER_TYPES.random) {
        nextVehicleKeyIndex = getRandomNumberFromGivenRange(0, allVehiclesNumber);
    } else if (GAME_MODE.vehiclesOrder === LIST_ORDER_TYPES.sorted) {
        nextVehicleKeyIndex = (GAME_STATE_DEPRECATED.currentVehicleKeyIndex + 1) % allVehiclesNumber;
    }
    updateGameStateWithVehicleKeyIndex(nextVehicleKeyIndex);
}

function updateGameStateWithVehicleKeyIndex(vehicleKeyIndex) {
    GAME_STATE_DEPRECATED.currentVehicleKeyIndex = vehicleKeyIndex;
    GAME_STATE_DEPRECATED.currentVehicleKey = Object.keys(VEHICLES)[vehicleKeyIndex];
    GAME_STATE_DEPRECATED.currentVehicle = Object.values(VEHICLES)[vehicleKeyIndex];
}

function updateGameStateWithVehicleKeyIndexFromEvent(event) {
    let vehicleKeyIndex = Number(event.target.value);
    GAME_STATE_DEPRECATED.currentVehicleKeyIndex = vehicleKeyIndex;
    GAME_STATE_DEPRECATED.currentVehicleKey = Object.keys(VEHICLES)[vehicleKeyIndex];
    GAME_STATE_DEPRECATED.currentVehicle = Object.values(VEHICLES)[vehicleKeyIndex];
}

function getRandomNumberFromGivenRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function updateGameModeWithCaptionsNumber(event) {
    let minValue = event.target.min;
    let maxValue = event.target.max;
    let inputValue = event.target.value;

    if (inputValue > maxValue) {
        GAME_MODE.captionsNumber = maxValue;
    } else if (inputValue < minValue) {
        GAME_MODE.captionsNumber = minValue;
    } else {
        GAME_MODE.captionsNumber = inputValue;
    }
    generateMatchingGameContent();
}

function updateGameModeWithSpeechSynthesisToggle(event) {
    let isChecked = event.target.checked;
    let soundToggleCheckbox = document.getElementById('checkbox-widget-sounds-toggle');

    if (isChecked) {
        GAME_MODE.speechSynthesisOnInit = true;
        GAME_MODE.speechSynthesis = true;
        GAME_MODE.sound = true;
    } else if (!isChecked) {
        GAME_MODE.speechSynthesisOnInit = false;
    }
    soundToggleCheckbox.checked = GAME_MODE.sound;
}

function updateGameModeWithSoundToggle(event) {
    let isChecked = event.target.checked
    let speechSynthesisToggleCheckbox = document.getElementById('checkbox-widget-speech-synthesis-toggle');
    GAME_MODE.sound = isChecked;

    if (isChecked) {
        GAME_MODE.speechSynthesisOnInit = true;
        GAME_MODE.speechSynthesis = true;
    } else if (!isChecked) {
        GAME_MODE.speechSynthesisOnInit = false;
        GAME_MODE.speechSynthesis = false;
    }
    speechSynthesisToggleCheckbox.checked = GAME_MODE.speechSynthesisOnInit;
}

function generateOrUpdateProgressBar() {
    let progressBarWidgetProperties = {
        customWidgetWrapperStyle: '',
        itemArray: GameStateServiceIIFE.getGameState().vehicleList,
        currentVehicleIndex: GameStateServiceIIFE.getGameState().currentVehicleIndex,
        matchesCount: GameStateServiceIIFE.getGameState().matchesCount,
        averageMatchingTime: StopwatcServiceIIFE.getAverageTime()
    }
    PROGRESS_BAR.updateProgressBar(progressBarWidgetProperties);
    mainProgressBarContainer.appendChild(PROGRESS_BAR.widgetWrapper)
}

function generateOrUpdateVehiclePhoto() {
    const photosUrl = './resources/images/';

    let photoWidgetProperties = {
        customWidgetWrapperStyle: '',
        photoId: GameStateServiceIIFE.getGameState().currentVehicleId,
        photoTitle: GameStateServiceIIFE.getGameState().currentVehicle.caption[GameStateServiceIIFE.getGameState().language],
        photoAlt: GameStateServiceIIFE.getGameState().currentVehicle.name,
        photoSrc: `${photosUrl}${GameStateServiceIIFE.getGameState().currentVehicle.imageFileName}`,
        onClickFunctions: [speakTheVehiclePhotoTitle],
        onUpdateFunction: speakOnInit,
    }
    VEHICLE_PHOTO_WIDGET.updatePhotoWidget(photoWidgetProperties);
    mainVehiclesContainer.appendChild(VEHICLE_PHOTO_WIDGET.widgetWrapper);
}

function generateOrUpdateVehicleCaptions() {
    let requiredVehicleAndOtherRandom = GameStateServiceIIFE.getGameState().currentCaptions.slice(0);
    let requiredItemId = GameStateServiceIIFE.getGameState().currentVehicleId;
    let arrayLength = GameStateServiceIIFE.getGameState().captionNumber;

    while (requiredVehicleAndOtherRandom.length > arrayLength) {
        let firstNotRequiredItem = requiredVehicleAndOtherRandom.filter(item => { return item.id !== requiredItemId })[0];
        requiredVehicleAndOtherRandom.splice(requiredVehicleAndOtherRandom.indexOf(firstNotRequiredItem), 1);
    }

    let captionWidgetProperties = {
        customWidgetWrapperStyle: '',
        customLabelStyle: '',
        items: requiredVehicleAndOtherRandom,
        captionName: 'vehicle-caption',
        captionOnClickFunctions: [GameStateServiceIIFE.isMatchCurrentVehicleId, stopStopwatchOnMatch, GameStateServiceIIFE.updateGameStateWithChosenCaptionId],
        labelOnClickFunctions: [speakTheVehicleCaption],
        isMatch: GameStateServiceIIFE.getGameState().isMatch,
        currentVehicleId: GameStateServiceIIFE.getGameState().currentVehicleId,
        showResult: GameStateServiceIIFE.getGameState().showResult,
        chosenCaptionId: GameStateServiceIIFE.getGameState().chosenCaptionId
    }
    VEHICLE_CAPTION_WIDGET.updateCaptionWidget(captionWidgetProperties);
    mainVehiclesContainer.appendChild(VEHICLE_CAPTION_WIDGET.captionWidgetWrapper);
}

function onCheckUpdateVehicleCaptions() {
    VEHICLE_CAPTION_WIDGET.updadeCaptionLabelSymbolOnAnswer(GameStateServiceIIFE.getGameState().currentVehicleId, GameStateServiceIIFE.getGameState().isMatch, GameStateServiceIIFE.getGameState().showResult)
}

function stopStopwatchOnMatch() {
    if (GameStateServiceIIFE.getGameState().isMatch) {
        StopwatcServiceIIFE.stop()
    }
}

function speakOnInit(text) {
    if (GAME_MODE.speechSynthesis && GAME_MODE.speechSynthesisOnInit) {
        SpeechSynthesisServiceIIFE.speakNow(text);
    }
}

function speakTheVehiclePhotoTitle(event) {
    if (GAME_MODE.speechSynthesis) {
        SpeechSynthesisServiceIIFE.speakNow(event.target.title);
    }
}

function speakTheVehicleCaption(event) {
    if (GAME_MODE.speechSynthesis) {
        SpeechSynthesisServiceIIFE.speakNow(event.target.innerText);
    }
}

function playAnswerSound(soundFileName) {
    if (GAME_MODE.sound) {
        new Audio(SOUNDS_PATH + soundFileName).play();
    }
}
