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