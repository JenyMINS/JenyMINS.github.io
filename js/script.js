setTimeout(function () {
    setCookie('loaded', 'load', 0.5);

}, 1000)
if (getCookie('loaded') === 'load') {
    $('#welcome-screen').css('display', 'none')
} else {
    (function r() {
        var t = !0;
        window.requestCloseWelcomeScreen = function () {
            t = !0
        };
        var e = document.getElementById("welcome-screen"), n = document.getElementById("welcome-screen-background"),
            r = document.getElementById("welcome-screen-logo");

        function o(t) {
            return new Promise((function (e) {
                return setTimeout(e, t)
            }))
        }

        function i(t) {
            return new Promise((function (e) {
                return t.addEventListener("animationend", e, {once: !0})
            }))
        }

        function a(t) {
            e.className = "welcome-screen-state-" + t
        }

        function s() {
            a("static")
        }

        function c() {
            return a("logo-intro"), i(r)
        }

        function u() {
            return (a("bg-intro"), i(n)).then(c)
        }

        function l() {
            return a("outro"), i(n)
        }

        function p() {
            return a("loop"), e = r, n = function () {
                return t
            }, new Promise((function (t) {
                e.addEventListener("animationiteration", (function r() {
                    n() && (e.removeEventListener("animationiteration", r), t())
                }))
            }));
            var e, n
        }

        return e.addEventListener("touchstart", (function (t) {
            return t.preventDefault()
        })), {
            play: function () {
                return u().then((function () {
                    return o(1500)
                })).then((function () {
                    return t ? null : p()
                })).then((function () {
                    return l()
                })).then((function () {
                    return e.remove()
                }))
            }, playStatic: s, playLogoIntro: c, playIntro: u, playIntroAndOutro: function () {
                return u().then((function () {
                    return o(500)
                })).then((function () {
                    return l()
                })).then((function () {
                    return o(1e3)
                })).then((function () {
                    return s()
                }))
            }
        }
    })().play();
}


window.onload = function () {


    const body = document.querySelector('body')
    const menuBtn = document.querySelector('.js-menu-mobile')
    const navMenu = document.querySelector('.right-menu')
    const profileBtn = document.querySelector('.profile-btn')
    if (menuBtn) {

        menuBtn.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active')
                menuBtn.classList.remove('active')
                profileBtn.classList.remove('active')
                body.style.overflow = 'visible'

            } else {
                navMenu.classList.add('active')
                menuBtn.classList.add('active')
                profileBtn.classList.add('active')

                body.style.overflow = 'hidden'
            }
        })
    }


    AOS.init({
        once: true,
        duration: 2000,
    });


    $(' .more-button button').click(() => {
        $('.repost-block').toggleClass('active')
    })


    // Слайдер вина
    if ($('.item-slider').length != 0) {
        let items = $('.item-slider .item'),
            check = 0,
            delay = 5000,
            delay2 = 750,
            i = 0;
        if (i == 0 && check == 0) {
            check += 1;
            $(items[i]).addClass('active');
        }
        let si = swap(items, i);
        for (let n = 0; n < items.length; n++) {
            $(items[n]).hover(
                function () {
                    clearInterval(si);
                }, function () {
                    si = swap(items, n)
                }
            );
        }

        function swap(items, i) {
            let si = setInterval(function () {
                $(items[i]).animate({opacity: 0}, delay2);
                setTimeout(function () {
                    if (i != items.length - 1) {
                        $(items[i]).removeClass('active');
                        $(items[i + 1]).addClass('active').css({'opacity': ''});
                        i += 1
                    } else {
                        $(items[i]).removeClass('active');
                        $(items[0]).addClass('active').css({'opacity': ''});
                        i = 0;
                    }
                }, delay2);
                check += 1
            }, delay);
            return si;
        }

    }
    // Замена текста в новостях на главной
    if ($('.news').length != 0) {
        $('.news-item').each(function (index, item) {
            let date = $(item).find('.date'),
                title = $(item).find('.bottom .name a');

            dateMass = date.text().split(' ');
            if (dateMass[1].length >= 4) {
                date.html(dateMass[0] + ' ' + dateMass[1].substring(0, 3) + '.')
            }
            if (title.text().length > 40) {
                title.html(title.text().replace(/\s+/g, ' ').substring(0, 35) + '...')
            }
        });
    }
    $('.fancybox__button--fullscreen').click(() => {
        $('.fancybox__button--fullscreen').toggleClass('full-active');
    })
    $('.fancybox__button--info').click(() => {
        $('.fancybox__carousel').toggleClass('info-active');
    })


};

