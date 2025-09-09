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
                effect: 'fade',
                fadeEffect: {crossFade: true},
                allowTouchMove: false,
                speed: 2000,
                slidesPerView: 1,
                thumbs: {
                    swiper: navSwiper,
                },
            });
        });
    }
});


// Паралакс мышей ========================================================================================
// const mousePrlx = new MousePRLX({})
// =======================================================================================================

// Фиксированный header ==================================================================================
headerFixed()
// =======================================================================================================

// Использование аккордиона ==================================================================================
// initAccordion('faq__item', 'faq__item-answer', (item, content) => {
//     item.classList.toggle('active')
//     content.classList.toggle('active')
// })

// img.svg в <svg> ==================================================================================
// imgToSvg()
// =======================================================================================================


// togglePopupWindows()
// =======================================================================================================
