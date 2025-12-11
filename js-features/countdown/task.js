// Получаем элемент, отображающий время таймера (предположим, что у него id="timer").
const timerElement = document.getElementById('timer');

// Задаем начальное количество секунд (например, 1000 секунд).
let timeLeft = 40;

// Функция для обновления времени на странице.
function updateTimer() {
  // Вычисляем часы, минуты и секунды.
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  // Форматируем время для отображения (добавляем ведущие нули).
  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  // Обновляем содержимое элемента timerElement.
  timerElement.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

  // Уменьшаем оставшееся время.
  timeLeft--;

  // Проверяем, закончилось ли время.
  if (timeLeft < 0) {
    clearInterval(timerInterval); // Останавливаем таймер.
    alert('Вы победили в конкурсе!'); // Выводим сообщение о победе.
  }
}

// Запускаем таймер, вызывая функцию updateTimer каждую секунду.
const timerInterval = setInterval(updateTimer, 1000);

// Изначально вызываем `updateTimer`, чтобы сразу отобразить начальное время.
updateTimer();