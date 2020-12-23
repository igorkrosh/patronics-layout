let switchInterfaceBlock = false;

$(document).ready(Core);

$(window).on('load', function()
{
    SwitchIntefrace('cooling');
})

function Core()
{
    SetMainSlider();    
    SetInterfaceSection();
    SetForms();
    SetModal();
    SetMobileMenu();
    SetSelectSwitcher();
    SetArchive();
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
    $('.btn-interface-wrapper .btn-interface').on('click', function() {
        SwitchIntefrace($(this).attr('interface'))
    });

    $('.interface-switcher').owlCarousel({
        items: 1,
        navContainer: '.interface-switcher-navs',
        onTranslate: ModileInterfaceSwitcherOnTranslate,
        loop: true,
        navText: ['', ''],
    });
}

function SetWhiteLinePosition(interfaceName)
{
    let btn = $(`button[interface="${interfaceName}"]`);

    if (btn.length === 0)
    {
        return;
    }

    btn = btn[0];

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

function ModileInterfaceSwitcherOnTranslate(event)
{
    let target = $(event.target).find('.btn-interface')[event.item.index];
    let interfaceCode = $(target).attr('interface');
    SwitchIntefrace(interfaceCode)
    console.log(target)

}

function SetForms()
{
    $.validator.addMethod('validateForm', ValidateForm);
    
    let validateSetting = {
        rules: {
            phone: {
                validateForm: true
            },
            mail: {
                validateForm: true
            }
        },
        messages: {
            phone: {
                validateForm: 'Введите полный номер телефона'
            },
            mail: {
                validateForm: 'Введите ваш электронный адрес'
            }
        },
        submitHandler: SubmitForm
    } 
    
    $('.contact-us .contact-form').validate(validateSetting);
    $('.modal .contact-form').validate(validateSetting);
    $('form input[name=phone]').mask("+7(999)999-9999", {autoclear: false});
}

function SubmitForm()
{
    console.log('submit');
}

function ValidateForm(value, element)
{
    let inputName = $(element).attr('name');
    let phoneCheck = false;
    let mailCheck = false;
    let secondInputValue;

    switch(inputName)
    {
        case 'phone':
            secondInputValue = $(element).closest('form').find('input[name="mail"]').val();
            
            phoneCheck = CheckPhone(value);
            mailCheck = CheckEmail(secondInputValue);

            break;
        case 'mail':
            secondInputValue = $(element).closest('form').find('input[name="phone"]').val();

            phoneCheck = CheckPhone(secondInputValue);
            mailCheck = CheckEmail(value);

            break;
    }

    return phoneCheck || mailCheck;
}

function CheckEmail(value) 
{
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase());
}

function CheckPhone(value)
{
    let re = /\+\d{1}\(\d{3}\)\d{3}-\d{4}/g;
    return re.test(String(value)); 
}

function SetModal()
{
    $('.btn-modal').on('click', function()
    {
        ShowModal('#modalContactForm');
    });

    $('.modal-dialog').on('click', function(e) {
        e.stopPropagation();
    });

    $('.modal').on('click', function() {
        HideModal(`#${$(this).attr('id')}`);
    });

    $('.btn-modal-close').on('click', function ()
    {
        let modalId = $(this).closest('.modal').attr('id');
        console.log(modalId)
        HideModal(`#${modalId}`);
    });
}

function ShowModal(modalId)
{
    $(modalId + ' .modal-dialog').off('animationend');
    $(modalId).addClass('active');
    $('body').addClass('modal-open');
    $(modalId + ' .modal-dialog').addClass('fadeInDownBig')
    
    $('body').append('<div class="modal-backdrop"></div>');
    setTimeout(function() {
        $('.modal-backdrop').addClass('active');
    }, 50)
}

function HideModal(modalId)
{
    $(modalId + ' .modal-dialog').removeClass('fadeInDownBig');
    $(modalId + ' .modal-dialog').addClass('fadeOutDownBig');
    $('.modal-backdrop').removeClass('active');
    $('body').removeClass('modal-open');
    $(modalId + ' .modal-dialog').on('animationend', function() {
        if (!$(modalId).hasClass('active'))
        {
            return;
        }
        $(modalId).removeClass('active');
        $(modalId + ' .modal-dialog').removeClass('fadeOutDownBig');
        $('.modal-backdrop').remove();
    });
}

function SetMobileMenu()
{
    $('.btn-menu').on('click', function() {
        if ($('header .menu').hasClass('active'))
        {
            $('header .menu').removeClass('active');
            $(this).removeClass('active');
        }
        else
        {
            $('header .menu').addClass('active');
            $(this).addClass('active');
        }
        
    })
}

function SetSelectSwitcher()
{
    $('.select-switcher').change(function() {
        let target = $(this).val();

        SwitchCard(target);
    })
}

function SwitchCard(target)
{
    $('.card.active').animate({
        opacity: 0
    }, 500, function() {
        $('.card.active').removeClass('active');

        $(`[card-name="${target}"]`).css('opacity', 0);
        $(`[card-name="${target}"]`).addClass('active');
        $(`[card-name="${target}"]`).animate({
            opacity: 1
        }, 500)
    })
}

function SetArchive()
{
    $('.update .update-show').on('click', function() {
        let updateDiv = $(this).closest('.update');

        if ($(updateDiv).hasClass('active'))
        {
            $(this).text('Подробнее');
            $(updateDiv).find('.text-full').css('max-height', '0px');
            $(updateDiv).removeClass('active')
        }
        else
        {
            $(this).text('Скрыть');
            $(updateDiv).find('.text-full').css('max-height', `${$(updateDiv).find('.text-wrapper').height()}px`);
            $(updateDiv).addClass('active')
        }
    });
}