const TagWidgetIIFE = (function () {

    function generateTagWidget(tagsArray, onClickFunctions) {
        let tagWidgetContainer = document.createElement('div');
        tagWidgetContainer.setAttribute('class', 'tag-widget-container');

        tagsArray.forEach(tag => {
            let tagName = document.createElement('span');
            let tagNumber = document.createElement('span');
            let pillTagWrapper = document.createElement('div');

            tagName.setAttribute('class', 'pill-tag-name')
            tagNumber.setAttribute('class', 'pill-tag-number')
            pillTagWrapper.setAttribute('class', 'pill-tag-wrapper')

            tagName.innerText = tag.name;
            tagNumber.innerText = tagsArray.indexOf(tag) + 1;

            pillTagWrapper.addEventListener('click', function () {
                GameStateServiceIIFE.updateGameStateCurrentVehicleId(tag.id);
                GameStateServiceIIFE.updateGameStateWithSettingIsMatchToFalse();
                GameStateServiceIIFE.updateGameStateWithShowResultToggle();
            })
            onClickFunctions.forEach(onClickFunction => {
                pillTagWrapper.addEventListener('click', onClickFunction)
            })

            pillTagWrapper.append(tagNumber, tagName);
            tagWidgetContainer.appendChild(pillTagWrapper);
        })

        return tagWidgetContainer;
    }

    return {
        /**
         * @param {Array <string>} tagsArray 
         * @param {Array <function>} onClickFunctions 
         * @returns An HTML element that contains all provided tags
         */
        generateTagWidget: function (tagsArray, onClickFunctions) {
            return generateTagWidget(tagsArray, onClickFunctions);
        },
    }
})();
