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