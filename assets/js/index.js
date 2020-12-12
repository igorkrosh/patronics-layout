$(document).ready(Core);

function Core()
{
    
    SetMainSlider();
    
    SetInterfaceSection();
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

function SetInterfaceSection()
{
    
    SetWhiteLinePosition($('.btn-interface')[0]);
    SetPanelInterface('cooling');

    $('.btn-interface').on('click', function() {
        SetWhiteLinePosition(this);
        SetPanelInterface($(this).attr('interface'));
    })
}

function SetWhiteLinePosition(btn)
{
    let lineWidth = $(btn).outerWidth() * 0.8;
    let left = btn.offsetLeft + ($(btn).outerWidth() - lineWidth) / 2

    $('.white-line').css({
        left: left,
        width: lineWidth
    });
}

function SetPanelInterface(interfaceName)
{
    $('.interface [interface].active').animate({
        opacity: 0
    }, 500, function() {
        $(this).removeClass('active');
    })

    $(`.interface-text.active`).animate({
        opacity: 0
    }, 500, function() {
        $(this).removeClass('active');
        $(`.interface-text[interface="${interfaceName}"]`).addClass('active');
        $(`.interface-text[interface="${interfaceName}"]`).animate({
            opacity: 1
        }, 500);
    })

    $(`.interface [interface="${interfaceName}"]`).addClass('active');
    $(`.interface [interface="${interfaceName}"]`).animate({
        opacity: 1
    }, 500);

    
}