// Получаем все элементы, которые должны появляться при прокрутке
const revealElements = document.querySelectorAll('.reveal');

// Функция, которая проверяет, находится ли элемент в видимой области
const checkVisibility = () => {
    // Получаем высоту окна просмотра
    const windowHeight = window.innerHeight;

    // Проходим по каждому элементу, который должен появляться
    revealElements.forEach(element => {
        // Получаем позицию элемента относительно окна просмотра
        const elementRect = element.getBoundingClientRect();

        // Проверяем, находится ли верхняя граница элемента в пределах видимой области
        // elementRect.top < windowHeight означает, что верхняя граница элемента находится ниже верхней границы окна
        // elementRect.bottom > 0 означает, что нижняя граница элемента находится ниже верхней границы окна (т.е. элемент не полностью выше окна)
        if (elementRect.top < windowHeight && elementRect.bottom > 0) {
            // Если элемент в видимой области, добавляем класс, который его отобразит
            element.classList.add('reveal_active');
        } else {
            // Если элемент вне видимой области, удаляем класс, чтобы он снова скрылся (поведение по умолчанию)
            // Это полезно, если пользователь прокручивает вверх
            element.classList.remove('reveal_active');
        }
    });
};

// Добавляем обработчик события прокрутки окна
window.addEventListener('scroll', checkVisibility);

// Также проверяем видимость элементов при загрузке страницы,
// на случай, если какой-то элемент изначально находится в видимой области
document.addEventListener('DOMContentLoaded', checkVisibility);