// Попап по таймеру
function PopupTimer(flag) {
    if (flag != 0) {
        let popup = $('#check-age'),
            delay2Open = 100,
            delayOpen = 1000;
        console.log(popup)
        blackout = $('.blackout-background');
        if (!getCookie('popupCookie')) {
            setTimeout(function () {
                blackout.addClass('active').animate({opacity: 1}, delay2Open);
            }, 3000);
            setTimeout(function () {
                popup.addClass('active').animate({opacity: 1}, delayOpen);
            }, 3300);
        }

    }
}

function ClosePopupTimer(id) {
    let popup = $('#' + id),
        delayClose = 200;
    blackout = $('.blackout-background');
    blackout.animate({opacity: 0}, delayClose);
    popup.animate({opacity: 0}, delayClose);
    setTimeout(function () {
        popup.removeClass('active');
        blackout.removeClass('active');
    }, delayClose);

}

// Попап по ссылке
function OpenPopup(id) {

    let popup = $('#' + id),
        delay2Open = 100,
        delayOpen = 1000;
    blackout = $('.blackout-background');
    blackout.addClass('active').attr('data-popup', id).animate({opacity: 1}, delay2Open);

    setTimeout(function () {
        popup.addClass('active').animate({opacity: 1}, delayOpen);
    }, 300);
}

function ClosePopup(id) {
    let popup = $('#' + id),
        delayClose = 200;
    let checkAge = $('.popup-checkage')

    blackout = $('.blackout-background');
    blackout.animate({opacity: 0}, delayClose).attr('data-popup', '');
    popup.animate({opacity: 0}, delayClose);
    setTimeout(function () {
        popup.removeClass('active');
        blackout.removeClass('active');
        checkAge.removeClass('active');

    }, delayClose);
}

$('#call-back .left .images').click(() => {
    $('.popup-call-back').removeClass('active')
    $('.blackout-background').removeClass('active')
    $("html, body").animate({
        scrollTop: 0
    }, 1000)
})

// Попап логина
const signUpButton = $('#signUp'),
    signInButton = $('#signIn'),
    container = $('#login');

signUpButton.click(() => {
    container.addClass("right-panel-active");
});

signInButton.click(() => {
    container.removeClass("right-panel-active");
});

