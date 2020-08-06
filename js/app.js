/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const DOMObj = {
    mainSections: document.querySelectorAll("main section"),
    navBarList: document.getElementById("navbar__list")
}


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function navBuild() {


    //creating a document fragment for better 
    let el = document.createDocumentFragment();
    for (let i = 0; i < DOMObj.mainSections.length; i++) {
        let current = DOMObj.mainSections[i];
        let child = document.createElement("li");
        child.innerHTML = `<a href="#${current.id}" class="menu__link"> ${current.dataset.nav} </a>`;
        el.appendChild(child);
    }
    DOMObj.navBarList.appendChild(el);
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/
function main() {
    // build the nav
    navBuild();

    // Add class 'active' to section when near top of viewport


    // Scroll to anchor ID using scrollTO event

}


/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu 

// Scroll to section on link click

// Set sections as active


