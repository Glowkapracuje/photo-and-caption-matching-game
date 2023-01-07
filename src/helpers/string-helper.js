const StringHelperIIFE = (function () {

    function format(value) {
        let formattedString = value;
        for (let argument in arguments) {
            formattedString = formattedString.replace("{" + argument + "}", arguments[argument]);
        }
        return formattedString;
    };

    function stringToHHMMSS(value) {
        let secondsNumber = parseInt(value, 10);
        let hours = Math.floor(secondsNumber / 3600);
        let minutes = Math.floor((secondsNumber - (hours * 3600)) / 60);
        let seconds = secondsNumber - (hours * 3600) - (minutes * 60);

        if (hours < 10) { hours = `0${hours}`; }
        if (minutes < 10) { minutes = `0${minutes}`; }
        if (seconds < 10) { seconds = `0${seconds}`; }
        return `${hours}:${minutes}:${seconds}`
    }

    /**
     * Returns true if provided string is null or empty
     * @param {string} string 
     * @returns {boolean} boolean
     */
    function isNill(stringToCheck) {
        if (typeof stringToCheck !== 'string') {
            console.log('error')
        }
        return (stringToCheck === null || stringToCheck.trim().length === 0);
    }

    return {
        isNill: function (stringToCheck) {
            return isNill(stringToCheck);
        },
        format: function (value) {
            return format(value);
        },
        stringToHHMMSS: function (value) {
            return stringToHHMMSS(value);
        },
    }

})();