Fancybox.Plugins.Toolbar.defaults.items.zoomIn = {
    type: "button",
    class: "fancybox__button--zoomIn",
    label: "Zoom in",
    html: '<svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">\n' +
        '                                    <path d="M8.1816,5.0039 C7.9276,5.0039 7.6696,5.0279 7.4106,5.0759 C5.7326,5.3909 4.3566,6.8479 4.0646,8.6189 C3.9346,9.4039 4.0036,10.2029 4.2616,10.9319 C4.2636,10.9379 4.2656,10.9439 4.2676,10.9499 C5.1716,13.8579 10.2066,17.4019 11.7286,18.4189 C11.8966,18.5329 12.1076,18.5309 12.2746,18.4189 C13.7956,17.4019 18.8266,13.8589 19.7326,10.9499 C19.9966,10.2029 20.0646,9.4039 19.9356,8.6189 C19.6426,6.8479 18.2666,5.3909 16.5896,5.0759 C14.9596,4.7749 13.3646,5.4459 12.4126,6.8369 C12.2256,7.1099 11.7736,7.1099 11.5876,6.8369 C10.7866,5.6669 9.5276,5.0039 8.1816,5.0039 M12.0016,19.5029 C11.7136,19.5029 11.4246,19.4189 11.1726,19.2509 C9.1366,17.8899 4.2966,14.3869 3.3156,11.2559 C3.0036,10.3719 2.9216,9.4039 3.0776,8.4569 C3.4436,6.2429 5.1106,4.4889 7.2266,4.0939 C9.0226,3.7539 10.8006,4.3809 11.9996,5.7409 C13.1996,4.3829 14.9766,3.7569 16.7736,4.0939 C18.8896,4.4899 20.5566,6.2429 20.9216,8.4569 C21.0786,9.4069 20.9956,10.3789 20.6816,11.2659 C19.7116,14.3819 14.8676,17.8889 12.8306,19.2509 C12.5786,19.4189 12.2896,19.5029 12.0016,19.5029" fill-rule="evenodd"></path>\n' +
        '                                </svg>',
    click: function (event) {
        event.preventDefault();
    },
};

Fancybox.Plugins.Toolbar.defaults.items.zoomOut = {
    type: "button",
    class: "fancybox__button--repost",
    label: "thumbs",
    html: '<svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M14.5,14 C14.628,14 14.752,14.049 14.845,14.138 C14.944,14.232 15,14.363 15,14.5 L15,17.293 L20.293,12 L15,6.707 L15,9.5 C15,9.633 14.947,9.761 14.853,9.854 C14.759,9.947 14.632,10 14.5,10 C14.494,9.998 14.491,10 14.486,10 C13.667,10 7.407,10.222 4.606,16.837 C7.276,14.751 10.496,13.795 14.188,13.989 C14.324,13.996 14.426,14.001 14.476,14.001 C14.484,14 14.492,14 14.5,14 M3.5,19 C3.414,19 3.328,18.979 3.25,18.933 C3.052,18.819 2.957,18.585 3.019,18.365 C5.304,10.189 11.981,9.145 14,9.017 L14,5.5 C14,5.298 14.122,5.115 14.309,5.038 C14.496,4.963 14.71,5.004 14.854,5.146 L21.354,11.646 C21.549,11.842 21.549,12.158 21.354,12.354 L14.854,18.854 C14.71,18.997 14.495,19.038 14.309,18.962 C14.122,18.885 14,18.702 14,18.5 L14,14.981 C9.957,14.791 6.545,16.102 3.857,18.85 C3.761,18.948 3.631,19 3.5,19" fill-rule="evenodd"></path></svg>',
    click: function (event) {
        event.preventDefault();
    },
};
Fancybox.Plugins.Toolbar.defaults.items.close = {
    type: "button",
    class: "fancybox__button--close",
    label: "close",
    html: '<span></span>',
    click: function (fancybox) {
        console.log(fancybox)
        $('.info-content').removeClass('active')
    },
};

Fancybox.Plugins.Toolbar.defaults.items.slideshow = {
    type: "button",
    class: "fancybox__button--info",
    label: "slideshow",
    html: '<svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M11.5,3 C16.187,3 20,6.813 20,11.5 C20,16.187 16.187,20 11.5,20 C6.813,20 3,16.187 3,11.5 C3,6.813 6.813,3 11.5,3 Z M11.5,4 C7.364,4 4,7.364 4,11.5 C4,15.636 7.364,19 11.5,19 C15.636,19 19,15.636 19,11.5 C19,7.364 15.636,4 11.5,4 Z M12,10 L12,15 L11,15 L11,10 L12,10 Z M12,8 L12,9 L11,9 L11,8 L12,8 Z" fill-rule="evenodd"></path></svg>',
    click: function (event) {
        event.preventDefault();
        if ($('.fancybox__container').hasClass('active-info')) {
            $('.fancybox__container').removeClass('active-info')
            $('.info-overlay').removeClass('active')
            $('.info-content').removeClass('active')
            $('.fancybox__caption').removeClass('active')
            $('.fancybox__slide').removeClass('active')
        } else {
            $('.fancybox__container').addClass('active-info')
            $('.info-overlay').addClass('active')
            $('.info-content').addClass('active')
            $('.fancybox__caption').addClass('active')
            $('.fancybox__slide ').addClass('active')
        }
    },
};

