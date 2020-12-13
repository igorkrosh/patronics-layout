let switchInterfaceBlock = false;

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
    $('.btn-interface').on('click', function() {
        SwitchIntefrace($(this).attr('interface'))
    });
}

function SetWhiteLinePosition(interfaceName)
{
    let btn = $(`button[interface="${interfaceName}"]`)[0]
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
    }, 250, function() {
        if (!$(this).hasClass('active'))
        {
            return;
        }
        $(this).removeClass('active');
        $(`.interface [interface="${interfaceName}"]`).addClass('active');
        $(`.interface [interface="${interfaceName}"]`).animate({
            opacity: 1
        }, 250, function () {
            switchInterfaceBlock = false;
        });
    })

    $(`.interface-text.active`).animate({
        opacity: 0
    }, 250, function() {
        if (!$(this).hasClass('active'))
        {
            return;
        }
        $(this).removeClass('active');
        $(`.interface-text[interface="${interfaceName}"]`).addClass('active');
        $(`.interface-text[interface="${interfaceName}"]`).animate({
            opacity: 1
        }, 250);
    });
}



function SwitchIntefrace(interfaceName)
{
    if (!switchInterfaceBlock)
    {
        SetWhiteLinePosition(interfaceName);
        SetPanelInterface(interfaceName);

        switchInterfaceBlock = !switchInterfaceBlock;
    }

}

$(window).on('load', function()
{
    SwitchIntefrace('cooling');
})