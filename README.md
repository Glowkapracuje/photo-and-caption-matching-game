<a name="readme-top"></a>
# **Photo and caption** matching game

![GitHub package.json version](https://img.shields.io/github/package-json/v/Glowkapracuje/photo-and-caption-matching-game)
![GitHub repo size](https://img.shields.io/github/repo-size/Glowkapracuje/photo-and-caption-matching-game?color=lightgrey)


The game begins by showing a **photo** and some possible **captions** for it.</br>
The correct caption is read by the **Speech Synthesizer**.</br>
The challenge is to **match the caption to the photo**.


<!-- LIVE DEMO -->
## Live demo
Currently best to run on Chrome:</br>
***https://glowkapracuje.github.io/photo-and-caption-matching-game/***

[<img src="./src/resources/images/demo-screens/01-main-demo-image.jpg" width="100%"/>](./src/resources/images/demo-screens/01-main-demo-image.jpg)

## Unit tests are run in the browser
The execution and presentation of the detailed results (including error stack trace) take place on this page:<br>
***https://glowkapracuje.github.io/photo-and-caption-matching-game/tests/test-runner.html***

[<img src="./src/resources/images/demo-screens/02-running-unit-tests-and-displaying-in-browser.jpg" width="49%"/>](./src/resources/images/demo-screens/02-running-unit-tests-and-displaying-in-browser.jpg)
[<img src="./src/resources/images/demo-screens/03-running-unit-tests-and-displaying-in-browser.jpg" width="49%"/>](./src/resources/images/demo-screens/03-running-unit-tests-and-displaying-in-browser.jpg)
<!-- ROADMAP -->
## Roadmap
- [x] **Allow to change settings**
    - [x] Add input for disabling all sounds
    - [x] Add input for disabling the Speech Synthesis when new item appears  
    - [x] Add input for changing captions number
    - [x] Add input for changing list sorting type
        - [x] Alphabetical
        - [x] Category
        - [x] Random    
    - [x] Add input for changing color theme
        - [x] Light
        - [x] Mixed as temporary solution
        - [ ] Dark 
    - [x] Add input for chosing specific item
    - [x] Place settings on different slides using slider
- [x] **Allow to change the captions language**
    - [x] Add input for changing the language
    - [x] Display translated captions
    - [x] Provide multiple Speech synthesis voices
- [x] **Add progress bar**
- [ ] **Allow to choose between different item lists**
    - [ ] Provide a widget for creating drop down list 
    - [ ] Provide different item lists
        - [x] Vehicles
        - [ ] Animals
    - [ ] Allow Tag widget to be updated on list change 
- [ ] **Improve functionality**
    - [x] Avoid generating random items from the entire list
    - [ ] Create game flow service with improved statuses
- [ ] **Provide different input types**
    - [x] Captions as buttons
    - [ ] Text input field
- [ ] **Reusable widgets**
    - [x] Accordion  
    - [x] Caption
    - [X] Checkbox
    - [ ] List
    - [x] Number spinner
    - [x] Photo
    - [x] Progress bar 
        - [x] Display number of correct answers
        - [x] Measure and display average of matching
    - [x] Radio
    - [x] Slider
    - [x] Tags 
    - [x] Tooltip
- [ ] **Helpers**
    - [x] ArrayHelper
    - [x] AssertThat 
    - [x] PerformanceHelper
    - [x] StringHelper
- [ ] **Provide support for browsers other than chrome**
- [ ] **Documentation** 
    - [x] Helpers 
        - [x] Array Helper IIFE module
        - [x] Assert That Helper IIFE module
        - [x] Performance Time IIFE helper module
        - [x] String Helper IIFE module  
    - [ ] Services 
- [x] **Tests** 
    - [x] Introduce an approach for unit tests without external libraries 
        - [x] Test runner using browser 
        - [x] Test result visible on page
            - [x] Mobile view 
            - [x] Display error stack trace (for failed and expected error results) 
        - [x] Separate tests and application code 


<!-- TECHNICAL STUFF -->
## Technical stuff

**This project does not use any framework or any external library.**</br>
Everything has been written from scratch using Vanilla JS ( ͡° ͜ʖ ͡°) HTML and CSS.</br>


<!-- LICENSE -->
## License

Distributed under the GPL-3.0 License. See `LICENSE` for more information.

<p align="center">(<a href="#readme-top">back to top</a>)</p>