function getText() {
    console.log('asdsadas')
    $('.slide-name__title').html()
    $('.fancybox__content').append($('.slide-name__title').html())
}

Fancybox.bind('[data-fancybox="gallery"]', {
    caption: function (fancybox, carousel, slide) {
        return (
            ` <div class="slide-name__wrap-title fancybox-slide-title" 
                    style="position: relative; top: unset; left: unset; transform: unset; text-align: center;">
                 <h1 class="slide-name__title" 
                    style=" font-size: 22px;">
                    ${slide.caption}
                  </h1> 
                 <p class="slide-name__label" 
                    style="margin-top: 10px;">
                    V I B E S
                 </p>
               </div>`
        );
    },
    Image: {
        Panzoom: {
            zoomFriction: 1,
            maxScale: function () {
                return 1;
            },
        },
        click: function () {
            // const self = $('.fancybox__content')
            // const ge = $('.slide-name__title').html()
            //
            // console.log(ge)
            // const ge = $('.slide-name__title').html()
            // self.append(ge);
        },

    },
    Toolbar: {
        autoEnable: false,
        display: [
            {id: "fullscreen", position: "left"},
            "close",
            "slideshow",
            "zoomOut",
            "zoomIn",

        ],
        download: {
            type: "div",
            label: "",
            class: "fancybox__button--repost",
            html: 'asdasdasd',
            click: function (event) {
                event.stopPropagation();
            },
        },
    },
});


const searchBtn = $('.js-search')
const searchBtnInput = $('.search-input')
const searchBtnCross = $('.js-cross')
if (searchBtn) {
    searchBtn.click(() => {
        searchBtnInput.addClass('ON6A2O')
        searchBtnCross.addClass('active')
    })
}

if (searchBtnCross) {
    searchBtnCross.click(() => {
        searchBtnInput.removeClass('ON6A2O')
        searchBtnCross.removeClass('active')
    })
}


if (getCookie('popupCookie') != 'submited') {
    if (getCookie('popupCookie') != 'closed') {
        $('.popup-checkage').css("display", "flex").hide().fadeIn();
    }
}

$('#check-age .btns .btn-popup').click(function () {
    $('.popup-checkage').fadeOut();
    //sets the coookie to one minute if the popup is closed (whole numbers = days)
    setCookie('popupCookie', 'submited', 1);
});


function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

const innerWidth = window.innerWidth
const textBlock = document.querySelector('.text-block .text')
const imagesBlock = document.querySelector('.text-block .images')

if (innerWidth <= 768) {
    if (textBlock && imagesBlock) {
        textBlock.setAttribute('data-aos', 'fade-down')
        imagesBlock.setAttribute('data-aos', 'fade-down')
    }
}

if ($(document).width() <= 768) {
    $('#wixViewport').remove()
    $('#utf').after($('<meta name="viewport" content="width=320, user-scalable=yes" id="wixMobileViewport">'));
} else {
    $('#wixViewport').remove()

    $('#wixMobileViewport').remove()
    $('#utf').after($('<meta name="viewport" content="width=device-width, initial-scale=1.0" id="wixViewport">'));

}

$(".open-sub-menu").click(() => {
    $(".sub-menu__list").toggleClass('active')
    $(".open-sub-menu").toggleClass('active')
})

