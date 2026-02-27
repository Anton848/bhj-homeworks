// Получаем ссылки на DOM-элементы
const tasksList = document.getElementById('tasks__list');
const taskForm = document.getElementById('tasks__form');
const taskInput = document.getElementById('task__input');

// Функция для отрисовки списка задач
function renderTasks() {
    // Получаем сохраненные задачи из localStorage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasksList.innerHTML = ''; // Очищаем текущий список

    // Создаем и добавляем новые задачи
    tasks.forEach(task => {
        tasksList.insertAdjacentHTML('afterbegin', `
            <div class="task" data-id="${task.id}">
                <div class="task__title">${task.title}</div>
                <a href="#" class="task__remove">×</a>
            </div>
        `);
    });
}

// Функция для добавления новой задачи
function addTask(title) {
    // Получаем текущие задачи или пустой массив
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    // Генерируем уникальный ID для новой задачи
    const newTask = {
        id: Date.now(), // Простой, но эффективный способ генерации ID
        title: title
    };
    // Добавляем новую задачу в массив
    tasks.push(newTask);
    // Сохраняем обновленный список задач в localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
    // Перерисовываем список задач
    renderTasks();
}

// Обработчик отправки формы
taskForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Предотвращаем стандартное поведение формы
    const taskTitle = taskInput.value.trim(); // Получаем текст задачи, убирая пробелы

    if (taskTitle) { // Если текст не пустой
        addTask(taskTitle); // Добавляем задачу
        taskInput.value = ''; // Очищаем поле ввода
    }
});

// Обработчик кликов по списку задач (для удаления)
tasksList.addEventListener('click', (e) => {
    // Проверяем, был ли клик по кнопке удаления
    if (e.target.classList.contains('task__remove')) {
        e.preventDefault(); // Предотвращаем переход по ссылке
        const taskElement = e.target.closest('.task'); // Находим родительский элемент задачи
        const taskId = taskElement.dataset.id; // Получаем ID задачи

        // Получаем текущие задачи
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        // Фильтруем задачи, оставляя только те, ID которых не совпадает с удаляемой
        tasks = tasks.filter(task => task.id !== Number(taskId));
        // Сохраняем обновленный список
        localStorage.setItem('tasks', JSON.stringify(tasks));
        // Перерисовываем список
        renderTasks();
    }
});

// При загрузке страницы отрисовываем все сохраненные задачи
document.addEventListener('DOMContentLoaded', renderTasks);
