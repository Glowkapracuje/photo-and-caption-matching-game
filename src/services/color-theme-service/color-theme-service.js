const ColorThemeServiceIIFE = (function () {

    const COLOR_THEME_NAMES = Object.freeze({
        light: 'LIGHT',
        mixed: 'MIXED',
        dark: 'DARK'
    });

    const lightThemeVariables = {
        '--color-primary': '#aed6dc',
        '--color-primary--light': '#e0ffff',
        '--color-primary--dark': '#7ea5aa',
        '--color-secondary': '#ff9a8d',
        '--color-secondary--light': '#ffccbd',
        '--color-secondary--dark': '#c96a60',
        '--color-tertiary': '#64dd17',
        '--color-tertiary--light': '#9cff57',
        '--color-tertiary--dark': '#1faa00',
        '--color-quaternary': '#ff6d00',
        '--color-quaternary--light': '#ff9e40',
        '--color-quaternary--dark': '#c43c00',
        '--font-color': '#212b40',

        '--color-page-background': '#e0ffff',
        '--color-sidebar-background': '#ffccbd',
    }

    const darkThemeVariables = {
        '--color-primary': '#aed6dc',
        '--color-primary--light': '#7ea5aa',
        '--color-primary--dark': '#e0ffff',
        '--color-secondary': '#ff9a8d',
        '--color-secondary--light': '#c96a60',
        '--color-secondary--dark': '#ffccbd',
        '--color-tertiary': '#64dd17',
        '--color-tertiary--light': '#1faa00',
        '--color-tertiary--dark': '#9cff57',
        '--color-quaternary': '#ff6d00',
        '--color-quaternary--light': '#c43c00',
        '--color-quaternary--dark': '#ff9e40',
        '--font-color': '#212b40',

        '--color-page-background': '#0F3460',
        '--color-sidebar-background': '#0F3460',
    }

    const mixedThemeVariables = {
        '--color-primary': '#a711fe',
        '--color-primary--light': '#ad48ed',
        '--color-primary--dark': '#6f00ca',
        '--color-secondary': '#ff9a8d',
        '--color-secondary--light': '#c96a60',
        '--color-secondary--dark': '#ffccbd',
        '--color-tertiary': '#64dd17',
        '--color-tertiary--light': '#1faa00',
        '--color-tertiary--dark': '#9cff57',
        '--color-quaternary': '#ff6d00',
        '--color-quaternary--light': '#c43c00',
        '--color-quaternary--dark': '#ff9e40',
        '--font-color': '#212b40',

        '--color-page-background': '#2e0c5c',
        '--color-sidebar-background': '#2e0c5c',
    }

    const ROOT = document.querySelector(':root');


    function setColorVariablesForRoot(themeName) {
        let themeVariables = choseColorVariablesByThemeName(themeName)

        for (const colorKey of Object.keys(themeVariables)) {
            ROOT.style.setProperty(colorKey, themeVariables[colorKey]);
        }
    }

    function changeTheme(themeName) {
        setColorVariablesForRoot(themeName);
    }

    function choseColorVariablesByThemeName(themeName) {
        switch (themeName) {
            case COLOR_THEME_NAMES.light:
                return lightThemeVariables;
                break;
            case COLOR_THEME_NAMES.mixed:
                return mixedThemeVariables;
                break;
            case COLOR_THEME_NAMES.dark:
                return darkThemeVariables;
                break;
            default:
                return lightThemeVariables;
                break;
        }
    }

    return {
        colorThemeNames: COLOR_THEME_NAMES,
        changeTheme: changeTheme,
    }

})();
