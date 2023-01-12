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
        rhino: {
            id: 'rhino',
            name: 'rhino',
            imageFileName: 'rhino.jpg',
            caption: {
                en: 'Rhino',
                pl: 'Nosorożec'
            },
            category: ANIMAL_CATEGORY.land
        },
        elephant: {
            id: 'elephant',
            name: 'elephant',
            imageFileName: 'elephant.jpg',
            caption: {
                en: 'Elephant',
                pl: 'Słoń'
            },
            category: ANIMAL_CATEGORY.land
        },
        lion: {
            id: 'lion',
            name: 'lion',
            imageFileName: 'lion.jpg',
            caption: {
                en: 'Lion',
                pl: 'Lew'
            },
            category: ANIMAL_CATEGORY.land
        },
        giraffe: {
            id: 'giraffe',
            name: 'giraffe',
            imageFileName: 'giraffe.jpg',
            caption: {
                en: 'Giraffe',
                pl: 'Żyrafa'
            },
            category: ANIMAL_CATEGORY.land
        },
        tortoise: {
            id: 'tortoise',
            name: 'tortoise',
            imageFileName: 'tortoise.jpg',
            caption: {
                en: 'Tortoise',
                pl: 'Żółw'
            },
            category: ANIMAL_CATEGORY.land
        },
        grizzlyBear: {
            id: 'grizzly-bear',
            name: 'grizzly bear',
            imageFileName: 'grizzly-bear.jpg',
            caption: {
                en: 'Grizzly bear',
                pl: 'Miś grizzly'
            },
            category: ANIMAL_CATEGORY.land
        },
    }

    return {
        animalsCollection: ANIMALS_COLLECTION,
    }

})();
