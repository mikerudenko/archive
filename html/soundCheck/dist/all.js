'use strict';

window.onload = enterpoint;

function enterpoint() {

    //Handler for burger menu
    document.querySelector('.header-burger').addEventListener('click', burgerMenuHandler);
    document.querySelector('body').addEventListener('click', bodyClickHandler);

    function bodyClickHandler(event) {
        var menuClasses = document.querySelector('.header-navigation').classList,
            hasActiveClass = menuClasses.contains('active');

        if (hasActiveClass && event.target.className !== 'header-navigation active' && event.target.className !== 'header-burger' && event.target.className !== 'header-item-navigation') {
            menuClasses.remove('active');
        }
    }

    function burgerMenuHandler(event) {
        document.querySelector('.header-navigation').classList.add("active");
    }
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJvbmxvYWQiLCJlbnRlcnBvaW50IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiYWRkRXZlbnRMaXN0ZW5lciIsImJ1cmdlck1lbnVIYW5kbGVyIiwiYm9keUNsaWNrSGFuZGxlciIsImV2ZW50IiwibWVudUNsYXNzZXMiLCJjbGFzc0xpc3QiLCJoYXNBY3RpdmVDbGFzcyIsImNvbnRhaW5zIiwidGFyZ2V0IiwiY2xhc3NOYW1lIiwicmVtb3ZlIiwiYWRkIl0sIm1hcHBpbmdzIjoiOztBQUFBQSxPQUFPQyxNQUFQLEdBQWdCQyxVQUFoQjs7QUFFQSxTQUFTQSxVQUFULEdBQXNCOztBQUVsQjtBQUNBQyxhQUFTQyxhQUFULENBQXVCLGdCQUF2QixFQUF5Q0MsZ0JBQXpDLENBQTBELE9BQTFELEVBQWtFQyxpQkFBbEU7QUFDQUgsYUFBU0MsYUFBVCxDQUF1QixNQUF2QixFQUErQkMsZ0JBQS9CLENBQWdELE9BQWhELEVBQXlERSxnQkFBekQ7O0FBRUEsYUFBU0EsZ0JBQVQsQ0FBMEJDLEtBQTFCLEVBQWlDO0FBQzdCLFlBQUlDLGNBQWNOLFNBQVNDLGFBQVQsQ0FBdUIsb0JBQXZCLEVBQTZDTSxTQUEvRDtBQUFBLFlBQ0lDLGlCQUFpQkYsWUFBWUcsUUFBWixDQUFxQixRQUFyQixDQURyQjs7QUFHQSxZQUFHRCxrQkFBa0JILE1BQU1LLE1BQU4sQ0FBYUMsU0FBYixLQUF5QiwwQkFBM0MsSUFDa0JOLE1BQU1LLE1BQU4sQ0FBYUMsU0FBYixLQUF5QixlQUQzQyxJQUVrQk4sTUFBTUssTUFBTixDQUFhQyxTQUFiLEtBQXlCLHdCQUY5QyxFQUV3RTtBQUNwRUwsd0JBQVlNLE1BQVosQ0FBbUIsUUFBbkI7QUFDSDtBQUVKOztBQUVELGFBQVNULGlCQUFULENBQTJCRSxLQUEzQixFQUFrQztBQUM5QkwsaUJBQVNDLGFBQVQsQ0FBdUIsb0JBQXZCLEVBQTZDTSxTQUE3QyxDQUF1RE0sR0FBdkQsQ0FBMkQsUUFBM0Q7QUFDSDtBQUNKIiwiZmlsZSI6ImFsbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIndpbmRvdy5vbmxvYWQgPSBlbnRlcnBvaW50O1xuXG5mdW5jdGlvbiBlbnRlcnBvaW50KCkge1xuXG4gICAgLy9IYW5kbGVyIGZvciBidXJnZXIgbWVudVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXItYnVyZ2VyJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGJ1cmdlck1lbnVIYW5kbGVyKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBib2R5Q2xpY2tIYW5kbGVyKTtcblxuICAgIGZ1bmN0aW9uIGJvZHlDbGlja0hhbmRsZXIoZXZlbnQpIHtcbiAgICAgICAgbGV0IG1lbnVDbGFzc2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlci1uYXZpZ2F0aW9uJykuY2xhc3NMaXN0LFxuICAgICAgICAgICAgaGFzQWN0aXZlQ2xhc3MgPSBtZW51Q2xhc3Nlcy5jb250YWlucygnYWN0aXZlJyk7XG5cbiAgICAgICAgaWYoaGFzQWN0aXZlQ2xhc3MgJiYgZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSE9PSdoZWFkZXItbmF2aWdhdGlvbiBhY3RpdmUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICYmIGV2ZW50LnRhcmdldC5jbGFzc05hbWUhPT0naGVhZGVyLWJ1cmdlcidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSE9PSdoZWFkZXItaXRlbS1uYXZpZ2F0aW9uJykge1xuICAgICAgICAgICAgbWVudUNsYXNzZXMucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYnVyZ2VyTWVudUhhbmRsZXIoZXZlbnQpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlci1uYXZpZ2F0aW9uJykuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICB9XG59XG4iXX0=
