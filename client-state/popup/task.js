// Получаем ссылки на элементы модального окна и кнопку закрытия
const modal = document.getElementById('subscribe-modal');
const modalCloseButton = document.querySelector('.modal__close_times');

// Функция, которая будет вызвана при закрытии модального окна
function handleModalClose() {
    // Скрываем модальное окно, убирая класс modal_active
    modal.classList.remove('modal_active');
    // Устанавливаем cookie, чтобы запомнить, что окно было закрыто
    // Устанавливаем срок действия cookie на 1 год (365 дней)
    document.cookie = "modalClosed=true; max-age=" + (365 * 24 * 60 * 60);
}

// Функция, которая проверяет наличие cookie и показывает модальное окно, если оно не было закрыто
function checkAndShowModal() {
    // Разбиваем строку document.cookie на массив пар ключ=значение
    const cookies = document.cookie.split(';');
    let modalWasClosed = false;

    // Проходим по всем cookie
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim(); // Убираем пробелы по краям
        // Если находим cookie с названием 'modalClosed' и значением 'true'
        if (cookie.startsWith('modalClosed=true')) {
            modalWasClosed = true;
            break; // Прекращаем поиск, так как нашли нужное
        }
    }

    // Если cookie 'modalClosed=true' отсутствует, показываем модальное окно
    if (!modalWasClosed) {
        modal.classList.add('modal_active');
        // Добавляем обработчик события 'click' на кнопку закрытия
        modalCloseButton.addEventListener('click', handleModalClose);
    }
}

// Вызываем функцию проверки и показа окна при полной загрузке DOM
document.addEventListener('DOMContentLoaded', checkAndShowModal);
