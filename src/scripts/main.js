window.onload = function () {
  // Mobile Menu
  const navIcon = document.querySelector(".nav-icon");
  const pageBody = document.body;

  navIcon.addEventListener("click", function () {
    document
      .querySelector(".nav-icon__middle, .nav-icon__middle-black")
      .classList.toggle("nav-icon-active");
    document
      .querySelector(".header__nav-mobile")
      .classList.toggle("header__nav-mobile--active");
    pageBody.classList.toggle("locked");
  });

  // form placeholder
  const formItems = document.querySelectorAll(".form-item__field");

  for (let item of formItems) {
    const thisParent = item.closest(".form-item");
    const thisPlaceholder = thisParent.querySelector(".form-item__placeholder");
    // Если инпут в фокусе
    item.addEventListener("focus", function () {
      thisPlaceholder.classList.add("active");
    });

    // Если инпут теряет фокус
    item.addEventListener("blur", function () {
      if (item.value.length > 0) {
        thisPlaceholder.classList.add("active");
      } else {
        thisPlaceholder.classList.remove("active");
      }
    });
  }
  // Atttach files
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
        uploadText.innerText = uploadFile.value.match(
          /[\/\\]([\w\d\s\.\-(\)]+)$/
        )[1];
      } else {
        uploadText.innerText = "Файл не выбран";
      }
    });
  }

  // Preloader
  let preloader = document.getElementById("preloader");
  preloader.style.display = "none";

  // pop-up
  let popupBg = document.querySelector("#popup__bg");
  let popup = document.querySelector(".popup");
  let openPopupButtons = document.querySelectorAll("#popup__open");
  let closePopupButton = document.querySelector(".popup__close");
  let body = document.querySelector("body");

  openPopupButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      popupBg.classList.add("active");
      popup.classList.add("popup__active");
      body.classList.add("locked");
    });
  });
  closePopupButton.addEventListener("click", () => {
    popupBg.classList.remove("active");
    popup.classList.remove("popup__active");
    body.classList.remove("locked");
  });
  document.addEventListener("click", (e) => {
    if (e.target === popupBg) {
      popupBg.classList.remove("active");
      popup.classList.remove("popup__active");
      body.classList.remove("locked");
    }
  });

  // Accordion index
  const accordionTitles = document.querySelectorAll(".accordion__title");
  const tabIndicator = document.querySelector("#tab__indicator");

  accordionTitles.forEach((accordionTitle) => {
    accordionTitle.addEventListener("click", () => {
      const height = accordionTitle.nextElementSibling.scrollHeight;
      accordionTitle.classList.toggle("accordion__title-active");
      if (accordionTitle.classList.contains("accordion__title-active")) {
        accordionTitle.nextElementSibling.style.maxHeight = `${height}px`;
      } else {
        accordionTitle.nextElementSibling.style.maxHeight = "0px";
      }
    });
  });

  // Tabs
  let tabNavItem = document.querySelectorAll(".tabs__nav-item");
  let tabContentItem = document.querySelectorAll(".tabs__content");

  tabNavItem.forEach(function (elem) {
    elem.addEventListener("click", activeTab);
  });

  function activeTab() {
    tabNavItem.forEach(function (elem) {
      elem.classList.remove("active");
    });
    this.classList.add("active");
    let tabName = this.getAttribute("data-tab");

    activeTabContent(tabName);
  }

  function activeTabContent(tabName) {
    tabContentItem.forEach(function (item) {
      if (item.classList.contains(tabName)) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }

  // Carousel
  const carouselImages = document.querySelectorAll(".carousel__item");
  const carouselLine = document.querySelector(".carousel__line");
  const carouselDots = document.querySelectorAll(".carousel__dot");
  const carouselBtnNext = document.querySelector(".carousel__arrow-next");
  const carouselBtnPrev = document.querySelector(".carousel__arrow-prev");

  let carouselCount = 0;
  let carouselWidth;

  // Адаптивность слайдера
  window.addEventListener("resize", showCarousel);

  // Кнопки слайдов вперед и назад
  carouselBtnNext.addEventListener("click", nextBtn);
  carouselBtnPrev.addEventListener("click", prevBtn);

  function showCarousel() {
    carouselWidth = document.querySelector(".carousel__wrapper").offsetWidth;
    carouselLine.style.width = carouselWidth * carouselImages.length + "px";
    carouselImages.forEach((item) => (item.style.width = carouselWidth + "px"));

    rollcarousel();
  }

  showCarousel();

  // Перелистывает слад вперед
  function nextBtn() {
    carouselCount++;
    if (carouselCount >= carouselImages.length) carouselCount = 0;

    rollcarousel();
    thisCarousel(carouselCount);
  }

  // Перелистывает слад назад
  function prevBtn() {
    carouselCount--;
    if (carouselCount < 0) carouselCount = carouselImages.length - 1;

    rollcarousel();
    thisCarousel(carouselCount);
  }

  // Задает шаг перемещения сладов
  function rollcarousel() {
    carouselLine.style.transform = `translateX(${
      -carouselCount * carouselWidth
    }px)`;
  }

  // Указывает какой слайд по счету активен

  function thisCarousel(index) {
    carouselDots.forEach((item) =>
      item.classList.remove("carousel__dot-active")
    );
    carouselDots[index].classList.add("carousel__dot-active");
  }

  // Вешаем клик на dot
  carouselDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      carouselCount = index;
      rollcarousel();
      thisCarousel(carouselCount);
    });
  });

  // Slider
  const sliderImages = document.querySelectorAll(".slider__item");
  const sliderLine = document.querySelector(".slider__line");
  const sliderDots = document.querySelectorAll(".slider__dot");
  const sliderBtnNext = document.querySelector(".slider__arrow-next");
  const sliderBtnPrev = document.querySelector(".slider__arrow-prev");

  let sliderCount = 0;
  let sliderWidth;

  // Адаптивность слайдера
  window.addEventListener("resize", showSlide);

  // Кнопки слайдов вперед и назад
  sliderBtnNext.addEventListener("click", nextSlide);
  sliderBtnPrev.addEventListener("click", prevSlide);

  function showSlide() {
    sliderWidth = document.querySelector(".slider__wrapper").offsetWidth;
    sliderLine.style.width = sliderWidth * sliderImages.length + "px";
    sliderImages.forEach((item) => (item.style.width = sliderWidth + "px"));

    rollSlider();
  }

  showSlide();

  // Перелистывает слад вперед
  function nextSlide() {
    sliderCount++;
    if (sliderCount >= sliderImages.length) sliderCount = 0;

    rollSlider();
    thisSlide(sliderCount);
  }

  // Перелистывает слад назад
  function prevSlide() {
    sliderCount--;
    if (sliderCount < 0) sliderCount = sliderImages.length - 1;

    rollSlider();
    thisSlide(sliderCount);
  }

  // Задает шаг перемещения сладов
  function rollSlider() {
    sliderLine.style.transform = `translateX(${-sliderCount * sliderWidth}px)`;
  }

  // Указывает какой слайд по счету активен

  function thisSlide(index) {
    sliderDots.forEach((item) => item.classList.remove("slider__dot-active"));
    sliderDots[index].classList.add("slider__dot-active");
  }

  // Вешаем клик на dot
  sliderDots.forEach(function (dot, index) {
    dot.addEventListener("click", function () {
      sliderCount = index;
      rollSlider();
      thisSlide(sliderCount);
    });
  });
};
