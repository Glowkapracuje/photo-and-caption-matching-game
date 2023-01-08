const VehicleListServiceIIFE = (function () {

    let currentList;
    let photoFilePath;

    const AVAILABLE_LISTS = Object.freeze({
        vehicles: "VEHICLES",
        animals: "ANIMALS"
    })

    const LIST_SORT_TYPE = Object.freeze({
        alphabetical: 'ALPHABETICAL',
        category: 'CATEGORY',
        random: 'RANDOM'
    });

    const VEHICLES = Object.values(VehicleListIIFE.vehiclesCollection);
    const ANIMALS = Object.values(AnimalListIIFE.animalsCollection);

    function getCurrentList(listName) {
        switch (listName) {
            case AVAILABLE_LISTS.vehicles:
                currentList = VEHICLES.slice(0);
                photoFilePath = "./resources/images/vehicles/"
                break;
            case AVAILABLE_LISTS.animals:
                currentList = ANIMALS.slice(0);
                photoFilePath = "./resources/images/animals/"
                break;

            default:
                currentList = VEHICLES.slice(0);
                photoFilePath = "./resources/images/vehicles/"
                break;
        }
    }

    // Initial item list
    getCurrentList(AVAILABLE_LISTS.vehicles);
    sortListAlphabetically();

    function sortListAlphabetically() {
        currentList.sort(function (a, b) { return a.name.localeCompare(b.name) });
    }

    function sortListByCategory() {
        currentList.sort(function (a, b) { return a.category.localeCompare(b.category) });
    }

    function sortListRandomly() {
        ArrayHelperIIFE.shuffleArray(currentList);
    }

    return {
        setCurrentList: function (listName) { getCurrentList(listName) },
        sortListAlphabetically: function () { sortListAlphabetically() },
        sortListByCategory: function () { sortListByCategory() },
        sortListRandomly: function () { sortListRandomly() },

        getCurrentList: function () { return currentList },
        getPhotoFilePath: function () { return photoFilePath },
        sortType: LIST_SORT_TYPE,
        availableListNames: AVAILABLE_LISTS,
    }

})();
