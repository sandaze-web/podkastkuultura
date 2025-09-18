//=include ./helpers/elementsNodeList.js
//=include ./helpers/toggleBodyLock.js
//=include ./modules/index.js
document.addEventListener('DOMContentLoaded', function () { // Аналог $(document).ready(function(){
    if (document.querySelector('.studios-box')) {
        document.querySelectorAll('.studios-box').forEach(block => {
            const sliderEl = block.querySelector('.studios-slider');
            const navEl = block.querySelector('.studios-nav');

            // считаем количество слайдов и задаём переменную
            const slides = sliderEl.querySelectorAll('.swiper-slide');
            sliderEl.style.setProperty('--slides-count', slides.length);

            // создаём навигационный слайдер
            const navSwiper = new Swiper(navEl, {
                slidesPerView: 'auto',
                slideToClickedSlide: true,
                allowTouchMove: false,
            });

            // создаём основной слайдер
            const mainSwiper = new Swiper(sliderEl, {
                effect: window.innerWidth >= 760 && 'fade',
                fadeEffect: {crossFade: true},
                allowTouchMove: false,
                speed: 2000,
                slidesPerView: 1,
                thumbs: {
                    swiper: navSwiper,
                },
                breakpoints: {
                    320: {
                        thumbs: false, // отключаем превью
                        allowTouchMove: true, // свайп
                        effect: 'slide', // дефолт
                        spaceBetween: 10, // дефолтное расстояние
                        loop: true, // стандартный цикл
                        speed: 300, // стандартная скорость
                        fadeEffect: { crossFade: false }, // отключаем fade
                        pagination: {
                            el: sliderEl.querySelector('.studios-pagination'),
                            type: 'bullets',
                            clickable: true, // обязательно, чтобы точки работали
                        },
                    },
                    761: {
                        thumbs: {
                            swiper: navSwiper,
                        },
                    }
                }
            });
        });
    }

    if(document.querySelector('.examples')) {
        const examples = new Swiper('.examples-slider', {
            slidesPerView: 2,
            spaceBetween: 30,
            navigation: {
                nextEl: '.examples__arrow.next',
                prevEl: '.examples__arrow.prev',
            },
            breakpoints: {
                320: {
                    slidesPerView: 1.1,
                    spaceBetween: 16,
                    pagination: {
                        el: document.querySelector('.examples .examples-pagination'),
                        type: 'bullets',
                    },
                    dots: true,
                },
                760: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                }
            }
        });
    }
    if(document.querySelector('.team')) {
        const team = new Swiper('.team-box', {
            slidesPerView: 3,
            spaceBetween: 8,
            navigation: {
                nextEl: '.team__arrow.next',
                prevEl: '.team__arrow.prev',
            },
            breakpoints: {
                320: {
                    slidesPerView: 1.1,
                    spaceBetween: 16,
                    pagination: {
                        el: document.querySelector('.team .team-pagination'),
                        type: 'bullets',
                    },
                    dots: true,
                },
                760: {
                    slidesPerView: 3,
                    spaceBetween: 8,
                }
            }
        });
    }

    if(document.getElementById('map')){
        let addr = $('.js-map').data('addr'),
            x = $(".js-map").data('x'),
            y = $(".js-map").data('y')

        ymaps.ready(init);

        function init() {
            var Map = new ymaps.Map("map", {
                center: [x, y],
                zoom: 10,
                controls: [
                    'zoomControl',
                    'rulerControl',
                    'routeButtonControl',
                ]
            });

            let mark = new ymaps.Placemark([x, y], {
                hint: 'Сервисный центр ',
                balloonContent: addr,
            });

            Map.geoObjects.add(mark);
        }
    }

    if (document.querySelector('.phone')) {
        $('.phone').mask("+7 (999) 999 99-99")
    }

    if(document.querySelector('.info')) {
        let infoSliders = document.querySelectorAll('.info-slider');

        infoSliders.forEach(slider => {
            const infoSwiper = new Swiper(slider, {
                slidesPerView: 1,
                dots: true,
                navigation: {
                    nextEl: slider.closest('section').querySelector('.info__arrow.next'),
                    prevEl: slider.closest('section').querySelector('.info__arrow.prev'),
                },
                pagination: {
                    el: slider.closest('section').querySelector('.info__pagination'),
                    type: 'bullets',
                },

            });
        })
    }

    if(document.querySelector('.geo')) {
        const videos = document.querySelectorAll('.geo__item-video video');
        videos.forEach(video => {
            const player = new Plyr(video);
        })
    }
});


// Паралакс мышей ========================================================================================
// const mousePrlx = new MousePRLX({})
// =======================================================================================================

// Фиксированный header ==================================================================================
headerFixed()
// =======================================================================================================

// Использование аккордиона ==================================================================================
initAccordion('faq__item', 'faq__item-answer', (item, content) => {
    document.querySelectorAll('.faq__item').forEach(el => {
        if(el.classList.contains('active')) { el.classList.remove('active')}
    });
    item.classList.toggle('active')
    content.classList.toggle('active')
})
// Использование аккордиона ==================================================================================
initAccordion('requisites-titleBx', 'requisites__items', (item, content) => {
    item.classList.toggle('active')
    content.classList.toggle('active')
})

// img.svg в <svg> ==================================================================================
imgToSvg()
// =======================================================================================================


// togglePopupWindows()
// =======================================================================================================
