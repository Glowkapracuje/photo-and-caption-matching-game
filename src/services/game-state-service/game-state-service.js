const GameStateServiceIIFE = (function () {

    const GAME_STATE = {
        currentItemListName: VehicleListServiceIIFE.availableListNames.vehicles,
        vehicleList: VehicleListServiceIIFE.getCurrentList(),
        currentVehicle: VehicleListServiceIIFE.getCurrentList()[0],
        currentVehicleId: VehicleListServiceIIFE.getCurrentList()[0].id,
        currentVehicleIndex: 0,
        currentCaptions: [],
        currentListPhotosPath: VehicleListServiceIIFE.getPhotoFilePath(),
        itemListSortingOrder: VehicleListServiceIIFE.sortType.alphabetical,
        isMatch: false,
        captionNumber: 3,
        maxCaptionNumber: 4,
        showResult: false,
        matchesCount: 0,
        chosenCaptionId: null,
        colorTheme: ColorThemeServiceIIFE.colorThemeNames.light,
        language: LanguageServiceIIFE.getLanguages().en
    }

    function updateGameStateWithChangingItemList(event) {
        let listName = event.target.value
        VehicleListServiceIIFE.setCurrentList(listName);
        sortVehicleList(GAME_STATE.itemListSortingOrder);
        GAME_STATE.currentItemListName = listName;
        GAME_STATE.vehicleList = VehicleListServiceIIFE.getCurrentList();
        GAME_STATE.currentVehicle = VehicleListServiceIIFE.getCurrentList()[0];
        GAME_STATE.currentVehicleId = VehicleListServiceIIFE.getCurrentList()[0].id;
        GAME_STATE.currentVehicleIndex = 0;
        GAME_STATE.currentListPhotosPath = VehicleListServiceIIFE.getPhotoFilePath();
        GAME_STATE.isMatch = false;
        updateCurrentCaptionsArray()
    }

    function updateCurrentCaptionsArray() {
        const nextCaptions = generateCurrentCaptionsArray();
        GAME_STATE.currentCaptions = nextCaptions;
    }

    function generateCurrentCaptionsArray() {
        let requiredItemKeyIndex = GAME_STATE.currentVehicleIndex;
        let vehiclesArray = GAME_STATE.vehicleList;
        let numberOfCaptionsToGenerate = GAME_STATE.maxCaptionNumber;

        const requiredVehicleAndOtherRandom = ArrayHelperIIFE.getArrayWithRequiredItemAndOtherRandoms(vehiclesArray, requiredItemKeyIndex, numberOfCaptionsToGenerate);
        ArrayHelperIIFE.shuffleArray(requiredVehicleAndOtherRandom);

        return requiredVehicleAndOtherRandom;
    }

    function updateGameStateWithLanguage(event) {
        let inputValue = event.target.value
        switch (inputValue) {
            case LanguageServiceIIFE.getLanguages().en:
                SpeechSynthesisServiceIIFE.switchVoiceToEnglish();
                break;
            case LanguageServiceIIFE.getLanguages().pl:
                SpeechSynthesisServiceIIFE.switchVoiceToPolish();
                break;
            default:
                SpeechSynthesisServiceIIFE.switchVoiceToEnglish();
        }
        GAME_STATE.language = inputValue;
    }

    function updateGameStateWithNextVehicleIndexValue() {
        let nextVehicleIndex = rotateCurrentVehicleIndex();
        updateGameStateCurrentVehicle(nextVehicleIndex);
    }

    function updateGameStateWithColorTheme(event) {
        ColorThemeServiceIIFE.changeTheme(event.target.value)
        GAME_STATE.colorTheme = event.target.value;

    }

    function updateGameStateCurrentVehicle(nextItemIndex) {
        sortVehicleList(GAME_STATE.itemListSortingOrder)
        GAME_STATE.currentVehicle = GAME_STATE.vehicleList[nextItemIndex];
        GAME_STATE.currentVehicleId = GAME_STATE.vehicleList[nextItemIndex].id;
        GAME_STATE.currentVehicleIndex = nextItemIndex;
    }

    function updateGameStateCurrentVehicleId(nextItemId) {
        let nextItemIndex = 0;
        sortVehicleList(GAME_STATE.itemListSortingOrder)
        VehicleListServiceIIFE.getCurrentList().forEach(item => {
            if (item.id === nextItemId) {
                nextItemIndex = VehicleListServiceIIFE.getCurrentList().indexOf(item);
            }
        })
        GAME_STATE.currentVehicle = GAME_STATE.vehicleList[nextItemIndex];
        GAME_STATE.currentVehicleId = GAME_STATE.vehicleList[nextItemIndex].id;
        GAME_STATE.currentVehicleIndex = nextItemIndex;
    }

    function rotateCurrentVehicleIndex() {
        let numberOfVehicles = GAME_STATE.vehicleList.length;
        return nextVehicleIndex = (GAME_STATE.currentVehicleIndex + 1) % numberOfVehicles;
    }

    function sortVehicleList(sortType) {
        switch (sortType) {
            case VehicleListServiceIIFE.sortType.alphabetical:
                GAME_STATE.itemListSortingOrder = VehicleListServiceIIFE.sortType.alphabetical;
                VehicleListServiceIIFE.sortListAlphabetically();
                break;
            case VehicleListServiceIIFE.sortType.category:
                GAME_STATE.itemListSortingOrder = VehicleListServiceIIFE.sortType.category;
                VehicleListServiceIIFE.sortListByCategory()
                break;
            case VehicleListServiceIIFE.sortType.random:
                GAME_STATE.itemListSortingOrder = VehicleListServiceIIFE.sortType.random;
                VehicleListServiceIIFE.sortListRandomly()
                break;
            default:
                GAME_STATE.itemListSortingOrder = VehicleListServiceIIFE.sortType.alphabetical;
                VehicleListServiceIIFE.sortListAlphabetically()
        }
    }

    function updateGameStateWithVehiclesOrderType(event) {
        let inputValue = event.target.value
        try {
            if (Object.values(VehicleListServiceIIFE.sortType).includes(inputValue)) {
                GAME_STATE.itemListSortingOrder = inputValue;
            }
            else {
                throw new ErrorHandlerIIFE.ParameterException(
                    `${inputValue} is not a valid sorting type. Available values are: ${Object.values(VehicleListServiceIIFE.sortType)}`
                )
            }
        }
        catch (e) {
            GAME_STATE.itemListSortingOrder = VehicleListServiceIIFE.sortType.alphabetical
            console.log(e.message);
        }
    }

    function updateGameStateWithCaptionNumber(event) {
        let inputValue = event.target.value
        GAME_STATE.captionNumber = inputValue;
    }

    function updateGameStateWithShowResultToggle() {
        GAME_STATE.isMatch ? GAME_STATE.showResult = true : GAME_STATE.showResult = false;
    }

    function isMatchCurrentVehicleId(event) {
        let isMatch = false;
        if (event.target.value === GAME_STATE.vehicleList[GAME_STATE.currentVehicleIndex].id) {
            isMatch = true;
        }
        GAME_STATE.isMatch = isMatch;
    };

    function updateGameStateWithMatchCounter() {
        GAME_STATE.matchesCount++;
    }

    function updateGameStateWithResettingMatchCounter() {
        GAME_STATE.matchesCount = 0;
    }

    function updateGameStateWithChosenCaptionId(event) {
        GAME_STATE.chosenCaptionId = event.target.value || null
    }

    function clearChosenCaptionId() {
        GAME_STATE.chosenCaptionId = null;
    }

    function updateGameStateWithSettingIsMatchToFalse() {
        GAME_STATE.isMatch = false;
    }

    return {
        updateGameStateWithNextVehicleIndexValue: updateGameStateWithNextVehicleIndexValue,

        sortList: function (sortType) { sortVehicleList(sortType); },

        getGameState: function () { return GAME_STATE; },

        updateGameStateWithVehiclesOrderType: function (event) { return updateGameStateWithVehiclesOrderType(event); },

        isMatchCurrentVehicleId: function (event) { return isMatchCurrentVehicleId(event); },

        updateGameStateWithCaptionNumber: function (event) { return updateGameStateWithCaptionNumber(event) },

        updateGameStateWithShowResultToggle: function () { return updateGameStateWithShowResultToggle() },

        updateGameStateCurrentVehicle: function (nextVehicleIndex) { return updateGameStateCurrentVehicle(nextVehicleIndex) },

        updateGameStateCurrentVehicleId: function (nextVehicleId) { return updateGameStateCurrentVehicleId(nextVehicleId) },

        updateGameStateWithMatchCounter: function () { return updateGameStateWithMatchCounter() },

        updateGameStateWithResettingMatchCounter: function () { return updateGameStateWithResettingMatchCounter() },

        updateGameStateWithChosenCaptionId: function (event) { return updateGameStateWithChosenCaptionId(event) },

        clearChosenCaptionId: function () { return clearChosenCaptionId() },

        updateGameStateWithSettingIsMatchToFalse: function () { return updateGameStateWithSettingIsMatchToFalse() },

        updateGameStateWithColorTheme: function (event) { return updateGameStateWithColorTheme(event) },

        updateGameStateWithLanguage: function (event) { return updateGameStateWithLanguage(event) },

        updateCurrentCaptionsArray: function () { return updateCurrentCaptionsArray() },

        updateGameStateWithChangingItemList: function (event) { return updateGameStateWithChangingItemList(event) },
    }

})();
