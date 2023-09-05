const mode = document.querySelector("#dark-mode");
const body = document.querySelector("body");

// Creates the variable if it doesn't exist
if(localStorage.getItem('isDarkMode') != 'true' && localStorage.getItem('isDarkMode') != 'false'){
    localStorage.setItem('isDarkMode', 'false');
}
body.setAttribute('data-dark-mode', localStorage.getItem('isDarkMode'));

function toggleDarkMode(){
    if(localStorage.getItem('isDarkMode') == "false"){
        body.setAttribute('data-dark-mode', 'true');
        localStorage.setItem('isDarkMode', 'true');
    }
    else{
        body.setAttribute('data-dark-mode', 'false');
        localStorage.setItem('isDarkMode', 'false');
    }
}

mode.addEventListener("click", () => {
    toggleDarkMode();
});

//For keyboard navigation
mode.addEventListener('keydown', (event) => {
    if(event.key === 'Enter' || event.key === 'Return'){
        toggleDarkMode();
    }
});

// -------------------------------------------

const title = document.querySelector("#highlight-title");

// Creates the variable if it doesn't exist
if(localStorage.getItem('isHighlightTitle') != 'true' && localStorage.getItem('isHighlightTitle') != 'false'){
    localStorage.setItem('isHighlightTitle', 'false');
}
body.setAttribute('data-highlight-title', localStorage.getItem('isHighlightTitle'));

function toggleHighlightTitle(){
    if(localStorage.getItem('isHighlightTitle') == "false"){
        body.setAttribute('data-highlight-title', 'true');
        localStorage.setItem('isHighlightTitle', 'true');
    }
    else{
        body.setAttribute('data-highlight-title', 'false');
        localStorage.setItem('isHighlightTitle', 'false');
    }
}

title.addEventListener("click", () => {
    toggleHighlightTitle();
});

//For keyboard navigation
title.addEventListener('keydown', (event) => {
    if(event.key === 'Enter' || event.key === 'Return'){
        toggleHighlightTitle();
    }
});

// -------------------------------------------

const link = document.querySelector("#highlight-link");

// Creates the variable if it doesn't exist
if(localStorage.getItem('isHighlightLink') != 'true' && localStorage.getItem('isHighlightLink') != 'false'){
    localStorage.setItem('isHighlightLink', 'false');
}
body.setAttribute('data-highlight-link', localStorage.getItem('isHighlightLink'));

function toggleHighlightLink(){
    if(localStorage.getItem('isHighlightLink') == "false"){
        body.setAttribute('data-highlight-link', 'true');
        localStorage.setItem('isHighlightLink', 'true');
    }
    else{
        body.setAttribute('data-highlight-link', 'false');
        localStorage.setItem('isHighlightLink', 'false');
    }
}

link.addEventListener("click", () => {
    toggleHighlightLink();
});

//For keyboard navigation
link.addEventListener('keydown', (event) => {
    if(event.key === 'Enter' || event.key === 'Return'){
        toggleHighlightLink();
    }
});

// -------------------------------------------

const font = document.querySelector("#larger-font-size");

// Creates the variable if it doesn't exist
if(localStorage.getItem('isLargerFont') != 'true' && localStorage.getItem('isLargerFont') != 'false'){
    localStorage.setItem('isLargerFont', 'false');
}
body.setAttribute('data-larger-font', localStorage.getItem('isLargerFont'));

function toggleLargerFont(){
    if(localStorage.getItem('isLargerFont') == "false"){
        body.setAttribute('data-larger-font', 'true');
        localStorage.setItem('isLargerFont', 'true');
    }
    else{
        body.setAttribute('data-larger-font', 'false');
        localStorage.setItem('isLargerFont', 'false');
    }
}

font.addEventListener("click", () => {
    toggleLargerFont();
});

//For keyboard navigation
font.addEventListener('keydown', (event) => {
    if(event.key === 'Enter' || event.key === 'Return'){
        toggleLargerFont();
    }
});

// -------------------------------------------

const lowContrast = document.querySelector("#low-contrast");
const highContrast = document.querySelector("#high-contrast");

// Creates the variable if it doesn't exist
if(localStorage.getItem('currentContrast') != 'none' && localStorage.getItem('currentContrast') != 'low' && localStorage.getItem('currentContrast') != 'high'){
    localStorage.setItem('currentContrast', 'none');
}
body.setAttribute('data-contrast', localStorage.getItem('currentContrast'));

function toggleContrast(mode){
    if(localStorage.getItem('currentContrast') == "none" || localStorage.getItem('currentContrast') != mode){
        body.setAttribute('data-contrast', mode);
        localStorage.setItem('currentContrast', mode);
    }
    else{
        body.setAttribute('data-contrast', 'none');
        localStorage.setItem('currentContrast', 'none');
    }
}

lowContrast.addEventListener("click", () => {
    toggleContrast('low');
});

highContrast.addEventListener("click", () => {
    toggleContrast('high');
});

//For keyboard navigation
lowContrast.addEventListener('keydown', (event) => {
    if(event.key === 'Enter' || event.key === 'Return'){
        toggleContrast('low');
    }
});

highContrast.addEventListener('keydown', (event) => {
    if(event.key === 'Enter' || event.key === 'Return'){
        toggleContrast('high');
    }
});

// -------------------------------------------

const lowSaturation = document.querySelector("#low-saturation");
const highSaturation = document.querySelector("#high-saturation");
const monochrome = document.querySelector("#monochrome");

// Creates the variable if it doesn't exist
if(localStorage.getItem('currentSaturation') != 'none' && localStorage.getItem('currentSaturation') != 'low' && localStorage.getItem('currentSaturation') != 'high' && localStorage.getItem('currentSaturation') != 'monochrome'){
    localStorage.setItem('currentSaturation', 'none');
}
body.setAttribute('data-saturation', localStorage.getItem('currentSaturation'));

function toggleSaturation(mode){
    if(localStorage.getItem('currentSaturation') == "none" || localStorage.getItem('currentSaturation') != mode){
        body.setAttribute('data-saturation', mode);
        localStorage.setItem('currentSaturation', mode);
    }
    else{
        body.setAttribute('data-saturation', 'none');
        localStorage.setItem('currentSaturation', 'none');
    }
}

lowSaturation.addEventListener("click", () => {
    toggleSaturation('low');
});

highSaturation.addEventListener("click", () => {
    toggleSaturation('high');
});

monochrome.addEventListener("click", () => {
    toggleSaturation('monochrome');
});

//For keyboard navigation
lowSaturation.addEventListener('keydown', (event) => {
    if(event.key === 'Enter' || event.key === 'Return'){
        toggleSaturation('low');
    }
});

highSaturation.addEventListener('keydown', (event) => {
    if(event.key === 'Enter' || event.key === 'Return'){
        toggleSaturation('high');
    }
});

monochrome.addEventListener('keydown', (event) => {
    if(event.key === 'Enter' || event.key === 'Return'){
        toggleSaturation('monochrome');
    }
});