'use strict';

$(function () {
    $('body').animate({opacity: 1}, 500);

    function setStepInfo(sliderNum, currentSlide, slick) {
        const i = (currentSlide ? currentSlide : 0) + 1;
        const totalCount = slick.slideCount >= 10 ? slick.slideCount : ('0' + slick.slideCount);
        var str = `<span class="currentStep">${i >= 10 ? i : '0' + i}</span>/${totalCount}`;
        $('.slider-wrapper-' + sliderNum + ' .slide-number').html(str);
    }

    function onInitHandler(sliderNum, currentSlide, slick) {
        setStepInfo(sliderNum, currentSlide, slick);
    }

    function afterChangeHandler(sliderNum, currentSlide, slick) {
        $('.slider-' + sliderNum + ' .slick-slide').removeClass('prev next');
        setStepInfo(sliderNum, currentSlide, slick);
    }

    function beforeChangeHandler(currentSlide, nextSlide, slick) {

    }

    function hideSubSlide() {
        const fourthCard = $('.screen-block.fourth.card');
        if (fourthCard.hasClass('active')) {
            fourthCard.removeClass('active').css({
                transform: 'translateX(-100%)'
            });
            setTimeout(function () {
                fourthCard.find('.slide').removeClass('active');
                $('.links-nav .sub-page').text('');

                $('.screen-block.fourth.card').css({
                    transition: '0s',
                    transform: 'translateX(100%)'
                });
                setTimeout(function () {
                    fourthCard.css({
                        transition: '.5s ease-in-out'
                    });
                }, 500);
            }, 500);

            document.getElementById('fourth-card').removeEventListener('wheel', FourthCardWheelHandler);
        }
    }

    /**
     * @return {boolean}
     */
    function FourthCardWheelHandler(e) {
        hideSubSlide();
        if (e.deltaY > 0) {
            $.fn['pagepiling'].moveSectionDown();
        } else {
            $.fn['pagepiling'].moveSectionUp();
        }
        return false;
    }

    function toggleMobileMenu(toggle) {
        const translate = toggle ? 100 : 0;
        const menu = $('header .mob-wrapper');
        const header = $('header');
        !toggle ? header.addClass('active')
            : header.removeClass('active')
        menu.css({
            transform: 'translateX(' + translate + '%)'
        });
    }

    function toggleModal(toggle, modal) {
        toggle ? modal.stop().fadeIn()
            : modal.stop().fadeOut();
    }

    if ($('#pagepiling').length > 0) {
        $('#pagepiling').pagepiling({
            anchors: ['about', 'purpose', 'reviews', 'test', 'landing', 'contact'],
            menu: '#nav-menu',
            direction: 'vertical',
            easing: 'swing',
            navigation: true,
            normalScrollElements: '.review-slider, .scrollbar',
            onLeave: function () {
                hideSubSlide();
            }
        });
        $('.next-slide').on('click', function () {
            $.fn['pagepiling'].moveSectionDown();
        });
    }


    const slider3Options = {
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slider-btn prev">\n' +
            '                    <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
            '                        <path d="M6.00409 5.04376C6.00485 5.17537 5.97963 5.30583 5.92986 5.42767C5.8801 5.5495 5.80677 5.66032 5.71409 5.75376L1.71409 9.75376C1.62085 9.847 1.51016 9.92096 1.38834 9.97142C1.26652 10.0219 1.13595 10.0479 1.00409 10.0479C0.872232 10.0479 0.741664 10.0219 0.619842 9.97142C0.49802 9.92096 0.38733 9.847 0.294091 9.75376C0.200853 9.66052 0.126892 9.54983 0.0764313 9.42801C0.0259709 9.30619 -1.96485e-09 9.17562 0 9.04376C1.96486e-09 8.9119 0.0259709 8.78133 0.0764313 8.65951C0.126892 8.53769 0.200853 8.427 0.294091 8.33376L3.60409 5.04376L0.424091 1.74376C0.321802 1.65177 0.239593 1.53966 0.182607 1.41445C0.125621 1.28924 0.0950833 1.15361 0.0929041 1.01606C0.0907248 0.878505 0.11695 0.74198 0.169941 0.615025C0.222932 0.48807 0.301549 0.373415 0.400873 0.278229C0.500198 0.183043 0.618093 0.109374 0.747188 0.0618305C0.876282 0.014287 1.0138 -0.00610733 1.15113 0.0019207C1.28847 0.00994873 1.42267 0.0462275 1.54535 0.108488C1.66802 0.170749 1.77653 0.25765 1.86409 0.36376L5.72409 4.36376C5.90041 4.54663 6.00052 4.78976 6.00409 5.04376Z" fill="#2E3262"></path>\n' +
            '                    </svg>\n' +
            '                </button>',
        nextArrow: '<button type="button" class="slider-btn next">\n' +
            '                    <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
            '                        <path d="M6.00409 5.04376C6.00485 5.17537 5.97963 5.30583 5.92986 5.42767C5.8801 5.5495 5.80677 5.66032 5.71409 5.75376L1.71409 9.75376C1.62085 9.847 1.51016 9.92096 1.38834 9.97142C1.26652 10.0219 1.13595 10.0479 1.00409 10.0479C0.872232 10.0479 0.741664 10.0219 0.619842 9.97142C0.49802 9.92096 0.38733 9.847 0.294091 9.75376C0.200853 9.66052 0.126892 9.54983 0.0764313 9.42801C0.0259709 9.30619 -1.96485e-09 9.17562 0 9.04376C1.96486e-09 8.9119 0.0259709 8.78133 0.0764313 8.65951C0.126892 8.53769 0.200853 8.427 0.294091 8.33376L3.60409 5.04376L0.424091 1.74376C0.321802 1.65177 0.239593 1.53966 0.182607 1.41445C0.125621 1.28924 0.0950833 1.15361 0.0929041 1.01606C0.0907248 0.878505 0.11695 0.74198 0.169941 0.615025C0.222932 0.48807 0.301549 0.373415 0.400873 0.278229C0.500198 0.183043 0.618093 0.109374 0.747188 0.0618305C0.876282 0.014287 1.0138 -0.00610733 1.15113 0.0019207C1.28847 0.00994873 1.42267 0.0462275 1.54535 0.108488C1.66802 0.170749 1.77653 0.25765 1.86409 0.36376L5.72409 4.36376C5.90041 4.54663 6.00052 4.78976 6.00409 5.04376Z" fill="#2E3262"/>\n' +
            '                    </svg>\n' +
            '                </button>',
        appendArrows: $('.slider-wrapper-3'),
        variableWidth: false,
        centerMode: false,
        infinite: false,
        rtl: true,
        responsive: [
            {
                breakpoint: 1261,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    variableWidth: true,
                }
            },
            // {
            //     breakpoint: 992,
            //     settings: {
            //         slidesToShow: 2,
            //         slidesToScroll: 1,
            //         slidesPerRow: 2,
            //         rows: 2,
            //         activateRows: true,
            //         variableWidth: false,
            //     }
            // },
            {
                breakpoint: 767,
                settings: {
                    // slidesPerRow: 1,
                    // rows: 1,
                    slidesToShow: 1,
                    // slidesToScroll: 1,
                    // activateRows: false,
                    variableWidth: false,
                }
            }
        ]
    };
    const slider4Options = {
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: '<button class="slider-btn prev top">\n' +
            '                    <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
            '                        <path d="M6.00409 5.04376C6.00485 5.17537 5.97963 5.30583 5.92986 5.42767C5.8801 5.5495 5.80677 5.66032 5.71409 5.75376L1.71409 9.75376C1.62085 9.847 1.51016 9.92096 1.38834 9.97142C1.26652 10.0219 1.13595 10.0479 1.00409 10.0479C0.872232 10.0479 0.741664 10.0219 0.619842 9.97142C0.49802 9.92096 0.38733 9.847 0.294091 9.75376C0.200853 9.66052 0.126892 9.54983 0.0764313 9.42801C0.0259709 9.30619 -1.96485e-09 9.17562 0 9.04376C1.96486e-09 8.9119 0.0259709 8.78133 0.0764313 8.65951C0.126892 8.53769 0.200853 8.427 0.294091 8.33376L3.60409 5.04376L0.424091 1.74376C0.321802 1.65177 0.239593 1.53966 0.182607 1.41445C0.125621 1.28924 0.0950833 1.15361 0.0929041 1.01606C0.0907248 0.878505 0.11695 0.74198 0.169941 0.615025C0.222932 0.48807 0.301549 0.373415 0.400873 0.278229C0.500198 0.183043 0.618093 0.109374 0.747188 0.0618305C0.876282 0.014287 1.0138 -0.00610733 1.15113 0.0019207C1.28847 0.00994873 1.42267 0.0462275 1.54535 0.108488C1.66802 0.170749 1.77653 0.25765 1.86409 0.36376L5.72409 4.36376C5.90041 4.54663 6.00052 4.78976 6.00409 5.04376Z" fill="#2E3262"/>\n' +
            '                    </svg>\n' +
            '                </button>',
        nextArrow: '<button class="slider-btn next top">\n' +
            '                    <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
            '                        <path d="M6.00409 5.04376C6.00485 5.17537 5.97963 5.30583 5.92986 5.42767C5.8801 5.5495 5.80677 5.66032 5.71409 5.75376L1.71409 9.75376C1.62085 9.847 1.51016 9.92096 1.38834 9.97142C1.26652 10.0219 1.13595 10.0479 1.00409 10.0479C0.872232 10.0479 0.741664 10.0219 0.619842 9.97142C0.49802 9.92096 0.38733 9.847 0.294091 9.75376C0.200853 9.66052 0.126892 9.54983 0.0764313 9.42801C0.0259709 9.30619 -1.96485e-09 9.17562 0 9.04376C1.96486e-09 8.9119 0.0259709 8.78133 0.0764313 8.65951C0.126892 8.53769 0.200853 8.427 0.294091 8.33376L3.60409 5.04376L0.424091 1.74376C0.321802 1.65177 0.239593 1.53966 0.182607 1.41445C0.125621 1.28924 0.0950833 1.15361 0.0929041 1.01606C0.0907248 0.878505 0.11695 0.74198 0.169941 0.615025C0.222932 0.48807 0.301549 0.373415 0.400873 0.278229C0.500198 0.183043 0.618093 0.109374 0.747188 0.0618305C0.876282 0.014287 1.0138 -0.00610733 1.15113 0.0019207C1.28847 0.00994873 1.42267 0.0462275 1.54535 0.108488C1.66802 0.170749 1.77653 0.25765 1.86409 0.36376L5.72409 4.36376C5.90041 4.54663 6.00052 4.78976 6.00409 5.04376Z" fill="#2E3262"/>\n' +
            '                    </svg>\n' +
            '                </button>',
        appendArrows: $('.slider-wrapper-4'),
        variableWidth: false,
        centerMode: false,
        infinite: false,
        rtl: true,
        responsive: [
            {
                breakpoint: 1261,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    variableWidth: false,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    variableWidth: false,
                    centerMode: false,
                    infinite: false,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    variableWidth: false
                }
            }
        ]
    };

    const slider3 = $('.slider-3');
    const slider4 = $('.slider-4');

    slider3.on('init reInit', function (event, slick, currentSlide) {
        onInitHandler(3, currentSlide, slick);
    })
        .on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            beforeChangeHandler(currentSlide, nextSlide, slick);
        })
        .on('afterChange', function (event, slick, currentSlide) {
            afterChangeHandler(3, currentSlide, slick);
        });

    slider4.on('init reInit', function (event, slick, currentSlide) {
        onInitHandler(4, currentSlide, slick);
    })
        .on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            beforeChangeHandler(currentSlide, nextSlide, slick);
        })
        .on('afterChange', function (event, slick, currentSlide) {
            afterChangeHandler(4, currentSlide, slick);
        });

    slider3.slick(slider3Options);
    slider4.slick(slider4Options);

    const sliderPopup = $('.slider-popup .slider-popup-block');

    sliderPopup.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slider-btn prev">\n' +
            '                    <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
            '                        <path d="M6.00409 5.04376C6.00485 5.17537 5.97963 5.30583 5.92986 5.42767C5.8801 5.5495 5.80677 5.66032 5.71409 5.75376L1.71409 9.75376C1.62085 9.847 1.51016 9.92096 1.38834 9.97142C1.26652 10.0219 1.13595 10.0479 1.00409 10.0479C0.872232 10.0479 0.741664 10.0219 0.619842 9.97142C0.49802 9.92096 0.38733 9.847 0.294091 9.75376C0.200853 9.66052 0.126892 9.54983 0.0764313 9.42801C0.0259709 9.30619 -1.96485e-09 9.17562 0 9.04376C1.96486e-09 8.9119 0.0259709 8.78133 0.0764313 8.65951C0.126892 8.53769 0.200853 8.427 0.294091 8.33376L3.60409 5.04376L0.424091 1.74376C0.321802 1.65177 0.239593 1.53966 0.182607 1.41445C0.125621 1.28924 0.0950833 1.15361 0.0929041 1.01606C0.0907248 0.878505 0.11695 0.74198 0.169941 0.615025C0.222932 0.48807 0.301549 0.373415 0.400873 0.278229C0.500198 0.183043 0.618093 0.109374 0.747188 0.0618305C0.876282 0.014287 1.0138 -0.00610733 1.15113 0.0019207C1.28847 0.00994873 1.42267 0.0462275 1.54535 0.108488C1.66802 0.170749 1.77653 0.25765 1.86409 0.36376L5.72409 4.36376C5.90041 4.54663 6.00052 4.78976 6.00409 5.04376Z" fill="#2E3262"></path>\n' +
            '                    </svg>\n' +
            '                </button>',
        nextArrow: '<button type="button" class="slider-btn next">\n' +
            '                    <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
            '                        <path d="M6.00409 5.04376C6.00485 5.17537 5.97963 5.30583 5.92986 5.42767C5.8801 5.5495 5.80677 5.66032 5.71409 5.75376L1.71409 9.75376C1.62085 9.847 1.51016 9.92096 1.38834 9.97142C1.26652 10.0219 1.13595 10.0479 1.00409 10.0479C0.872232 10.0479 0.741664 10.0219 0.619842 9.97142C0.49802 9.92096 0.38733 9.847 0.294091 9.75376C0.200853 9.66052 0.126892 9.54983 0.0764313 9.42801C0.0259709 9.30619 -1.96485e-09 9.17562 0 9.04376C1.96486e-09 8.9119 0.0259709 8.78133 0.0764313 8.65951C0.126892 8.53769 0.200853 8.427 0.294091 8.33376L3.60409 5.04376L0.424091 1.74376C0.321802 1.65177 0.239593 1.53966 0.182607 1.41445C0.125621 1.28924 0.0950833 1.15361 0.0929041 1.01606C0.0907248 0.878505 0.11695 0.74198 0.169941 0.615025C0.222932 0.48807 0.301549 0.373415 0.400873 0.278229C0.500198 0.183043 0.618093 0.109374 0.747188 0.0618305C0.876282 0.014287 1.0138 -0.00610733 1.15113 0.0019207C1.28847 0.00994873 1.42267 0.0462275 1.54535 0.108488C1.66802 0.170749 1.77653 0.25765 1.86409 0.36376L5.72409 4.36376C5.90041 4.54663 6.00052 4.78976 6.00409 5.04376Z" fill="#2E3262"/>\n' +
            '                    </svg>\n' +
            '                </button>',
        centerMode: false,
        infinite: true,
        rtl: true
    });

    $('.slider-popup .close-btn').on('click', function () {
        $('.slider-popup').css('left', '-99999px');
    });

    $('.certificates-slider').on('click', '.slide .img-box', function () {
        const currentSlideIndex = $(this).parents('.slick-slide').attr('data-slick-index');
        sliderPopup.slick('slickGoTo', currentSlideIndex);
        setTimeout(() => $('.slider-popup').css('left', '0'), 500);
    });

    //
    // $('.audio-img').on('click', function () {
    //     const audio = new Audio($(this).attr('data-sound'));
    //     const _thiz = $(this);
    //     _thiz.addClass('active');
    //     audio.play()
    //         .then(() => console.log('Sound playing!'))
    //         .catch(() => console.log('Sound failed to play!'));
    //     audio.addEventListener("ended", function(){
    //         setTimeout(() => _thiz.removeClass('active'), 200)
    //     });
    // });
    //
    // if (audiojs) {
    //     audiojs.events.ready(function() {
    //         audiojs.createAll();
    //     });
    // }


    $('.screen-block .slider.audio-slider .blue-btn').on('click', function (e) {
        e.preventDefault();
        const slideNum = $(this).parents('.slide').attr('data-slide');
        $('.screen-block.fourth.card .slide-' + slideNum).addClass('active');
        $('.links-nav .sub-page').text('/0' + slideNum);
        $('.screen-block.fourth.card').addClass('active').css({
            transform: 'translateX(0)'
        });

        document.getElementById('fourth-card').addEventListener('wheel', FourthCardWheelHandler);
    });

    $('.screen-block.fourth.card .btn-wrapper .back-btn').on('click', function (e) {
        e.preventDefault();
        hideSubSlide();
    });

    $('header .close-btn').on('click', function () {
        toggleMobileMenu(true);
    });
    $('.hamburger').on('click', function () {
        toggleMobileMenu(false);
    });
    $(document).on('mouseup', function (e) {
        const container = $('header .mob-wrapper');
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            if ($(window).width() < 1261) {
                toggleMobileMenu(true);
            }
        }
        const sliderPopupSlide = $('.slider-popup .slider-popup-block .slick-current .slide img');
        const sliderPopupBtns = $('.slider-popup .slider-popup-block .slider-btn');
        if (!sliderPopupSlide.is(e.target) && sliderPopupSlide.has(e.target).length === 0) {
            if (!sliderPopupBtns.is(e.target) && sliderPopupBtns.has(e.target).length === 0) {
                $('.slider-popup').css('left', '-99999px');
            }
        }
        const modalContainer = $('.video-wrapper');
        if (!modalContainer.is(e.target) && modalContainer.has(e.target).length === 0) {
            toggleModal(false, $('.video-modal'));
            if ($(e.target).find('iframe').length > 0) {
                const videoSrc = $(e.target).find('iframe').attr('src').replace('?autoplay=1', '');
                $(e.target).find('iframe').attr('src', '').attr('src', videoSrc);
            }
        }
    });

    $('.open-modal').on('click', function () {
        const modal = $('.' + $(this).attr('data-open'));
        toggleModal(true, modal);
        const videoSrc = modal.find('iframe').attr('src');
        modal.find('iframe').attr('src', videoSrc + '?autoplay=1');
    });

    $('.close-btn').on('click', function () {
        toggleModal(false, $('.video-modal'));
        const videoSrc = $(this).parents('.video-modal').find('iframe').attr('src').replace('?autoplay=1', '');
        $(this).parents('.video-modal').find('iframe').attr('src', '').attr('src', videoSrc);
    });

    $('header .nav>li>a').on('click', function () {
        if ($(window).width() < 1361) {
            toggleMobileMenu(true);
        }
    });

    var clientStartY, clientStartX, originalTouchStartTarget;
    $(document).on('touchstart', function (e) {
        if ($('#pagepiling').length > 0) {
            originalTouchStartTarget = e.currentTarget;
            clientStartY = e.originalEvent.touches[0].clientY;
            clientStartX = e.originalEvent.touches[0].clientX;
            $.fn.pagepiling.setAllowScrolling(false);
        }
    });

    $(document).on('touchend', function (e) {
        if ($('#pagepiling').length > 0) {
            var clientMoveY = e.originalEvent.changedTouches[0].clientY;
            var clientMoveX = e.originalEvent.changedTouches[0].clientX;
//        if ($(originalTouchStartTarget).hasClass('slider-wrapper-3') || $(originalTouchStartTarget).hasClass('slider-4')) {
            if (clientMoveX > clientStartX + 20 || clientMoveX < clientStartX - 20) {
                if (clientMoveX > clientStartX + 100 || clientMoveX < clientStartX - 100) {

                } else {
                    if (clientMoveY > clientStartY + 100) {
                        $.fn['pagepiling'].moveSectionUp();
                        $.fn.pagepiling.setAllowScrolling(true);
                    } else if (clientMoveY < clientStartY - 100) {
                        $.fn['pagepiling'].moveSectionDown();
                        $.fn.pagepiling.setAllowScrolling(true);
                    }
                }
            } else {
                $.fn.pagepiling.setAllowScrolling(true);
                if (clientMoveY > clientStartY + 100) {
                    $.fn['pagepiling'].moveSectionUp();
                } else if (clientMoveY < clientStartY - 100) {
                    $.fn['pagepiling'].moveSectionDown();
                }
            }
            //   }
            originalTouchStartTarget = null;
        }
    });


    $('.packet-block .packet-slider').slick(
        {
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: '<button class="slider-btn prev top">\n' +
                '<img src="./img/slider-btn-left.svg" alt="">' +
                '                </button>',
            nextArrow: '<button class="slider-btn next top">\n' +
                '<img src="./img/slider-btn-right.svg" alt="">' +
                '                </button>',
            appendArrows: $('.packet-block .slider-wrapper'),
            mobileFirst: true,
            variableWidth: false,
            centerMode: false,
            infinite: false,
            rtl: true,
            responsive: [
                {
                    breakpoint: 768,
                    settings: 'unslick'
                }
            ]
        }
    );

    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    // We listen to the resize event
    window.addEventListener('resize', () => {
        // We execute the same script as before
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });


});