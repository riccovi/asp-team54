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