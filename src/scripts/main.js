// Accordeon
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

// Tab