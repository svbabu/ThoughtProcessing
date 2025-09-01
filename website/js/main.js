(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // Initiate the wowjs
    new WOW().init();


    // Navbar on scrolling
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.navbar').fadeIn('slow').css('display', 'flex');
        } else {
            $('.navbar').fadeOut('slow').css('display', 'none');
        }
    });


    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();

            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');

            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Typed Initiate
    if ($('.typed-text-output').length == 1) {
        var typed_strings = $('.typed-text').text();
        var typed = new Typed('.typed-text-output', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }


    // Modal Video
    var $videoSrc;
    $('.btn-play').click(function () {
        $videoSrc = $(this).data("src");
    });
    console.log($videoSrc);
    $('#videoModal').on('shown.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
    })
    $('#videoModal').on('hide.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc);
    })


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Skills
    $('.skill').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: true,
        loop: true,
    });


})(jQuery);

//javascript

/*function toggleNote(el) {
const extra = el.nextElementSibling;
if (extra.classList.contains('hidden')) {
extra.classList.remove('hidden');
extra.classList.add('visible');
el.textContent = 'Read less';
} else {
extra.classList.remove('visible');
extra.classList.add('hidden');
el.textContent = 'Read more';
}
}*/
/*function toggleNote(el) {
    const extra = el.nextElementSibling;
    extra.classList.toggle('visible');
    el.textContent = extra.classList.contains('visible') ? 'Read less' : 'Read more';
}*>

/* document.querySelectorAll('.read-more-toggle').forEach(toggle => {
    toggle.addEventListener('click', function () {
        const note = this.closest('.welcome-logo1').querySelector('.extra-note');
        note.classList.toggle('visible');
        this.textContent = note.classList.contains('visible') ? 'Read less' : 'Read more';
    });
});*/
function toggleNote(el) {
    const extra = el.parentElement.nextElementSibling;
    extra.classList.toggle('visible');
    extra.classList.toggle('hidden');
    el.textContent = extra.classList.contains('visible') ? 'Read less' : 'Read more';
}


<!-- test-->
/*<script src="js/typed.js"></script>

document.addEventListener("DOMContentLoaded", function () {
    const typed = new Typed(".typed-text-output", {
        stringsElement: ".typed-text",
        typeSpeed: 50,
        backSpeed: 30,
        loop: true,
        onBegin: function () {
            document.querySelector(".typed-text-output").classList.add("fade-in");
        }
    });
});






console.log("Typed.js script loaded");

new Typed(".typed-text-output", {
    stringsElement: ".typed-text",
    typeSpeed: 50,
    backSpeed: 30,
    loop: true
});

document.querySelector(".typed-text-output").innerHTML = "";*/









