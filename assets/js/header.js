var SwitchMenuMobile = document.getElementById("SwitchMenuMobile");
var MenuMobile = document.getElementById("MenuMobile");

var ClassMenuMobile = MenuMobile.className

SwitchMenuMobile.addEventListener("click", function() {
    MenuMobile.className = "MenuMobile";
})
MenuMobile.addEventListener("click", function() {
    MenuMobile.className = "MenuMobile" + " CloseMenu";
    setTimeout(1000, function() {
        MenuMobile.className = "MenuMobile CloseMenu" + " None";
    })
})