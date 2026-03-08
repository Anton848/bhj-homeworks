// Получаем ссылки на DOM-элементы, куда будем выводить заголовок опроса и его варианты ответов.
const pollTitleElement = document.getElementById('poll__title');
const pollAnswersElement = document.getElementById('poll__answers');

/**
 * Создает DOM-элемент кнопки для варианта ответа.
 * @param {string} answerText - Текст варианта ответа.
 * @returns {HTMLElement} - Созданный элемент button.
 */
function createAnswerButton(answerText) {
  const button = document.createElement('button');
  button.classList.add('poll__answer');
  button.textContent = answerText;

  // Добавляем обработчик события клика на кнопку.
  button.addEventListener('click', () => {
    // При клике выводим диалоговое окно с сообщением.
    alert('Спасибо, ваш голос засчитан!');
    // После голосования можно, например, заблокировать кнопки или очистить их.
    // Для простоты примера, просто выводим сообщение.
  });

  return button;
}

/**
 * Асинхронно загружает данные опроса с сервера и отображает их на странице.
 */
async function loadPoll() {
  try {
    // Отправляем GET-запрос для получения данных опроса.
    const response = await fetch('https://students.netoservices.ru/nestjs-backend/poll');

    // Проверяем, успешен ли ответ сервера.
    if (!response.ok) {
      throw new Error(`Ошибка сети: ${response.status}`);
    }

    // Парсим полученные JSON-данные.
    const data = await response.json();

    // Отображаем заголовок опроса.
    pollTitleElement.textContent = data.data.title;

    // Очищаем предыдущие варианты ответов, если они были (на случай повторной загрузки, хотя по условию это не требуется).
    pollAnswersElement.innerHTML = '';

    // Создаем и добавляем кнопки для каждого варианта ответа.
    data.data.answers.forEach(answer => {
      const answerButton = createAnswerButton(answer);
      pollAnswersElement.appendChild(answerButton);
    });

    // Делаем контейнер с ответами видимым, если он был скрыт.
    pollAnswersElement.classList.add('poll__answers_active');

  } catch (error) {
    console.error('Не удалось загрузить опрос:', error);
    // В случае ошибки, отображаем сообщение пользователю.
    pollTitleElement.textContent = 'Ошибка загрузки опроса.';
    pollAnswersElement.innerHTML = ''; // Очищаем любое содержимое, если оно было.
  }
}

// Вызываем функцию загрузки опроса при загрузке страницы.
loadPoll();
