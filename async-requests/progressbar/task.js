// Получаем необходимые DOM-элементы.
const form = document.getElementById('form');
const fileInput = document.getElementById('file');
const sendButton = document.getElementById('send');
const progress = document.getElementById('progress');

// Добавляем обработчик события отправки формы.
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Отменяем стандартное поведение формы.

  // Получаем выбранный файл.
  const file = fileInput.files[0];
  if (!file) {
    alert('Пожалуйста, выберите файл для загрузки.');
    return;
  }

  // Создаем объект XMLHttpRequest untuk отправки запроса.
  const xhr = new XMLHttpRequest();

  // Обработчик события для отслеживания прогресса загрузки.
  xhr.upload.addEventListener('progress', (e) => {
    if (e.lengthComputable) {
      // Вычисляем процент загрузки.
      const percentComplete = (e.loaded / e.total) * 100;
      // Обновляем значение прогресс-бара.
      // Значение 'value' у <progress> должно быть от 0 до 1.
      progress.value = percentComplete / 100;
    }
  });

  // Обработчик события завершения запроса (успешного или ошибочного).
  xhr.addEventListener('load', () => {
    // Разблокируем кнопку отправки.
    sendButton.disabled = false;

    if (xhr.status >= 200 && xhr.status < 300) {
      // Если запрос успешен, выводим сообщение.
      alert('Файл успешно загружен!');
      // Сбрасываем поле ввода файла.
      fileInput.value = '';
      // Сбрасываем значение прогресс-бара.
      progress.value = 0;
    } else {
      // Если произошла ошибка, выводим сообщение.
      alert(`Ошибка загрузки: ${xhr.status} ${xhr.statusText}`);
    }
  });

  // Обработчик события ошибки сети.
  xhr.addEventListener('error', () => {
    // Разблокируем кнопку отправки.
    sendButton.disabled = false;
    alert('Произошла ошибка сети.');
    // Сбрасываем прогресс-бар.
    progress.value = 0;
  });

  // Подготавливаем данные для отправки.
  const formData = new FormData();
  formData.append('file', file);

  // Настраиваем и открываем запрос. CORS заголовки устанавливаются автоматически.
  xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/upload', true);
  // Блокируем кнопку отправки во время загрузки.
  sendButton.disabled = true;
  // Отправляем запрос.
  xhr.send(formData);
});

// Обновляем подпись поля "Имя файла..." при выборе файла.
fileInput.addEventListener('change', () => {
  const fileName = fileInput.files.length > 0 ? fileInput.files[0].name : 'Имя файла...';
  document.querySelector('.input__wrapper-desc').textContent = fileName;
});
