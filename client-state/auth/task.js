// Получаем ссылки на элементы DOM
const signinForm = document.getElementById('signin__form');
const signinButton = document.getElementById('signin__btn');
const signinBlock = document.getElementById('signin');
const welcomeBlock = document.getElementById('welcome');
const welcomeUserIdSpan = document.getElementById('user_id');

// URL для отправки POST-запроса
const authUrl = 'https://students.netoservices.ru/nestjs-backend/auth';

// Ключ для локального хранилища
const localStorageUserIdKey = 'userId';

// Функция для отображения сообщения об ошибке
function showErrorMessage(message) {
    alert(message); // Простое оповещение для примера
}

// Функция для обработки успешной авторизации
function handleSuccessfulAuth(userId) {
    // Сохраняем id пользователя в локальное хранилище
    localStorage.setItem(localStorageUserIdKey, userId);

    // Отображаем блок приветствия
    welcomeUserIdSpan.textContent = userId; // Устанавливаем id пользователя
    welcomeBlock.classList.add('welcome_active'); // Показываем блок приветствия

    // Скрываем форму входа
    signinBlock.classList.remove('signin_active');
}

// Функция для обработки входа при загрузке страницы
function checkLoginStatus() {
    // Получаем id пользователя из локального хранилища
    const storedUserId = localStorage.getItem(localStorageUserIdKey);

    // Если id пользователя существует, отображаем блок приветствия
    if (storedUserId) {
        welcomeUserIdSpan.textContent = storedUserId;
        welcomeBlock.classList.add('welcome_active');
        signinBlock.classList.remove('signin_active'); // Скрываем форму входа
    }
}

// Обработчик события отправки формы
signinForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Предотвращаем стандартное поведение отправки формы

    // Собираем данные из формы
    const formData = new FormData(signinForm);

    try {
        // Отправляем POST-запрос на сервер
        const response = await fetch(authUrl, {
            method: 'POST',
            body: formData
        });

        // Парсим JSON-ответ от сервера
        const data = await response.json();

        // Проверяем результат авторизации
        if (data.success) {
            handleSuccessfulAuth(data.user_id); // Обрабатываем успешный вход
        } else {
            showErrorMessage('Неверный логин/пароль'); // Отображаем сообщение об ошибке
        }
    } catch (error) {
        console.error('Ошибка при авторизации:', error);
        showErrorMessage('Произошла ошибка при попытке авторизации. Попробуйте позже.');
    }
});

// При загрузке страницы проверяем статус авторизации
document.addEventListener('DOMContentLoaded', checkLoginStatus);
