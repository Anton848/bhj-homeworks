class BookReader {
    constructor(element) {
        // Находим контейнер для настроек (размер шрифта, цвет)
        this.controlsContainer = element.querySelector('.book__controls');
        // Находим основной контент книги
        this.bookContent = element;
        // Находим все элементы управления размером шрифта
        this.fontSizeControls = this.controlsContainer.querySelectorAll('.font-size');

        // Регистрируем обработчики событий
        this.registerEvents();
    }

    registerEvents() {
        // Добавляем обработчик клика на контейнер с настройками
        this.controlsContainer.addEventListener('click', (event) => {
            const target = event.target;

            // Проверяем, был ли клик по элементу управления размером шрифта
            if (target.classList.contains('font-size')) {
                event.preventDefault(); // Предотвращаем переход по ссылке
                this.changeFontSize(target);
            }
        });
    }

    changeFontSize(clickedControl) {
        // Удаляем класс 'font-size_active' у всех кнопок размера шрифта
        this.fontSizeControls.forEach(control => control.classList.remove('font-size_active'));

        // Добавляем класс 'font-size_active' к нажатой кнопке
        clickedControl.classList.add('font-size_active');

        // Удаляем предыдущие классы размера шрифта с контейнера книги
        this.bookContent.classList.remove('book_fs-small', 'book_fs-big');

        // Добавляем новый класс размера шрифта, если он указан в data-size
        if (clickedControl.dataset.size === 'small') {
            this.bookContent.classList.add('book_fs-small');
        } else if (clickedControl.dataset.size === 'big') {
            this.bookContent.classList.add('book_fs-big');
        }
    }
}

// Инициализация читалки при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
    const bookElement = document.getElementById('book');
    if (bookElement) {
        new BookReader(bookElement);
    }
});
