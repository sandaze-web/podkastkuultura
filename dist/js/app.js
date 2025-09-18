const html = document.documentElement
const body = document.body
const pageWrapper = document.querySelector('.main')
const header = document.querySelector('.header')
const firstScreen = document.querySelector('[data-observ]')
const burgerButton = document.querySelector('.icon-menu')
const menu = document.querySelector('.menu')
const lockPaddingElements = document.querySelectorAll('[data-lp]')


const toggleBodyLock = (isLock) => {
  FLS(`Попап ${isLock ? 'открыт' : 'закрыт'}`)
  const lockPaddingValue = window.innerWidth - pageWrapper.offsetWidth

  setTimeout(() => {
    if (lockPaddingElements) {
      lockPaddingElements.forEach((element) => {
        element.style.paddingRight = isLock ? `${lockPaddingValue}px` : '0px'
      })
    }
  
    body.style.paddingRight = isLock ? `${lockPaddingValue}px` : '0px'
    body.classList.toggle('lock', isLock)
  }, isLock ? 0 : 500)
}
 // logger (Full Logging System) =================================================================================================================
function FLS(message) {
  setTimeout(() => (window.FLS ? console.log(message) : null), 0)
}

// Проверка браузера на поддержку .webp изображений =================================================================================================================
function isWebp() {
  // Проверка поддержки webp
  const testWebp = (callback) => {
    const webP = new Image()

    webP.onload = webP.onerror = () => callback(webP.height === 2)
    webP.src =
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
  }
  // Добавление класса _webp или _no-webp для HTML
  testWebp((support) => {
    const className = support ? 'webp' : 'no-webp'
    html.classList.add(className)

    FLS(support ? 'webp поддерживается' : 'webp не поддерживается')
  })
}

/* Проверка мобильного браузера */
const isMobile = {
  Android: () => navigator.userAgent.match(/Android/i),
  BlackBerry: () => navigator.userAgent.match(/BlackBerry/i),
  iOS: () => navigator.userAgent.match(/iPhone|iPad|iPod/i),
  Opera: () => navigator.userAgent.match(/Opera Mini/i),
  Windows: () => navigator.userAgent.match(/IEMobile/i),
  any: () =>
    isMobile.Android() ||
    isMobile.BlackBerry() ||
    isMobile.iOS() ||
    isMobile.Opera() ||
    isMobile.Windows(),
}
/* Добавление класса touch для HTML если браузер мобильный */
function addTouchClass() {
  // Добавление класса _touch для HTML если браузер мобильный
  if (isMobile.any()) {
    html.classList.add('touch')
  }
}

// Добавление loaded для HTML после полной загрузки страницы
function addLoadedClass() {
  window.addEventListener('load', () => {
    setTimeout(() => {
      html.classList.add('loaded')
    }, 0)
  })
}

// Получение хеша в адресе сайта
const getHash = () => {
  if (location.hash) {
    return location.hash.replace('#', '')
  }
}

// Указание хеша в адресе сайта
function setHash(hash) {
  hash = hash ? `#${hash}` : window.location.href.split('#')[0]
  history.pushState('', '', hash)
}

// Функция для фиксированной шапки при скролле =================================================================================================================
function headerFixed() {
  const headerStickyObserver = new IntersectionObserver(([entry]) => {
    header.classList.toggle('sticky', !entry.isIntersecting)
  })

  if (firstScreen) {
    headerStickyObserver.observe(firstScreen)
  }
}

// Аккордион =================================================================================================================
function initAccordion(toggleClass, contentClass, toggleActiveClass = (item, content) => {}) {
  const toggles = document.querySelectorAll(`.${toggleClass}`);

  toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const content = toggle.querySelector(`.${contentClass}`);
      if (content.classList.contains(contentClass)) {
        // Проверяем, раскрыт ли контент
        if (content.style.maxHeight) {
          // Скрываем контент
          content.style.maxHeight = null;

          toggleActiveClass(toggle, content)
        } else {
          // Скрываем все остальные контенты
          document.querySelectorAll(`.${contentClass}`).forEach(item => {
            item.style.maxHeight = null;
          });

          // Раскрываем текущий контент
          content.style.maxHeight = content.scrollHeight + "px";

          toggleActiveClass(toggle, content)
        }
      }
    });
  });
}

// Из img.svg в <svg> Все img.svg внутри класса svg конвертируются в svg =======================================================================================================================================================================================================================
function imgToSvg () {
  $('.svg img').each(function () {
    let $img = $(this);
    let imgID = $img.attr('id');
    let imgClass = $img.attr('class');
    let imgURL = $img.attr('src');

    $.get(imgURL, function (data) {
      // Get the SVG tag, ignore the rest
      let $svg = $(data).find('svg');

      // Add replaced image's ID to the new SVG
      if (typeof imgID !== 'undefined') {
        $svg = $svg.attr('id', imgID);
      }
      // Add replaced image's classes to the new SVG
      if (typeof imgClass !== 'undefined') {
        $svg = $svg.attr('class', imgClass + ' replaced-svg');
      }

      // Remove any invalid XML tags as per http://validator.w3.org
      $svg = $svg.removeAttr('xmlns:a');

      // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
      if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
        $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
      }

      // Replace image with new SVG
      $img.replaceWith($svg);

    }, 'xml');

  });
}

// Универсальная функция для открытия и закрытия попапо =================================================================================================================
const togglePopupWindows = () => {
  document.addEventListener('click', ({ target }) => {
    if (target.closest('[data-type]')) {
      const popup = document.querySelector(
        `[data-popup="${target.dataset.type}"]`
      )

      if (document.querySelector('._is-open')) {
        document.querySelectorAll('._is-open').forEach((modal) => {
          modal.classList.remove('_is-open')
        })
      }

      popup.classList.add('_is-open')
      toggleBodyLock(true)
    }

    if (
      target.classList.contains('_overlay-bg') ||
      target.closest('.button-close')
    ) {
      const popup = target.closest('._overlay-bg')

      popup.classList.remove('_is-open')
      toggleBodyLock(false)
    }
  })
}

// Модуль работы с меню (бургер) =======================================================================================================================================================================================================================
const menuInit = () => {
  if (burgerButton) {
    document.addEventListener('click', ({ target }) => {
      if (target.closest('.icon-menu')) {
        html.classList.toggle('menu-open')
        toggleBodyLock(html.classList.contains('menu-open'))
      }
    })
  }
}
const menuOpen = () => {
  toggleBodyLock(true)
  html.classList.add('menu-open')
}
const menuClose = () => {
  toggleBodyLock(false)
  html.classList.remove('menu-open')
}

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
