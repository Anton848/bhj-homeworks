// Получаем все элементы, соответствующие выпадающим спискам.
// Используем document.querySelectorAll для получения NodeList всех элементов с классом 'dropdown'.
const dropdowns = document.querySelectorAll('.dropdown');

// Проходимся по каждому найденному выпадающему списку.
dropdowns.forEach(dropdown => {
    // Находим элемент, отображающий текущее выбранное значение.
    const valueDisplay = dropdown.querySelector('.dropdown__value');
    // Находим сам список элементов выпадающего меню.
    const list = dropdown.querySelector('.dropdown__list');
    // Находим все элементы списка (пункты меню).
    const items = dropdown.querySelectorAll('.dropdown__item');

    // Добавляем обработчик события 'click' для элемента, отображающего значение.
    // При клике на него будет переключаться видимость списка.
    valueDisplay.addEventListener('click', () => {
        // Переключаем класс 'dropdown__list_active', который отвечает за отображение списка.
        list.classList.toggle('dropdown__list_active');
    });

    // Добавляем обработчик события 'click' для каждого пункта меню.
    items.forEach(item => {
        item.addEventListener('click', (event) => {
            // Отменяем стандартное поведение ссылки (переход по href).
            event.preventDefault();

            // Находим ссылку внутри пункта меню.
            const link = item.querySelector('.dropdown__link');
            // Получаем текст выбранного пункта меню.
            const selectedText = link.textContent;

            // Устанавливаем новый текст в элемент, отображающий текущее значение.
            valueDisplay.textContent = selectedText;

            // Сворачиваем список, удаляя класс 'dropdown__list_active'.
            list.classList.remove('dropdown__list_active');
        });
    });

    // Дополнительно: сворачиваем список при клике вне самого выпадающего списка.
    document.addEventListener('click', (event) => {
        // Проверяем, был ли клик вне текущего выпадающего списка.
        // Метод closest() проверяет, является ли текущий элемент (event.target)
        // или один из его родителей элементом с классом 'dropdown'.
        if (!event.target.closest('.dropdown')) {
            // Если клик был вне 'dropdown', то скрываем список.
            list.classList.remove('dropdown__list_active');
        }
    });
});
