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