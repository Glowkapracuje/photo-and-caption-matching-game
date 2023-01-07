const LanguageServiceIIFE = (function () {
    
    const LANGUAGES = Object.freeze({
        en: 'en',
        pl: 'pl'
    })

    return {
        getLanguages: function () { return LANGUAGES; },
    }

})();
