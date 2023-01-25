const GameStateServiceIIFE = (function () {

    const GAME_STATE = {
        vehicleList: VehicleListServiceIIFE.vehicles,
        currentVehicle: VehicleListServiceIIFE.vehicles[0],
        currentVehicleId: VehicleListServiceIIFE.vehicles[0].id,
        currentVehicleIndex: 0,
        currentCaptions: [],
        vehiclesListSortingOrder: VehicleListServiceIIFE.sortType.alphabetical,
        isMatch: false,
        captionNumber: 3,
        maxCaptionNumber: 4,
        showResult: false,
        matchesCount: 0,
        chosenCaptionId: null,
        colorTheme: ColorThemeServiceIIFE.colorThemeNames.light,
        language: LanguageServiceIIFE.getLanguages().en
    }

    function generateCurrentCaptionsArray() {
        let requiredItemKeyIndex = GAME_STATE.currentVehicleIndex;
        let vehiclesArray = GAME_STATE.vehicleList;
        let numberOfCaptionsToGenerate = GAME_STATE.maxCaptionNumber;

        const requiredVehicleAndOtherRandom = ArrayHelperIIFE.getArrayWithRequiredItemAndOtherRandoms(vehiclesArray, requiredItemKeyIndex, numberOfCaptionsToGenerate);
        ArrayHelperIIFE.shuffleArray(requiredVehicleAndOtherRandom);

        return requiredVehicleAndOtherRandom;
    }

    function updateCurrentCaptionsArray() {
        const nextCaptions = generateCurrentCaptionsArray();
        GAME_STATE.currentCaptions = nextCaptions;
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

    function updateGameStateCurrentVehicle(nextVehicleIndex) {
        sortVehicleList(GAME_STATE.vehiclesListSortingOrder)
        GAME_STATE.currentVehicle = GAME_STATE.vehicleList[nextVehicleIndex];
        GAME_STATE.currentVehicleId = GAME_STATE.vehicleList[nextVehicleIndex].id;
        GAME_STATE.currentVehicleIndex = nextVehicleIndex;
    }

    function updateGameStateCurrentVehicleId(nextVehicleId) {
        let nextVehicleIndex = 0;
        sortVehicleList(GAME_STATE.vehiclesListSortingOrder)
        VehicleListServiceIIFE.vehicles.forEach(vehicle => {
            if (vehicle.id === nextVehicleId) {
                nextVehicleIndex = VehicleListServiceIIFE.vehicles.indexOf(vehicle);
            }
        })
        GAME_STATE.currentVehicle = GAME_STATE.vehicleList[nextVehicleIndex];
        GAME_STATE.currentVehicleId = GAME_STATE.vehicleList[nextVehicleIndex].id;
        GAME_STATE.currentVehicleIndex = nextVehicleIndex;
    }

    function rotateCurrentVehicleIndex() {
        let numberOfVehicles = GAME_STATE.vehicleList.length;
        return nextVehicleIndex = (GAME_STATE.currentVehicleIndex + 1) % numberOfVehicles;
    }

    function sortVehicleList(sortType) {
        switch (sortType) {
            case VehicleListServiceIIFE.sortType.alphabetical:
                GAME_STATE.vehiclesListSortingOrder = VehicleListServiceIIFE.sortType.alphabetical;
                VehicleListServiceIIFE.sortListAlphabetically();
                break;
            case VehicleListServiceIIFE.sortType.category:
                GAME_STATE.vehiclesListSortingOrder = VehicleListServiceIIFE.sortType.category;
                VehicleListServiceIIFE.sortListByCategory()
                break;
            case VehicleListServiceIIFE.sortType.random:
                GAME_STATE.vehiclesListSortingOrder = VehicleListServiceIIFE.sortType.random;
                VehicleListServiceIIFE.sortListRandomly()
                break;
            default:
                GAME_STATE.vehiclesListSortingOrder = VehicleListServiceIIFE.sortType.alphabetical;
                VehicleListServiceIIFE.sortListAlphabetically()
        }
    }

    function updateGameStateWithVehiclesOrderType(event) {
        let inputValue = event.target.value
        try {
            if (Object.values(VehicleListServiceIIFE.sortType).includes(inputValue)) {
                GAME_STATE.vehiclesListSortingOrder = inputValue;
            }
            else {
                throw new ErrorHandlerIIFE.ParameterException(
                    `${inputValue} is not a valid sorting type. Available values are: ${Object.values(VehicleListServiceIIFE.sortType)}`
                )
            }
        }
        catch (e) {
            GAME_STATE.vehiclesListSortingOrder = VehicleListServiceIIFE.sortType.alphabetical
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

        updateGameStateWithChosenCaptionId: function (event) { return updateGameStateWithChosenCaptionId(event) },

        clearChosenCaptionId: function () { return clearChosenCaptionId() },

        updateGameStateWithSettingIsMatchToFalse: function () { return updateGameStateWithSettingIsMatchToFalse() },

        updateGameStateWithColorTheme: function (event) { return updateGameStateWithColorTheme(event) },

        updateGameStateWithLanguage: function (event) { return updateGameStateWithLanguage(event) },

        updateCurrentCaptionsArray: function () { return updateCurrentCaptionsArray() },
    }

})();
