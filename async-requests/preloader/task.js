// Получаем ссылки на DOM-элементы
const itemsContainer = document.getElementById('items');
const loader = document.getElementById('loader');

/**
 * Показывает анимацию загрузки, добавляя соответствующий класс элементу.
 */
function showLoader() {
  loader.classList.add('loader_active');
}

/**
 * Скрывает анимацию загрузки, удаляя соответствующий класс у элемента.
 */
function hideLoader() {
  loader.classList.remove('loader_active');
}

/**
 * Создает DOM-элемент, представляющий курс одной валюты.
 * @param {string} currencyCode - Символьный код валюты (например, 'USD').
 * @param {number} value - Значение курса валюты.
 * @returns {HTMLElement} - Созданный элемент div для отображения курса.
 */
function createCourseElement(currencyCode, value) {
  const itemDiv = document.createElement('div');
  itemDiv.classList.add('item');

  const codeDiv = document.createElement('div');
  codeDiv.classList.add('item__code');
  codeDiv.textContent = currencyCode;
  itemDiv.appendChild(codeDiv);

  const valueDiv = document.createElement('div');
  valueDiv.classList.add('item__value');
  valueDiv.textContent = value;
  itemDiv.appendChild(valueDiv);

  const currencyDiv = document.createElement('div');
  currencyDiv.classList.add('item__currency');
  currencyDiv.textContent = 'руб.';
  itemDiv.appendChild(currencyDiv);

  return itemDiv;
}

/**
 * Асинхронно загружает данные о курсах валют с сервера,
 * отображает их на странице и управляет анимацией загрузки.
 */
async function fetchCourseData() {
  showLoader(); // Показываем индикатор загрузки перед началом запроса.

  try {
    // Отправляем GET-запрос на сервер.
    const response = await fetch('https://students.netoservices.ru/nestjs-backend/slow-get-courses');

    // Проверяем, был ли запрос успешным.
    if (!response.ok) {
      throw new Error(`Ошибка сети: ${response.status}`);
    }

    // Парсим полученные JSON-данные.
    const data = await response.json();

    // Очищаем предыдущие данные из контейнера, если они были.
    itemsContainer.innerHTML = '';

    // Перебираем полученные курсы валют и создаем для каждого элемент на странице.
    // В данном ответе структура такая, что ключи объекта 'Valute' являются кодами валют.
    for (const currency in data.response.Valute) {
      const courseItem = createCourseElement(currency, data.response.Valute[currency].Value);
      itemsContainer.appendChild(courseItem);
    }

  } catch (error) {
    console.error('Не удалось загрузить данные о курсах:', error);
    // В случае ошибки отображаем сообщение пользователю.
    itemsContainer.innerHTML = '<p>Не удалось загрузить данные.</p>';
  } finally {
    hideLoader(); // Скрываем анимацию загрузки после завершения запроса (успешного или с ошибкой).
  }
}

// Вызываем функцию загрузки данных при первом запуске скрипта.
fetchCourseData();
