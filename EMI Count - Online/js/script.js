//console.log("Hey! I'm script.js");

let mediaQ = window.matchMedia("(max-width: 550px)");

if (mediaQ.matches) {

    document.getElementById("menuImg").addEventListener("click", e => {
        document.body.getElementsByTagName("nav")[0].classList.toggle("menu-nav")
        document.getElementById("navLinks").classList.toggle("menu-nav-links")
        document.getElementById("menuImg").classList.toggle("menu-nav-img")
    });

}