/* =========================
   GET HTML ELEMENTS
========================= */


/* Get the menu icon */

const menuIcon =
    document.getElementById("menu-icon");


/* Get the navigation menu */

const menu =
    document.getElementById("main-menu");


/* Get the search icon */

const searchIcon =
    document.getElementById("search-icon");



/* =========================
   MENU
========================= */

function toggleMenu() {

    /*
       Add or remove the "show"
       class from the menu.
    */

    menu.classList.toggle("show");

}



/* =========================
   SEARCH
========================= */

function searchPage() {

    /*
       Ask the visitor what
       they want to search for.
    */

    const query =
        prompt("Search Atlas:");


    /* If nothing was entered,
       stop the function. */

    if (!query) {

        return;

    }


    /*
       Get all text on the page
       and convert it to lowercase.
    */

    const text =
        document.body.innerText.toLowerCase();


    /*
       Check whether the search
       word exists on the page.
    */

    if (
        text.includes(
            query.toLowerCase()
        )
    ) {

        alert(
            "A matching result was found on this page."
        );

    } else {

        alert(
            "No result found for: " + query
        );

    }

}



/* =========================
   REMEMBER DARK MODE
========================= */


/*
   Check whether dark mode
   was previously saved.
*/

if (
    localStorage.getItem(
        "atlas-dark-mode"
    ) === "true"
) {

    document.body.classList.add(
        "dark-mode"
    );

}



/* =========================
   BUTTON EVENTS
========================= */


/*
   When the menu icon is clicked,
   open or close the menu.
*/

menuIcon.addEventListener(
    "click",
    toggleMenu
);


/*
   When the search icon is clicked,
   run the search function.
*/

searchIcon.addEventListener(
    "click",
    searchPage
);
