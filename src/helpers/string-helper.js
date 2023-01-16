/**
 * StringHelper is an IIFE module that consists of methods that help in operating on strings.
 * Both, project-specific and other simple and generic cases are handled.  
 */
const StringHelperIIFE = (function () {

    /**
     * Checks whether a given string is null or empty
     * @param {string} string 
     * @returns {boolean} true if provided string is null or empty
     * @throws {TypeError} when parameter's type is not a string
     */
    function isNill(stringToCheck) {
        if (typeof stringToCheck !== 'string') {
            throw new TypeError('Wrong type given, expected string');
        }

        return (stringToCheck === null || stringToCheck.trim().length === 0);
    }

    /**
     * Replaces format items with given values.
     * For example format('message {0}', 'formatted') evaluates to 'message formatted'
     * @param {string} messageTemplate string containing format items like '{0}', '{1}', etc.
     * @param  {...any} values values that will be replaced with format items
     * @returns {string} formatted string
     */
    function format(messageTemplate, ...values) {
        let formattedMessage = messageTemplate;
        for (let i = 0; i < values.length; i++) {
            let regexp = new RegExp('\\{' + i + '\\}', 'gi');
            formattedMessage = formattedMessage.replace(regexp, values[i]);
        }
        return formattedMessage;
    };

    /**
     * Converts miliseconds to time format with unit, depending on the given duration.
     * For example:
     * duration = 12345, result: '12.345 sec.';
     * duration = 1234567, result: '20:34 min.';
     * duration = 123456789, result: '10:17 hrs'.
     * @param {number | string} duration in miliseconds
     * @returns {string} formatted duration with unit
     */
    function formatTimeWithDynamicUnit(duration) {
        let time = parseMilisecondsToOtherTimeUnits(duration);

        if (time.hours > 0) return `${time.hours}:${padWithTemplate('00', time.minutes, true)} hrs`;
        if (time.minutes > 0) return `${time.minutes}:${padWithTemplate('00', time.seconds, true)} min.`
        if (time.seconds > 0) return `${time.seconds}.${padWithTemplate('000', time.miliseconds, true)} sec.`
        if (time.miliseconds > 0) return `${time.seconds}.${padWithTemplate('000', time.miliseconds, true)} sec.`
        return `0 sec.`;
    }

    /**
     * Converts miliseconds to time in format HH:MM:SS
     * For example: duration = 12345678, result: '03:25:45'.
     * @param {number | string} duration in miliseconds
     * @returns {string} formatted duration in stopwatch style
     */
    function formatSecondsToTimeHHMMSS(duration) {
        let time = parseMilisecondsToOtherTimeUnits(duration);
        let paddedHours = padWithTemplate('00', time.hours, true);
        let paddedMinutes = padWithTemplate('00', time.minutes, true);
        let paddedSeconds = padWithTemplate('00', time.seconds, true);

        return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`
    }

    /**
     * Pads the current string with another string until the resulting string reaches the padTemplate length. 
     * The padding is applied from the start of the current string or from the end of it, depending on isPadLeft value.
     * @param {string} padTemplate string that will be used to fill the given padTarget 
     * @param {string | number} padTarget target that will be completed using the given pad template
     * @param {boolean} isPadLeft if true pad will fill from the left, if false - from right
     * @returns {string} padded string
     */
    function padWithTemplate(padTemplate, padTarget, isPadLeft) {
        AssertThat.isNotNullOrUndefined(padTemplate);
        AssertThat.isNotNullOrUndefined(padTarget);
        let stringPadTemplate = typeof padTemplate === 'number' ? padTemplate.toString() : padTemplate;
        let stringPadTarget = typeof padTarget === 'number' ? padTarget.toString() : padTarget;

        if (stringPadTarget.length === 0) {
            return stringPadTemplate;
        } 
        
        let padFromLeft = stringPadTemplate.slice(0, -stringPadTarget.length)
        let padFromRight = stringPadTemplate.slice(stringPadTarget.length)

        return isPadLeft ? padFromLeft + stringPadTarget : stringPadTarget + padFromRight;
    }

    // Returns object that contains parsed units based on the given duration in miliseconds
    function parseMilisecondsToOtherTimeUnits(duration) {
        let miliseconds = parseInt(duration % 1000);
        let seconds = parseInt((duration / 1000) % 60);
        let minutes = parseInt((duration / (1000 * 60)) % 60);
        let hours = parseInt((duration / (1000 * 60 * 60)) % 24);
        return {
            miliseconds: miliseconds,
            seconds: seconds,
            minutes: minutes,
            hours: hours
        }
    }

    return {
        isNill: isNill,
        format: format,
        formatTimeWithDynamicUnit: formatTimeWithDynamicUnit,
        formatSecondsToTimeHHMMSS: formatSecondsToTimeHHMMSS,
        padWithTemplate: padWithTemplate,
    }

})();
