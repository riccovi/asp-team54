const toggleButton = document.querySelector(".accessibility-toggle");
const mobileToggleButton = document.querySelector(".mobile-accessibility-toggle");
const accessibilityOptions = document.querySelector(".accessibility-container");
const menu = document.querySelector(".burger-menu");
const mobileMenu = document.querySelector(".mobile-settings");

// Creates the variable if it doesn't exist
if(localStorage.getItem('showAccessibility') != 'true' && localStorage.getItem('showAccessibility') != 'false'){
    localStorage.setItem('showAccessibility', 'true');
}

// Set all of the data attributes to the stored value
accessibilityOptions.setAttribute('data-visible', localStorage.getItem('showAccessibility'));
menu.setAttribute('data-off', localStorage.getItem('showAccessibility'));
mobileMenu.setAttribute('data-off', localStorage.getItem('showAccessibility'));

function toggleAccessibility(){
    if(localStorage.getItem('showAccessibility') == "true"){
        toggleButton.setAttribute('aria-expanded', 'false');
        accessibilityOptions.setAttribute('data-visible', 'false');
        menu.setAttribute('data-off', 'false');
        mobileMenu.setAttribute('data-off', 'false');
        localStorage.setItem('showAccessibility', 'false');
    }
    else{
        toggleButton.setAttribute('aria-expanded', 'true');
        accessibilityOptions.setAttribute("data-visible", 'true');
        menu.setAttribute("data-off", 'true');
        mobileMenu.setAttribute('data-off', 'true');
        localStorage.setItem('showAccessibility', 'true');
    }
}

toggleButton.addEventListener('click', () => {
    toggleAccessibility();
});

//For keyboard navigation
toggleButton.addEventListener('keydown', (event) => {
    if(event.key === 'Enter' || event.key === 'Return'){
        toggleAccessibility();
    }
});

mobileToggleButton.addEventListener('click', () => {
    if(localStorage.getItem('showAccessibility') == "true"){
        mobileToggleButton.setAttribute('aria-expanded', 'false');
        accessibilityOptions.setAttribute('data-visible', 'false');
        menu.setAttribute('data-off', 'false');
        mobileMenu.setAttribute('data-off', 'false');
        localStorage.setItem('showAccessibility', 'false');
    }
    else{
        mobileToggleButton.setAttribute('aria-expanded', 'true');
        accessibilityOptions.setAttribute("data-visible", 'true');
        menu.setAttribute('data-off', 'true');
        mobileMenu.setAttribute("data-off", 'true');
        localStorage.setItem('showAccessibility', 'true');
    }
});