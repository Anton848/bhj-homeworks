// Находим элемент textarea по его уникальному идентификатору
const editor = document.getElementById('editor');
// Определяем ключ, под которым будет храниться текст в локальном хранилище
const localStorageKey = 'myTextEditorContent';

// Функция для сохранения содержимого textarea в localStorage
function saveEditorContent() {
  // Получаем текущее значение из textarea
  const currentContent = editor.value;
  // Сохраняем значение в localStorage
  localStorage.setItem(localStorageKey, currentContent);
}

// Функция для загрузки содержимого textarea из localStorage
function loadEditorContent() {
  // Получаем сохраненное содержимое из localStorage
  const savedContent = localStorage.getItem(localStorageKey);
  // Если есть сохраненное содержимое, устанавливаем его как значение textarea
  if (savedContent !== null) {
    editor.value = savedContent;
  }
}

// Добавляем обработчик события 'input' к textarea.
// Это событие срабатывает каждый раз, когда пользователь
// вводит или удаляет текст.
editor.addEventListener('input', saveEditorContent);

// Добавляем обработчик события 'DOMContentLoaded'.
// Это событие срабатывает, когда первоначальный HTML-документ
// был полностью загружен и разобран, без ожидания стилей,
// изображений и подфреймов.
// Мы используем его, чтобы загрузить сохраненный текст при
// первоначальной загрузке страницы.
document.addEventListener('DOMContentLoaded', loadEditorContent);
