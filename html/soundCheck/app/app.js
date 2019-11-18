window.onload = enterpoint;

function enterpoint() {

    //Handler for burger menu
    document.querySelector('.header-burger').addEventListener('click',burgerMenuHandler);
    document.querySelector('body').addEventListener('click', bodyClickHandler);

    function bodyClickHandler(event) {
        let menuClasses = document.querySelector('.header-navigation').classList,
            hasActiveClass = menuClasses.contains('active');

        if(hasActiveClass && event.target.className!=='header-navigation active'
                          && event.target.className!=='header-burger'
                          && event.target.className!=='header-item-navigation') {
            menuClasses.remove('active');
        }

    }

    function burgerMenuHandler(event) {
        document.querySelector('.header-navigation').classList.add("active");
    }
}
