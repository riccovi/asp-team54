const navButton = document.querySelector(".settings-menu");
const primaryNav = document.querySelector(".burger-menu");

function openCloseMenu(){
    const isOpened = navButton.getAttribute('aria-expanded');
    if(isOpened === "false"){
        navButton.setAttribute('aria-expanded', 'true');
    }
    else{
        navButton.setAttribute('aria-expanded', 'false');
    }
    primaryNav.toggleAttribute("data-visible");
    primaryNav.classList.remove("hide-on-start");
}

navButton.addEventListener('click', () => {
    openCloseMenu();
});

//For keyboard navigation
navButton.addEventListener('keydown', (event) => {
    if(event.key === 'Enter' || event.key === 'Return'){
        openCloseMenu();
    }
});

const mobileNavButton = document.querySelector(".navigation-heading");
const mobilePrimaryNav = document.querySelector(".menu-navigation");

mobileNavButton.addEventListener('click', () => {
    const isOpened = mobileNavButton.getAttribute('aria-expanded');
    if(isOpened === "false"){
        mobileNavButton.setAttribute('aria-expanded', 'true');
    }
    else{
        mobileNavButton.setAttribute('aria-expanded', 'false');
    }
    mobilePrimaryNav.toggleAttribute("data-visible");
    mobilePrimaryNav.classList.remove("hide-on-start");
});