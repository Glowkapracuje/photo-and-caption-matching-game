const SpeechSynthesisServiceIIFE = (function () {
    
    const DEFAULT_VOICE_LANG = "en-US"
    const DEFAULT_VOICE_RATE = 0.65;
    const DEFAULT_VOICE_PITCH = 1;
    const DEFAULT_VOICE_VOLUME = 1;
    const DEFAULT_VOICE_NAME = 'Google US English';
    const AVAILABLE_VOICES_NAMES = Object.freeze({
        en: { lang: 'en-US', name: 'Google US English' },
        pl: { lang: 'pl-PL', name: 'Google polski' }
    });

    const SPEECH_SYNTHESIS = window.speechSynthesis;
    const SPEECH_UTTERANCE = new SpeechSynthesisUtterance();
    let voices = [];

    // if voices available (mozilla, brave)
       // look for preferenced  
         // if no preferenced take default (optional and disable change possibility)
         // if no default take first
    // if no available (chrome) put event listener onvoiceschange with:
    // - looking for preferenced voice
        // - looking for default
        // - taking first 

    loadVoices();
    
    function loadVoices () {
        voices = SPEECH_SYNTHESIS.getVoices();

        if (!voices.length) {
            SPEECH_SYNTHESIS.addEventListener('voiceschanged', selectVoice)
            SPEECH_SYNTHESIS.addEventListener('voiceschanged', setDefaultSpeechUterranceSettings)
        } else {
            selectVoice()
            setDefaultSpeechUterranceSettings();
        }
    }    

    function selectVoice() {
        let preferredVoices = [];
        let defaultVoice = [];
        let firstAvailableVoice = [];

        let applicationPreferredVoicesNames = Object.values(AVAILABLE_VOICES_NAMES).map(value => value.name);
        let browserVoices = SPEECH_SYNTHESIS.getVoices();

        // Looks for preferred application voices 
        preferredVoices = browserVoices.filter(browserVoice => applicationPreferredVoicesNames.includes(browserVoice.name));

        if (preferredVoices.length) {
            return voices = preferredVoices;
        }

        // Takes the default voice
        defaultVoice = browserVoices.filter(browserVoice => browserVoice.default === true);

        if (defaultVoice.length) {
            return voices = defaultVoice;
        }

        // Takes the first if preferred and default are not available
        firstAvailableVoice.push(browserVoices[0]);

        if (firstAvailableVoice.length) {
            return voices = firstAvailableVoice;
        }

        // In case of no voices returns empty array
        if (!firstAvailableVoice.length) {
            return voices = [];
        }
    }

    function setDefaultSpeechUterranceSettings() {
        SPEECH_UTTERANCE.lang = DEFAULT_VOICE_LANG;
        SPEECH_UTTERANCE.pitch = DEFAULT_VOICE_PITCH;
        SPEECH_UTTERANCE.rate = DEFAULT_VOICE_RATE;
        SPEECH_UTTERANCE.volume = DEFAULT_VOICE_VOLUME;
        SPEECH_UTTERANCE.voice = getDefaultVoiceOnStart();
    }

    // Returns default application preferred voice or the first available 
    function getDefaultVoiceOnStart() {
        let preferrencedDefaultVoice = getVoice(DEFAULT_VOICE_NAME);
        if (!preferrencedDefaultVoice) {
            preferrencedDefaultVoice = voices[0]
        }
        return preferrencedDefaultVoice;
    }

    // Gets the voice from list by voice name
    function getVoice(voiceName) {
        return voices.filter(voice => voice.name === voiceName)[0];
    };

    // The simplest invoking method on speech synthesis
    function speak() {
        SPEECH_SYNTHESIS.speak(SPEECH_UTTERANCE);
    }

    // Switches language to polish or the only available
    function switchVoiceToPolish() {
        let polishVoice = getVoice(AVAILABLE_VOICES_NAMES.pl.name);
        if (!polishVoice) {
            polishVoice = voices[0];
        }
        SPEECH_UTTERANCE.voice = polishVoice;
        SPEECH_UTTERANCE.rate = 0.85;
        SPEECH_UTTERANCE.volume = 1.35;
    }

    // Switches language to english or the only available
    function switchVoiceToEnglish() {
        let englishVoice = getVoice(AVAILABLE_VOICES_NAMES.en.name);
        if (!englishVoice) {
            englishVoice = voices[0];
        }
        SPEECH_UTTERANCE.voice = englishVoice;
        SPEECH_UTTERANCE.rate = 0.65;
        SPEECH_UTTERANCE.volume = 1;
    }

    return {
        voices: AVAILABLE_VOICES_NAMES,
        /**
         * Runs Speech Synthesis and read the given text
         * @param {string} text 
         */
        speakNow: function (text) {
            SPEECH_UTTERANCE.text = text;
             if (SPEECH_SYNTHESIS.speaking) {
                SPEECH_SYNTHESIS.cancel();
            }
            speak();
        },

        switchVoiceToPolish: function() { return switchVoiceToPolish(); },

        switchVoiceToEnglish: function() { return switchVoiceToEnglish(); }
    };

})();
