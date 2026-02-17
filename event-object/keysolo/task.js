class Game {
    constructor() {
        // Получаем ссылки на DOM-элементы для отображения статистики и слова.
        this.winsElement = document.querySelector('.status__wins');
        this.lossElement = document.querySelector('.status__loss');
        this.wordElement = document.querySelector('.word');
        // Получаем все элементы символов текущего слова.
        this.symbols = document.querySelectorAll('.symbol');
        // Индекс текущего символа, который пользователь должен ввести.
        this.currentSymbolIndex = 0;
        // Счетчик побед и поражений.
        this.wins = 0;
        this.loss = 0;
        // Текущее слово, которое отображается.
        this.currentWord = '';
        // Инициализируем игру.
        this.init();
    }

    // Инициализация игры: обновление статистики, генерация первого слова, регистрация событий.
    init() {
        this.updateStatus();
        this.generateWord();
        this.registerEvents();
    }

    // Регистрация обработчика событий для нажатия клавиш.
    registerEvents() {
        // Используем 'keyup' для отслеживания отпускания клавиши.
        // Это гарантирует, что мы получим полный символ и избежим проблем с залипанием клавиш.
        document.addEventListener('keyup', this.handleKeyPress.bind(this));
    }

    // Обработчик нажатия клавиши.
    handleKeyPress(event) {
        // Если игра неактивна (например, закончилась) или нет символов для ввода, выходим.
        if (this.symbols.length === 0 || !this.symbols[this.currentSymbolIndex]) {
            return;
        }

        // Получаем элемент текущего символа, который ожидается.
        const currentSymbolElement = this.symbols[this.currentSymbolIndex];
        // Получаем текст этого символа.
        const targetSymbol = currentSymbolElement.textContent;
        // Получаем введенный символ и приводим его к верхнему регистру для сравнения без учета регистра.
        const enteredSymbol = event.key.toUpperCase();

        // Сравниваем введенный символ с ожидаемым.
        if (enteredSymbol === targetSymbol.toUpperCase()) {
            // Если символы совпадают - успех.
            this.success();
        } else {
            // Если символы отличаются - поражение.
            this.fail();
        }
    }

    // Обработка успешного ввода символа.
    success() {
        // Находим текущий элемент символа.
        const currentSymbolElement = this.symbols[this.currentSymbolIndex];
        // Добавляем класс для визуального обозначения правильного ввода.
        currentSymbolElement.classList.add('symbol_correct');
        // Переходим к следующему символу.
        this.currentSymbolIndex++;

        // Проверяем, введено ли слово целиком.
        if (this.currentSymbolIndex === this.symbols.length) {
            this.wins++; // Увеличиваем счетчик побед.
            this.updateStatus(); // Обновляем отображение.
            this.generateWord(); // Генерируем новое слово.

            // Проверяем условие победы.
            if (this.wins === 10) {
                alert('Поздравляем! Вы победили!');
                this.resetGame(); // Сбрасываем игру.
            }
        }
    }

    // Обработка неправильного ввода символа.
    fail() {
        // Добавляем класс для обозначения ошибки в слове.
        this.wordElement.classList.add('word_incorrect');
        this.loss++; // Увеличиваем счетчик поражений.
        this.updateStatus(); // Обновляем отображение.

        // Проверяем условие поражения.
        if (this.loss === 3) {
            alert('Вы проиграли!');
            this.resetGame(); // Сбрасываем игру.
        } else {
            // Если игра не окончена, сбрасываем состояние текущего слова и генерируем новое.
            this.resetWordState();
            this.generateWord();
        }
    }

    // Сброс состояния слова (удаление классов, сброс индекса).
    resetWordState() {
        this.wordElement.classList.remove('word_incorrect');
        this.currentSymbolIndex = 0;
        this.symbols.forEach(symbol => symbol.classList.remove('symbol_correct'));
    }

    // Обновление текста счетчиков побед и поражений.
    updateStatus() {
        this.winsElement.textContent = this.wins;
        this.lossElement.textContent = this.loss;
    }

    // Генерация нового слова для ввода.
    generateWord() {
        // Примерный список слов. В реальном приложении это может быть массив или API.
        const words = ['КОЛЯ', 'МОРЕ', 'НЕБО', 'КЛИК', 'МЫШЬ', 'КЛАВА', 'ТЕСТ', 'КОД'];
        this.currentWord = words[Math.floor(Math.random() * words.length)];

        // Очищаем предыдущее слово.
        this.wordElement.innerHTML = '';
        // Создаем новые span-элементы для каждого символа нового слова.
        this.currentWord.split('').forEach(symbol => {
            const span = document.createElement('span');
            span.classList.add('symbol');
            span.textContent = symbol;
            this.wordElement.appendChild(span);
        });
        // Обновляем коллекцию DOM-элементов символов.
        this.symbols = this.wordElement.querySelectorAll('.symbol');
        // Сбрасываем состояние после генерации нового слова.
        this.resetWordState();
    }

    // Сброс игры к начальному состоянию.
    resetGame() {
        this.wins = 0;
        this.loss = 0;
        this.currentSymbolIndex = 0;
        this.updateStatus();
        this.generateWord();
        // Удаляем обработчик событий, чтобы игра прекратила реагировать на ввод.
        document.removeEventListener('keyup', this.handleKeyPress.bind(this));
    }
}

// Запускаем игру после полной загрузки DOM.
document.addEventListener('DOMContentLoaded', () => {
    new Game();
});
