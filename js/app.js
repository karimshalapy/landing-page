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
    navBarList: document.getElementById("navbar__list"),
    goTopBtn: document.getElementById("go-top")
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
        child.innerHTML = `<a href="#${current.id}" id="${current.id}__link" class="menu__link"> ${current.dataset.nav} </a>`;
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
//TODO: change the active status for navbar and sections to iterate only one time
const setActiveStatus = () => {
    if (!currentActiveSection) {
        currentActiveSection = DOMObj.mainSections[0]
        toggleActiveClass(currentActiveSection);
    }
    //loop over the sections to change the currentActiveSection
    for (const section of DOMObj.mainSections) {
        if (isInView(section) && !(section === currentActiveSection)) {
            toggleActiveClass(currentActiveSection);
            currentActiveSection = section;
            toggleActiveClass(currentActiveSection);
            return currentActiveSection
        }
    }
}
//TODO: toggle the active class for navbar and sections
const toggleActiveClass = el => {
    el.classList.toggle("your-active-class")
    const navId = `${el.id}__link`
    document.getElementById(navId).classList.toggle("your-active-nav")
}
//TODO: scroll to the desired section via ID
const scrollToSection = id => {
    let el;
    //iterate over the sections to get the section for the corresponding ID
    if (id) {
        for (const section of DOMObj.mainSections) {
            if (section.id === id) {
                el = section;
                break
            }
        }
        //using scrollTo method on window object
        window.scrollTo({
            top: el.offsetTop,
            behavior: "smooth"
        })
    } else {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
}
//TODO: show the go to top button 
const toggleGoTopBtn = () => {
    if (document.body.parentNode.scrollTop >= window.innerHeight) {
        DOMObj.goTopBtn.style.visibility = "visible"
    } else {
        DOMObj.goTopBtn.style.visibility = "hidden"
    }
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
// Scroll to section on link click and to top if clicked go to top button (used event delegation to lower the amount of listeners)
document.addEventListener("click", e => {
    if (e.target.tagName === "A") {
        e.preventDefault();
        const id = e.target.hash.substr(1)
        scrollToSection(id)
    } else if (e.target.tagName === "I") {
        e.preventDefault();
        scrollToSection(0)
    }
})
// Set sections as active and show the go to top button
document.addEventListener("scroll", () => {
    toggleGoTopBtn();
    setActiveStatus();
})


