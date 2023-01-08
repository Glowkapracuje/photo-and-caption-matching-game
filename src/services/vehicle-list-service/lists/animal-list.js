const AnimalListIIFE = (function () {

    const ANIMAL_CATEGORY = {
        sea: "SEA",
        bird: "BIRD",
        land: "LAND"
    }

    const ANIMALS_COLLECTION = {
        shark: {
            id: 'shark',
            name: 'shark',
            imageFileName: 'shark.jpg',
            caption: {
                en: 'Shark',
                pl: 'Rekin'
            },
            category: ANIMAL_CATEGORY.sea
        },
        owl: {
            id: 'owl',
            name: 'owl',
            imageFileName: 'owl.jpg',
            caption: {
                en: 'Owl',
                pl: 'Sowa'
            },
            category: ANIMAL_CATEGORY.bird
        },
        medusa: {
            id: 'medusa',
            name: 'medusa',
            imageFileName: 'medusa.jpg',
            caption: {
                en: 'Medusa',
                pl: 'Meduza'
            },
            category: ANIMAL_CATEGORY.sea
        },
        fox: {
            id: 'fox',
            name: 'fox',
            imageFileName: 'fox.jpg',
            caption: {
                en: 'Fox',
                pl: 'Lis'
            },
            category: ANIMAL_CATEGORY.land
        },
        racoon: {
            id: 'racoon',
            name: 'racoon',
            imageFileName: 'racoon.jpg',
            caption: {
                en: 'Racoon',
                pl: 'Szop pracz'
            },
            category: ANIMAL_CATEGORY.land
        },
    }

    return {
        animalsCollection: ANIMALS_COLLECTION,
    }

})();
