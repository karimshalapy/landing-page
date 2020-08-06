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
    mainSections: Array.from(document.querySelectorAll("main section")),
    navBarList: document.getElementById("navbar__list")
}
let currentActiveSection;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
//TODO: create the navbar depending on the sections available on page
const navBuild = () => {

    //creating a document fragment for better 
    const el = document.createDocumentFragment();
    //loop over the sections available
    for (let current of DOMObj.mainSections) {
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
const isInView = (el) => {
    const offsets = el.getBoundingClientRect();
    return offsets.top <= window.innerHeight / 2 && offsets.bottom >= window.innerHeight / 2;
}
//TODO: change the active status among sections
const setActiveStatus = () => {
    if (!currentActiveSection) {
        currentActiveSection = DOMObj.mainSections[0]
        currentActiveSection.classList.toggle("your-active-class")
    }
    //loop over the sections to change the currentActiveSection
    for (const section of DOMObj.mainSections) {
        if (isInView(section) && !(section === currentActiveSection)) {
            currentActiveSection.classList.toggle("your-active-class")
            currentActiveSection = section;
            currentActiveSection.classList.toggle("your-active-class")
            return currentActiveSection
        }
    }
}
const scrollToSection = id => {
    let el;
    for (const section of DOMObj.mainSections) {
        if (section.id === id) {
            el = section;
            break
        }
    }
    window.scrollTo({
        top: el.offsetTop,
        behavior: "smooth"
    })
}
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/
const main = e => {
    e.preventDefault();
    // build the nav
    navBuild();

    // Add class 'active' to section when near top of viewport
    setActiveStatus();

    // Scroll to anchor ID using scrollTO event
    const id = window.location.hash.substr(1);
    scrollToSection(id);
}


/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu
document.addEventListener("DOMContentLoaded", main)
// Scroll to section on link click
DOMObj.navBarList.addEventListener("click", e => {
    if (e.target.tagName === "A" || e.target.tagName === "LI") {
        e.preventDefault();
        const id = e.target.hash.substr(1)
        scrollToSection(id)
    }
})
// Set sections as active
document.addEventListener("scroll", setActiveStatus)

