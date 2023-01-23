const VehicleListServiceIIFE = (function () {
    const VEHICLE_CATEGORY = {
        airplane: 'AIRPLANE',
        bike: 'BIKE',
        bus: 'BUS',
        car: 'CAR',
        contruction: 'CONSTRUCTION',
        harvest: 'HARVEST',
        military: 'MILITARY',
        motorcycle: 'MOTORCYCLE',
        ship: 'SHIP',
        train: 'TRAIN',
        truck: 'TRUCK',
        oldFashioned: 'OLD_FASHIONED',
        recreationalDevice: 'RECREATIONAL_DEVICE'
    }

    const VEHICLES_COLLECTION = {
        fireTruck: {
            id: 'fire-truck',
            name: 'fire truck',
            imageFileName: 'fire-truck.jpg',
            caption: {
                en: 'Fire truck',
                pl: 'Wóz strażacki'
            },
            category: VEHICLE_CATEGORY.truck
        },
        policeCar: {
            id: 'police-car',
            name: 'police car',
            imageFileName: 'police-car.jpg',
            caption: {
                en: 'Police car',
                pl: 'Wóz policyjny'
            },
            category: VEHICLE_CATEGORY.car
        },
        dumpTruck: {
            id: 'dump-truck',
            name: 'dump truck',
            imageFileName: 'dump-truck.jpg',
            caption: {
                en: 'Dump truck',
                pl: 'Wywrotka'
            },
            category: VEHICLE_CATEGORY.truck
        },
        militaryCar: {
            id: 'military-car',
            name: 'military car',
            imageFileName: 'military-car.jpg',
            caption: {
                en: 'Military car',
                pl: 'Auto wojskowe'
            },
            category: VEHICLE_CATEGORY.military
        },
        schoolBus: {
            id: 'school-bus',
            name: 'school bus',
            imageFileName: 'school-bus.jpg',
            caption: {
                en: 'School bus',
                pl: 'Szkolny autobus'
            },
            category: VEHICLE_CATEGORY.bus
        },
        garbageTruck: {
            id: 'garbage-truck',
            name: 'garbage truck',
            imageFileName: 'garbage-truck.jpg',
            caption: {
                en: 'Garbage truck',
                pl: 'Śmieciarka'
            },
            category: VEHICLE_CATEGORY.truck
        },
        offroadCar: {
            id: 'offroad-car',
            name: 'offroad car',
            imageFileName: 'offroad-car.jpg',
            caption: {
                en: 'Offroad car',
                pl: 'Auto terenowe'
            },
            category: VEHICLE_CATEGORY.car
        },
        ambulance: {
            id: 'ambulance',
            name: 'ambulance',
            imageFileName: 'ambulance.jpg',
            caption: {
                en: 'Ambulance',
                pl: 'Ambulans'
            },
            category: VEHICLE_CATEGORY.bus
        },
        taxiCab: {
            id: 'taxi-cab',
            name: 'taxi cab',
            imageFileName: 'taxi-cab.jpg',
            caption: {
                en: 'Taxi cab',
                pl: 'Taksówka'
            },
            category: VEHICLE_CATEGORY.car
        },
        excavator: {
            id: 'excavator',
            name: 'excavator',
            imageFileName: 'excavator.jpg',
            caption: {
                en: 'Excavator',
                pl: 'Ładowarka'
            },
            category: VEHICLE_CATEGORY.truck
        },
        pickup: {
            id: 'pickup',
            name: 'pickup',
            imageFileName: 'pickup.jpg',
            caption: {
                en: 'Pickup',
                pl: 'Pikap'
            },
            category: VEHICLE_CATEGORY.car
        },
        towTruck: {
            id: 'tow-truck',
            name: 'tow truck',
            imageFileName: 'tow-truck.jpg',
            caption: {
                en: 'Tow truck',
                pl: 'Holownik'
            },
            category: VEHICLE_CATEGORY.truck
        },
        digger: {
            id: 'digger',
            name: 'digger',
            imageFileName: 'digger.jpg',
            caption: {
                en: 'Digger',
                pl: 'Koparka'
            },
            category: VEHICLE_CATEGORY.contruction
        },
        tank: {
            id: 'tank',
            name: 'tank',
            imageFileName: 'tank.jpg',
            caption: {
                en: 'Tank',
                pl: 'Czołg'
            },
            category: VEHICLE_CATEGORY.military
        },
        tractor: {
            id: 'tractor',
            name: 'tractor',
            imageFileName: 'tractor.jpg',
            caption: {
                en: 'Tractor',
                pl: 'Traktor'
            },
            category: VEHICLE_CATEGORY.harvest
        },
        deliveryBus: {
            id: 'delivery-bus',
            name: 'delivery bus',
            imageFileName: 'delivery-bus.jpg',
            caption: {
                en: 'Delivery bus',
                pl: 'Bus kuriera'
            },
            category: VEHICLE_CATEGORY.bus
        },
        airplane: {
            id: 'airplane',
            name: 'airplane',
            imageFileName: 'airplane.jpg',
            caption: {
                en: 'Airplane',
                pl: 'Samolot'
            },
            category: VEHICLE_CATEGORY.airplane
        },
        bike: {
            id: 'bike',
            name: 'bike',
            imageFileName: 'bike.jpg',
            caption: {
                en: 'Bike',
                pl: 'Rower'
            },
            category: VEHICLE_CATEGORY.bike
        },
        motorcycle: {
            id: 'motorcycle',
            name: 'motorcycle',
            imageFileName: 'motorcycle.jpg',
            caption: {
                en: 'Motorcycle',
                pl: 'Motocykl'
            },
            category: VEHICLE_CATEGORY.motorcycle
        },
        baloon: {
            id: 'baloon',
            name: 'baloon',
            imageFileName: 'baloon.jpg',
            caption: {
                en: 'Baloon',
                pl: 'Balon'
            },
            category: VEHICLE_CATEGORY.airplane
        },
        metro: {
            id: 'metro',
            name: 'metro',
            imageFileName: 'metro.jpg',
            caption: {
                en: 'Metro',
                pl: 'Metro'
            },
            category: VEHICLE_CATEGORY.train
        },
        train: {
            id: 'train',
            name: 'train',
            imageFileName: 'train.jpg',
            caption: {
                en: 'Train',
                pl: 'Pociąg'
            },
            category: VEHICLE_CATEGORY.train
        },
        tram: {
            id: 'tram',
            name: 'tram',
            imageFileName: 'tram.jpg',
            caption: {
                en: 'Tram',
                pl: 'Tramwaj'
            },
            category: VEHICLE_CATEGORY.train
        },
        camper: {
            id: 'camper',
            name: 'camper',
            imageFileName: 'camper.jpg',
            caption: {
                en: 'Camper',
                pl: 'Kamper'
            },
            category: VEHICLE_CATEGORY.bus
        },
        scooter: {
            id: 'scooter',
            name: 'scooter',
            imageFileName: 'scooter.jpg',
            caption: {
                en: 'Scooter',
                pl: 'Skuter'
            },
            category: VEHICLE_CATEGORY.motorcycle
        },
        yacht: {
            id: 'yacht',
            name: 'yacht',
            imageFileName: 'yacht.jpg',
            caption: {
                en: 'Yacht',
                pl: 'Jacht'
            },
            category: VEHICLE_CATEGORY.ship
        },
        boat: {
            id: 'boat',
            name: 'boat',
            imageFileName: 'boat.jpg',
            caption: {
                en: 'Boat',
                pl: 'Łódka'
            },
            category: VEHICLE_CATEGORY.ship
        },
        cargoShip: {
            id: 'cargo-ship',
            name: 'cargo ship',
            imageFileName: 'cargo-ship.jpg',
            caption: {
                en: 'Cargo ship',
                pl: 'Kontenerowiec'
            },
            category: VEHICLE_CATEGORY.ship
        },
        cruiseShip: {
            id: 'cruise-ship',
            name: 'cruise ship',
            imageFileName: 'cruise-ship.jpg',
            caption: {
                en: 'Cruise ship',
                pl: 'Wycieczkowiec'
            },
            category: VEHICLE_CATEGORY.ship
        },
        muscleCar: {
            id: 'muscle-car',
            name: 'muscle car',
            imageFileName: 'muscle-car.jpg',
            caption: {
                en: 'Muscle car',
                pl: 'Auto amerykańskie'
            },
            category: VEHICLE_CATEGORY.car
        },
        tankerTruck: {
            id: 'tanker-truck',
            name: 'tanker truck',
            imageFileName: 'tanker-truck.jpg',
            caption: {
                en: 'Tanker truck',
                pl: 'Cysterna'
            },
            category: VEHICLE_CATEGORY.truck
        },
        formulaOneCar: {
            id: 'formula-one-car',
            name: 'formula one car',
            imageFileName: 'formula-one-car.jpg',
            caption: {
                en: 'Formula one car',
                pl: 'Auto formuła jeden'
            },
            category: VEHICLE_CATEGORY.car
        },
        monsterTruck: {
            id: 'monster-truck',
            name: 'monster truck',
            imageFileName: 'monster-truck.jpg',
            caption: {
                en: 'Monster truck',
                pl: 'Monster truck'
            },
            category: VEHICLE_CATEGORY.truck
        },
        combine: {
            id: 'combine',
            name: 'combine',
            imageFileName: 'combine.jpg',
            caption: {
                en: 'Combine',
                pl: 'Kombajn'
            },
            category: VEHICLE_CATEGORY.harvest
        },
        helicopter: {
            id: 'helicopter',
            name: 'helicopter',
            imageFileName: 'helicopter.jpg',
            caption: {
                en: 'Helicopter',
                pl: 'Helikopter'
            },
            category: VEHICLE_CATEGORY.airplane
        },
        sportsCar: {
            id: 'sports-car',
            name: 'sports car',
            imageFileName: 'sports-car.jpg',
            caption: {
                en: 'Sports car',
                pl: 'Auto sportowe'
            },
            category: VEHICLE_CATEGORY.car
        },
        'racing-car': {
            id: 'racing-car',
            name: 'racing car',
            imageFileName: 'racing-car.jpg',
            caption: {
                en: 'Racing car',
                pl: 'Auto wyścigowe'
            },
            category: VEHICLE_CATEGORY.car
        },
        quad: {
            id: 'quad',
            name: 'quad',
            imageFileName: 'quad.jpg',
            caption: {
                en: 'Quad',
                pl: 'Quad'
            },
            category: VEHICLE_CATEGORY.bike
        },
        bulldozer: {
            id: 'bulldozer',
            name: 'bulldozer',
            imageFileName: 'bulldozer.jpg',
            caption: {
                en: 'Bulldozer',
                pl: 'Buldożer'
            },
            category: VEHICLE_CATEGORY.contruction
        },
        crane: {
            id: 'crane',
            name: 'crane',
            imageFileName: 'crane.jpg',
            caption: {
                en: 'Crane',
                pl: 'Żuraw'
            },
            category: VEHICLE_CATEGORY.contruction
        },
        carriage: {
            id: 'carriage',
            name: 'carriage',
            imageFileName: 'carriage.jpg',
            caption: {
                en: 'Carriage',
                pl: 'Dorożka'
            },
            category: VEHICLE_CATEGORY.oldFashioned
        },
        goKart: {
            id: 'go-kart',
            name: 'go-kart',
            imageFileName: 'go-kart.jpg',
            caption: {
                en: 'Go-kart',
                pl: 'Gokart'
            },
            category: VEHICLE_CATEGORY.bike
        },
        snowplow: {
            id: 'snowplow',
            name: 'snowplow',
            imageFileName: 'snowplow.jpg',
            caption: {
                en: 'Snowplow',
                pl: 'Pług śnieżny'
            },
            category: VEHICLE_CATEGORY.truck
        },
        skateboard: {
            id: 'skateboard',
            name: 'skateboard',
            imageFileName: 'skateboard.jpg',
            caption: {
                en: 'Skateboard',
                pl: 'Deskorolka'
            },
            category: VEHICLE_CATEGORY.recreationalDevice
        },
        snowboard: {
            id: 'snowboard',
            name: 'snowboard',
            imageFileName: 'snowboard.jpg',
            caption: {
                en: 'Snowboard',
                pl: 'Snowboard'
            },
            category: VEHICLE_CATEGORY.recreationalDevice
        },
        rollercoaster: {
            id: 'rollercoaster',
            name: 'rollercoaster',
            imageFileName: 'rollercoaster.jpg',
            caption: {
                en: 'Rollercoaster',
                pl: 'Rollercoaster'
            },
            category: VEHICLE_CATEGORY.train
        },
        driftCar: {
            id: 'drift-car',
            name: 'drift car',
            imageFileName: 'drift-car.jpg',
            caption: {
                en: 'Drift car',
                pl: 'Auto do driftu'
            },
            category: VEHICLE_CATEGORY.car
        },
        drone: {
            id: 'drone',
            name: 'drone',
            imageFileName: 'drone.jpg',
            caption: {
                en: 'Drone',
                pl: 'Dron'
            },
            category: VEHICLE_CATEGORY.airplane
        },
        sailBoat: {
            id: 'sail-boat',
            name: 'sail boat',
            imageFileName: 'sail-boat.jpg',
            caption: {
                en: 'Sail boat',
                pl: 'Żaglówka'
            },
            category: VEHICLE_CATEGORY.ship
        },
        submarine: {
            id: 'submarine',
            name: 'submarine',
            imageFileName: 'submarine.jpg',
            caption: {
                en: 'Submarine',
                pl: 'Łódź podwodna'
            },
            category: VEHICLE_CATEGORY.ship
        },
        cabriolet: {
            id: 'cabriolet',
            name: 'cabriolet',
            imageFileName: 'cabriolet.jpg',
            caption: {
                en: 'Cabriolet',
                pl: 'Kabriolet'
            },
            category: VEHICLE_CATEGORY.car
        },

    }

    const VEHICLE_LIST_SORT_TYPE = Object.freeze({
        alphabetical: 'ALPHABETICAL',
        category: 'CATEGORY',
        random: 'RANDOM'
    });

    const VEHICLES = Object.values(VEHICLES_COLLECTION);
    sortListAlphabetically();

    function sortListAlphabetically() {
        VEHICLES.sort(function (a, b) { return a.name.localeCompare(b.name) });
    }

    function sortListByCategory() {
        VEHICLES.sort(function (a, b) { return a.category.localeCompare(b.category) });
    }

    function sortListRandomly() {
        ArrayHelperIIFE.shuffleArray(VEHICLES);
    }

    return {
        sortListAlphabetically: sortListAlphabetically,
        sortListByCategory: sortListByCategory,
        sortListRandomly: sortListRandomly,

        vehicles: VEHICLES,
        sortType: VEHICLE_LIST_SORT_TYPE,
    }

})();
