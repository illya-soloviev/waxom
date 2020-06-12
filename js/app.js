$(function() {
    var header = $("#header"),
        headerHeight = header.innerHeight(),
        scrollPos = $(window).scrollTop(),
        introH = $("#intro").innerHeight();

    checkScroll(scrollPos);
    checkBackTopShow(scrollPos);

    /* Fixed Header */
    $(window).on("scroll", function() {
        scrollPos = $(this).scrollTop();
        checkScroll(scrollPos);
    });

    function checkScroll(scrollPos) {
        if ( scrollPos>0 ) {
            header.addClass("fixed");
        } else {
            header.removeClass("fixed");
        }
    }

    /* Active Nav Toggle */
    $("#nav-toggle").on("click", function(event) {
        event.preventDefault();

        $(this).toggleClass("active");
        $(header).toggleClass("active");
        $("#nav").toggleClass("active");
        $('body').toggleClass('no-scroll');
    });

    /* Smooth Scroll */
    $("[data-scroll]").on("click", function(event) {
        event.preventDefault();

        if( $('body').hasClass('no-scroll') ) {
            $('body').removeClass('no-scroll');
        }

        var blockId = $(this).data('scroll'),
            blockOffset = $(blockId).offset().top;

        $("html, body").animate({
            scrollTop: blockOffset - 75
        }, 500);

        /* Close nav and delete the background of header, when we scroll to the home(intro-section) */
        $("#nav-toggle").removeClass("active");
        $("#nav").removeClass("active");
        $(header).removeClass("active");
    });

    /* Slider */
    $("[data-slider]").slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 990,
                settings: {
                    slidesToShow: 2,
                    arrows: false
                }
            },
            {
                breakpoint: 770,
                settings: {
                    slidesToShow: 1,
                    arrows: false
                }
            }
        ]
    });

    /* Intro Slider */
    $(".slick").slick({
        infinite: true,
        slidesToScroll: 1,
        slidesToScroll: 1,
        dots: true
    });

    /* Filter */
    let filter = $("[data-filter]");

    filter.on("click", function(event) {
        event.preventDefault();

        let $this = $(this);
        let cat = $this.data('filter');

        if ( cat == 'all' ) {
            $("[data-cat]").removeClass('hide');
        } else {
           $("[data-cat]").each(function() {
              let workCat = $(this).data('cat');

               if ( cat != workCat ) {
                   $(this).addClass('hide');
               } else {
                   $(this).removeClass('hide');
               }
           });
        }
    });

     /*Counter*/
    const statBlock = $("#stat");
    let statOffset = Math.ceil(statBlock.offset().top),
        statH = Math.ceil(statBlock.innerHeight());

    let windowH = $(window).height();

    let isViewed = false;
    function startCounterAnimation() {
        if( !isViewed ) {
            $(".stat__num").each(function() {
                $(this).prop('Counter',0).animate({
                    Counter:$(this).text()
                }, {
                    duration: 4000,
                    easing: 'swing',
                    step: function(now) {
                       $(this).text(Math.ceil(now));
                    }
                });
            });

            isViewed = true;
        }
    }

    function watchWindowPosForCounter() {
        scrollPos = $(window).scrollTop();

        windowH = $(window).height();
        windowBorderBottomPos = scrollPos + windowH;

        if( statOffset > scrollPos && ((statOffset + statH) < (scrollPos + windowH)) ) {
            startCounterAnimation();

            $(window).off('scroll', watchWindowPosForCounter);
        }
    }

    $(window).on('scroll', watchWindowPosForCounter);

    /* Anchor Animation */
    $(".anchor").on("click", function(event) {
        event.preventDefault();

        var servId = $(this).data('anch'),
            servPos = $(servId).offset().top;

        $("html, body").animate({
           scrollTop: servPos - 75
        }, 500);
    });

    /* Back Top Show */
    $(window).on("scroll", function() {
        checkBackTopShow(scrollPos);
    });

    function checkBackTopShow(scrollPos) {
        if ( scrollPos>introH - 350 ) {
           $(".back-top").addClass('show');
        } else {
           $(".back-top").removeClass('show');
        }
    }

    /* Click on Back Top */
    $(".back-top").on("click", function(event) {
        event.preventDefault();

        $("html, body").animate({
            scrollTop: 0
        }, 500);
    });

    /* Popup video */
    $('.popup-youtube').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        iframe: {
            markup:  '<div class="mfp-iframe-scaler">'+
                    '<div class="mfp-close"></div>'+
                    '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
                  '</div>',

            patterns: {
                youtube: {
                    index: 'youtube.com/',
                    id: 'v=',
                    src: '//www.youtube.com/watch?v=Rk6_hdRtJOE'
                }
            }
        },

        srcAction: 'iframe_src',

        fixedContentPos: false
    });

});
