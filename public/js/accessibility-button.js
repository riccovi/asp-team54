const accessibilityMenuButton = document.querySelector(".accessibility-button");
const accessibilityMenu = document.querySelector(".all-accessibility-options");

function openAccessibilityMenu(){
    const isOpened = accessibilityMenuButton.getAttribute('aria-expanded');
    if(isOpened === "false"){
        accessibilityMenuButton.setAttribute('aria-expanded', 'true');
    }
    else{
        accessibilityMenuButton.setAttribute('aria-expanded', 'false');
    }
    accessibilityMenu.toggleAttribute("data-visible");
}

accessibilityMenuButton.addEventListener('click', () => {
    openAccessibilityMenu();
});

//For keyboard navigation
accessibilityMenuButton.addEventListener('keydown', (event) => {
    if(event.key === 'Enter' || event.key === 'Return'){
        openAccessibilityMenu();
    }
});