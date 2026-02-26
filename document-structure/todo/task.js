// Получаем ссылки на DOM-элементы
const tasksList = document.getElementById('tasks__list');
const taskForm = document.getElementById('tasks__form');
const taskInput = document.getElementById('task__input');

// Функция для создания новой задачи
function createTaskElement(taskTitle) {
    // Создаем контейнер для задачи
    const taskElement = document.createElement('div');
    taskElement.classList.add('task'); // Добавляем класс .task

    // Создаем элемент заголовка задачи
    const titleElement = document.createElement('div');
    titleElement.classList.add('task__title');
    titleElement.textContent = taskTitle; // Устанавливаем текст задачи

    // Создаем элемент для удаления задачи (ссылка)
    const removeElement = document.createElement('a');
    removeElement.classList.add('task__remove');
    removeElement.setAttribute('href', '#'); // Делаем ссылку кликабельной
    removeElement.innerHTML = '×'; // Символ крестика (×)

    // Добавляем заголовок и кнопку удаления в контейнер задачи
    taskElement.appendChild(titleElement);
    taskElement.appendChild(removeElement);

    return taskElement;
}

// Функция для добавления задачи
function addTask(event) {
    event.preventDefault(); // Предотвращаем стандартное поведение формы (перезагрузку страницы)

    const taskText = taskInput.value.trim(); // Получаем текст из поля ввода, удаляя лишние пробелы

    if (taskText) { // Если поле ввода не пустое
        const newTask = createTaskElement(taskText); // Создаем элемент задачи
        tasksList.appendChild(newTask); // Добавляем задачу в список
        taskInput.value = ''; // Очищаем поле ввода
    }
}

// Функция для удаления задачи
function removeTask(event) {
    // Проверяем, был ли клик именно по кнопке удаления
    if (event.target.classList.contains('task__remove')) {
        event.preventDefault(); // Предотвращаем переход по ссылке
        const taskToRemove = event.target.closest('.task'); // Находим ближайший родительский элемент с классом .task
        taskToRemove.remove(); // Удаляем задачу из DOM
    }
}

// Добавляем обработчик события для формы (добавление задачи)
taskForm.addEventListener('submit', addTask);

// Добавляем один обработчик события для всего списка задач (удаление задач)
// Это позволяет обрабатывать клики по кнопкам удаления даже для динамически добавляемых задач
tasksList.addEventListener('click', removeTask);
