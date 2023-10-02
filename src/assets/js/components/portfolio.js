new Swiper('.swiper-portfolio', {
    slidesPerView: 4,
    loop: true,
    navigation: {
        nextEl: '.portfolio-button-next',
        prevEl: '.portfolio-button-prev',
    },
    autoplay: {
        delay: 5000,
    },
    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 20
        },
        600: {
            slidesPerView: 2,
        },
        990: {
            slidesPerView: 3,
        },
        1170: {
            slidesPerView: 4,
        }
    }
});