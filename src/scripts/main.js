// Accordion index
const accordionTitles = document.querySelectorAll('.accordion__title');
const tabIndicator = document.querySelector("#tab__indicator");

accordionTitles.forEach((accordionTitle) => {
    accordionTitle.addEventListener('click', () => {
        const height = accordionTitle.nextElementSibling.scrollHeight;
        accordionTitle.classList.toggle("accordion__title-active");
        if (accordionTitle.classList.contains('accordion__title-active')) {
            accordionTitle.nextElementSibling.style.maxHeight = `${height}px`;
        } else {
            accordionTitle.nextElementSibling.style.maxHeight = "0px";
        }
    })
})


// Tabs
let tabNavItem = document.querySelectorAll('.tabs__nav-item');
let tabContentItem = document.querySelectorAll('.tabs__content');

tabNavItem.forEach(function (elem) {
    elem.addEventListener('click', activeTab);
})

function activeTab() {
    tabNavItem.forEach(function (elem) {
        elem.classList.remove('active');
    })
    this.classList.add('active');
    let tabName = this.getAttribute('data-tab');

    activeTabContent(tabName);

}

function activeTabContent(tabName) {
    tabContentItem.forEach(function (item) {
        if (item.classList.contains(tabName)) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    })
}

// Slider
// Устанавливаем индекс слайда по умолчанию 
let slideIndex = 1;
showSlides(slideIndex);

// Увеличиваем индекс на 1 — показываем следующий слайд
function nextSlide() {
    showSlides(slideIndex += 1);
}

// Уменьшает индекс на 1 — показываем предыдущий слайд
function previousSlide() {
    showSlides(slideIndex -= 1);
}

// Устанавливаем текущий слайд 
function currentSlide(n) {
    showSlides(slideIndex = n);
}

// Функция перелистывания 
function showSlides(n) {
    let slides = document.getElementsByClassName("slider__item");

    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }

    // Проходим по каждому слайду в цикле for 
    for (let slide of slides) {
        slide.style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
};

// Carousel
const carousel = function () {
    const slides = document.querySelectorAll('.carousel__item');
    const btnLeft = document.querySelector('.carousel__btn--left');
    const btnRight = document.querySelector('.carousel__btn--right');

    let curSlide = 0;
    const maxSlide = slides.length;

    const goToSlide = function (slide) {
        slides.forEach(
            (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
        );
    };

    // Next slide
    const nextSlide = function () {
        if (curSlide === maxSlide - 1) {
            curSlide = 0;
        } else {
            curSlide++;
        }

        goToSlide(curSlide);
    };

    const prevSlide = function () {
        if (curSlide === 0) {
            curSlide = maxSlide - 1;
        } else {
            curSlide--;
        }
        goToSlide(curSlide);
    };

    const init = function () {
        goToSlide(0);
    };
    init();

    // Event handlers
    btnRight.addEventListener('click', nextSlide);
    btnLeft.addEventListener('click', prevSlide);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') prevSlide();
        e.key === 'ArrowRight' && nextSlide();
    });
};
carousel();