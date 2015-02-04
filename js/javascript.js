jQuery(document).ready(function () {
    (function () {
        $('.menu li').click(function (e) {
            e.preventDefault();
            $('.menu li').removeClass('active');
            $(this).addClass('active');
        });

        var offer = $('.offer');
        (function resize() {
            if ($(window).width() <= 750) {

                var currentVisible = 0,
                    count = offer.size(),
                    timeAppear = 700;

                offer.fadeOut(1);
                offer.eq(currentVisible).fadeIn(1);
                offer.unbind('mouseenter');
                offer.unbind('mouseleave');

                $('.triangle-left').click(function () {
                    currentVisible--;
                    if (currentVisible < 0) currentVisible = count - 1;

                    offer.fadeOut(timeAppear);
                    offer.eq(currentVisible).fadeIn(timeAppear);
                });

                $('.triangle-right').click(function () {
                    currentVisible++;
                    if (currentVisible > count - 1) currentVisible = 0;

                    offer.fadeOut(timeAppear);
                    offer.eq(currentVisible).fadeIn(timeAppear);
                });
            }
            else if ($(window).width() >= 751) {
                var timeAnimation = 300,
                    offsetImage = $('img', '.offer').eq(1).css('marginLeft');
                offer.fadeIn(1);

                offer.hover(function () {
                    offer.not(this).stop().animate({"width": "5%"}, timeAnimation);
                    $(this).stop().animate({"width": "90%"}, timeAnimation);
                    $(this).find('img').stop().animate({"marginLeft": "0"}, timeAnimation);
                }, function () {
                    if (!$(this).hasClass('first')) {
                        $(this).find('img').stop().animate({"marginLeft": offsetImage}, timeAnimation);
                    }
                    offer.stop().animate({"width": "33.3%"}, timeAnimation);
                });
            }
        })();


        $('.top').fadeOut();
        $(document).scroll(function () {
            if ($(window).width() > 768) {
                var coordinate = parseInt($(document).scrollTop());
                if (coordinate > 690) {
                    $('.top').fadeIn(1000);
                }
                else {
                    $('.top').fadeOut(200);
                }
            }
        });


        $('.top').click(function () {
            var handler = setTimeout(function run() {
                handler = setTimeout(run, 4);
                (function exec() {
                    var scroll = $(document).scrollTop();
                    if (scroll > 0) {
                        scroll -= 10;
                        $(document).scrollTop(scroll);
                    }
                    else {
                        clearInterval(handler);
                    }
                })();
            }, 4);
        });

        //carousel
        $(window).resize(function () {
            document.location.reload(true);
            window.location.replace(window.location.href);
        });

        (function addEvent() {

            $('.button', '.button-scroll').hover(function () {
                $(this).css({"opacity": "0.65"});
            }, function () {
                $(this).css({"opacity": "1"});
            });

            var size = $('.child').length,
                marginGreed = 20,
                widthGreed = $('.grid_3', '.view').width() + marginGreed,
                widthView = size * widthGreed,
                timeAnimated = 400;

            if ($(window).width() > 768) {
                $('.view').width(widthView);

                var current = 0;
                $('.next').click(function () {
                    var displayBlock = 4,
                        countRest = size - displayBlock,
                        offset;

                    if ((countRest - current) > 0) {
                        if (countRest - current >= displayBlock) {
                            current += displayBlock;
                            offset = 0 - widthGreed;
                            $('.view').stop().animate({"marginLeft": current * offset + "px"}, timeAnimated);
                        }
                        else {
                            current++;
                            offset = 0 - widthGreed;
                            $('.view').stop().animate({"marginLeft": current * offset + "px"}, timeAnimated);
                        }
                    }
                });


                $('.previous').click(function () {
                    var displayBlock = 4,
                        currentState = $('.view').css("marginLeft"),
                        offset;

                    if (current > 0) {
                        if (current >= displayBlock) {
                            offset = parseInt(currentState.slice(0, currentState.indexOf('px'))) + parseInt(widthGreed * displayBlock);
                            $('.view').stop().animate({"marginLeft": offset + "px"}, timeAnimated);
                            current -= displayBlock;
                        }
                        else {
                            offset = parseInt(currentState.slice(0, currentState.indexOf('px'))) + parseInt(widthGreed);
                            $('.view').stop().animate({"marginLeft": offset + "px"}, timeAnimated);
                            current--;
                        }
                    }
                });
            }
            else {
                $('.view').width(widthView);

                var current = 0;
                $('.next').click(function () {
                    var countRest = size - 1,
                        offset;

                    if ((countRest - current) > 0) {
                        current++;
                        offset = 0 - widthGreed;
                        $('.view').stop().animate({"marginLeft": current * offset + "px"}, timeAnimated);
                    }
                });


                $('.previous').click(function () {
                    var currentState = $('.view').css("marginLeft"),
                        offset;

                    if (current > 0) {
                        offset = parseInt(currentState.slice(0, currentState.indexOf('px'))) + parseInt(widthGreed);
                        $('.view').stop().animate({"marginLeft": offset + "px"}, timeAnimated);
                        current--;
                    }
                });
            }
        })();
    }).call(this);
});