// form placeholder
const formItems = document.querySelectorAll('.form-item__field');

for (let item of formItems) {
    const thisParent = item.closest('.form-item');
    const thisPlaceholder = thisParent.querySelector('.form-item__placeholder');
    // Если инпут в фокусе
    item.addEventListener('focus', function () {
        thisPlaceholder.classList.add('active');
    });

    // Если инпут теряет фокус
    item.addEventListener('blur', function () {
        if (item.value.length > 0) {
            thisPlaceholder.classList.add('active');
        } else {
            thisPlaceholder.classList.remove('active');
        }
    })
};
// Atttach files
window.onload = () => {
    const uploadFile = document.getElementById("form__upload-file");
    const uploadBtn = document.getElementById("form__upload-btn");
    const uploadText = document.getElementById("form__upload-text");

    // Иммитируем нажатие по нашей скрытой кнопке закгрузке файлов
    if (uploadBtn) {
        uploadBtn.addEventListener("click", function () {
            uploadFile.click();
        });
    }
    // Добавляем событие загрузки файла
    if (uploadFile) {
        uploadFile.addEventListener("change", function () {
            if (uploadFile.value) {
                uploadText.innerText = uploadFile.value.match(/[\/\\]([\w\d\s\.\-(\)]+)$/)[1];
            } else {
                uploadText.innerText = "Файл не выбран";
            }
        });
    }
};

// pop-up
let popupBg = document.querySelector('#popup__bg');
let popup = document.querySelector('.popup');
let openPopupButtons = document.querySelectorAll('#popup__open');
let closePopupButton = document.querySelector('.popup__close');
let body = document.querySelector('body');


openPopupButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        popupBg.classList.add('active');
        popup.classList.add('popup__active');
        body.classList.add('locked');
    })
});
closePopupButton.addEventListener('click', () => {
    popupBg.classList.remove('active');
    popup.classList.remove('popup__active');
    body.classList.remove('locked');
});
document.addEventListener('click', (e) => {
    if (e.target === popupBg) {
        popupBg.classList.remove('active');
        popup.classList.remove('popup__active');
        body.classList.remove('locked');
    }
});

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
});


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
};

// Slider
let slider = document.getElementById('slider'),
    sliderItems = document.getElementById('slides'),
    prev = document.getElementById('prev'),
    next = document.getElementById('next');

function slide(wrapper, items, prev, next) {
    let posX1 = 0,
        posX2 = 0,
        posInitial,
        posFinal,
        threshold = 100,
        slides = items.getElementsByClassName('slider__item'),
        slidesLength = slides.length,
        slideSize = items.getElementsByClassName('slider__item')[0].offsetWidth,
        firstSlide = slides[0],
        lastSlide = slides[slidesLength - 1],
        cloneFirst = firstSlide.cloneNode(true),
        cloneLast = lastSlide.cloneNode(true),
        index = 0,
        allowShift = true;

    // Clone first and last slide
    items.appendChild(cloneFirst);
    items.insertBefore(cloneLast, firstSlide);
    wrapper.classList.add('loaded');

    // Mouse events
    items.onmousedown = dragStart;

    // Touch events
    items.addEventListener('touchstart', dragStart);
    items.addEventListener('touchend', dragEnd);
    items.addEventListener('touchmove', dragAction);

    // Click events
    prev.addEventListener('click', function () {
        shiftSlide(-1)
    });
    next.addEventListener('click', function () {
        shiftSlide(1)
    });

    // Transition events
    items.addEventListener('transitionend', checkIndex);

    function dragStart(e) {
        e = e || window.event;
        e.preventDefault();
        posInitial = items.offsetLeft;

        if (e.type == 'touchstart') {
            posX1 = e.touches[0].clientX;
        } else {
            posX1 = e.clientX;
            document.onmouseup = dragEnd;
            document.onmousemove = dragAction;
        }
    }

    function dragAction(e) {
        e = e || window.event;

        if (e.type == 'touchmove') {
            posX2 = posX1 - e.touches[0].clientX;
            posX1 = e.touches[0].clientX;
        } else {
            posX2 = posX1 - e.clientX;
            posX1 = e.clientX;
        }
        items.style.left = (items.offsetLeft - posX2) + "px";
    }

    function dragEnd(e) {
        posFinal = items.offsetLeft;
        if (posFinal - posInitial < -threshold) {
            shiftSlide(1, 'drag');
        } else if (posFinal - posInitial > threshold) {
            shiftSlide(-1, 'drag');
        } else {
            items.style.left = (posInitial) + "px";
        }

        document.onmouseup = null;
        document.onmousemove = null;
    }

    function shiftSlide(dir, action) {
        items.classList.add('shifting');

        if (allowShift) {
            if (!action) {
                posInitial = items.offsetLeft;
            }

            if (dir == 1) {
                items.style.left = (posInitial - slideSize) + "px";
                index++;
            } else if (dir == -1) {
                items.style.left = (posInitial + slideSize) + "px";
                index--;
            }
        };

        allowShift = false;
    }

    function checkIndex() {
        items.classList.remove('shifting');

        if (index == -1) {
            items.style.left = -(slidesLength * slideSize) + "px";
            index = slidesLength - 1;
        }

        if (index == slidesLength) {
            items.style.left = -(1 * slideSize) + "px";
            index = 0;
        }

        allowShift = true;
    }
}
slide(slider, sliderItems, prev, next);

// Carousel

// Select the carousel you'll need to manipulate and the buttons you'll add events to
const carousel = document.querySelector("[data-target='carousel']");
const card = carousel.querySelector("[data-target='card']");
const leftButton = document.querySelector("[data-action='carouselLeft']");
const rightButton = document.querySelector("[data-action='carouselRight']");

// Prepare to limit the direction in which the carousel can slide, 
// and to control how much the carousel advances by each time.
// In order to slide the carousel so that only three cards are perfectly visible each time,
// you need to know the carousel width, and the margin placed on a given card in the carousel
const carouselWidth = carousel.offsetWidth;
const cardStyle = card.currentStyle || window.getComputedStyle(card)
const cardMarginRight = Number(cardStyle.marginRight.match(/\d+/g)[0]);

// Count the number of total cards you have
const cardCount = carousel.querySelectorAll("[data-target='card']").length;

// Define an offset property to dynamically update by clicking the button controls
// as well as a maxX property so the carousel knows when to stop at the upper limit
let offset = 0;
const maxX = -((cardCount / 3) * carouselWidth +
    (cardMarginRight * (cardCount / 3)) -
    carouselWidth - cardMarginRight);


// Add the click events
leftButton.addEventListener("click", function () {
    if (offset !== 0) {
        offset += carouselWidth + cardMarginRight;
        carousel.style.transform = `translateX(${offset}px)`;
    }
})

rightButton.addEventListener("click", function () {
    if (offset !== maxX) {
        offset -= carouselWidth + cardMarginRight;
        carousel.style.transform = `translateX(${offset}px)`;
    }
})