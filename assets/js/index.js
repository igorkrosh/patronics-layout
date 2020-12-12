$(document).ready(Core);

function Core()
{
    SetMainSlider();
}

function SetMainSlider()
{
    $(".main-slider .owl-carousel").owlCarousel({
        items: 1,
        nav: true,
        dots: true,
        navContainer: '.nav-btns-wrapper',
        dotsContainer: '.nav-dots-wrapper',
        navText: ['', ''],
        loop: true
    });
}