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
let currentActiveSection;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
//TODO: create the navbar depending on the sections available on page
function navBuild() {

    //creating a document fragment for better 
    const el = document.createDocumentFragment();
    //loop over the sections available
    for (let i = 0; i < DOMObj.mainSections.length; i++) {
        const current = DOMObj.mainSections[i];
        //create the list item with the link inside it
        const child = document.createElement("li");
        child.innerHTML = `<a href="#${current.id}" class="menu__link"> ${current.dataset.nav} </a>`;
        //append the list item to the fragment
        el.appendChild(child);
    }
    //append the fragment to the parent unordered list
    DOMObj.navBarList.appendChild(el);
}
//TODO: check whether the section is in view or not
function isInView(el) {
    const offsets = el.getBoundingClientRect();
    return offsets.top <= window.innerHeight / 2 && offsets.bottom >= window.innerHeight / 2;
}
//TODO: change the active status among sections
function setActiveStatus() {
    //create an array from the NodeList
    const mainSectionsArr = Array.from(DOMObj.mainSections);
    if (!currentActiveSection) {
        currentActiveSection = mainSectionsArr[0]
        currentActiveSection.classList.toggle("your-active-class")
    }
    //loop over the sections to change the currentActiveSection
    for (let section of mainSectionsArr) {
        if (isInView(section) && !(section === currentActiveSection)) {
            currentActiveSection.classList.toggle("your-active-class")
            currentActiveSection = section;
            currentActiveSection.classList.toggle("your-active-class")
            return currentActiveSection
        }
    }
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
    setActiveStatus();

    // Scroll to anchor ID using scrollTO event

}


/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu
document.addEventListener("DOMContentLoaded", main)
// Scroll to section on link click

// Set sections as active
document.addEventListener("scroll", setActiveStatus)

