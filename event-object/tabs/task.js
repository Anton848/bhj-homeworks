class Tabs {
    constructor(element) {
        // Находим контейнер для навигации вкладок и для содержимого вкладок
        this.tabsNavigation = element.querySelector('.tab__navigation');
        this.tabContents = element.querySelector('.tab__contents');
        // Получаем все элементы вкладок и их содержимое
        this.tabs = element.querySelectorAll('.tab');
        this.contents = element.querySelectorAll('.tab__content');
        // Регистрируем обработчики событий
        this.registerEvents();
    }

    registerEvents() {
        // Добавляем обработчик клика на навигационную панель вкладок
        this.tabsNavigation.addEventListener('mousedown', this.handleClick.bind(this));
    }

    handleClick(event) {
        // Ищем элемент, на который кликнули, и проверяем, является ли он вкладкой
        const targetTab = event.target.closest('.tab');
        if (!targetTab) return; // Если клик был не по вкладке, выходим

        // Удаляем класс активности у всех вкладок и их содержимого
        this.clearActiveStates();

        // Добавляем класс активности к кликнутой вкладке
        targetTab.classList.add('tab_active');

        // Находим индекс кликнутой вкладки среди всех вкладок
        const activeTabIndex = Array.from(this.tabs).indexOf(targetTab);

        // Добавляем класс активности к соответствующему элементу содержимого
        if (this.contents[activeTabIndex]) {
            this.contents[activeTabIndex].classList.add('tab__content_active');
        }
    }

    clearActiveStates() {
        // Проходим по всем вкладкам и удаляем класс 'tab_active'
        this.tabs.forEach(tab => tab.classList.remove('tab_active'));
        // Проходим по всему содержимому вкладок и удаляем класс 'tab__content_active'
        this.contents.forEach(content => content.classList.remove('tab__content_active'));
    }
}

// Инициализируем все экземпляры класса Tabs для каждого блока с классом 'tabs' на странице
document.addEventListener('DOMContentLoaded', () => {
    const tabElements = document.querySelectorAll('.tabs');
    tabElements.forEach(element => new Tabs(element));
});
