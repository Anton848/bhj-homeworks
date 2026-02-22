class Rotator {
    constructor(element) {
        // Находим все элементы-объявления внутри ротатора
        this.cases = element.querySelectorAll('.rotator__case');
        // Ищем активное объявление. Если его нет, берем первое
        this.activeCase = element.querySelector('.rotator__case_active') || this.cases[0];
        // Устанавливаем активное объявление, если оно не было задано изначально
        if (!this.activeCase.classList.contains('rotator__case_active')) {
            this.activeCase.classList.add('rotator__case_active');
        }

        // Запускаем интервал для смены объявлений
        this.startRotation();
    }

    startRotation() {
        // Используем setInterval для периодического выполнения функции смены объявлений
        // Каждое объявление имеет свой интервал, указанный в data-speed
        // Если data-speed не указан, используется значение по умолчанию 1000 мс (1 секунда)
        setInterval(() => {
            this.rotate();
        }, this.getActiveCaseSpeed());
    }

    getActiveCaseSpeed() {
        // Получаем значение data-speed для текущего активного объявления
        // Если атрибут не найден, возвращаем 1000 (1 секунда)
        const speed = parseInt(this.activeCase.dataset.speed, 10);
        return isNaN(speed) ? 1000 : speed;
    }

    rotate() {
        // Получаем индекс текущего активного объявления
        const currentIndex = Array.from(this.cases).indexOf(this.activeCase);
        // Снимаем класс активности с текущего объявления
        this.activeCase.classList.remove('rotator__case_active');

        // Вычисляем индекс следующего объявления (по кругу)
        const nextIndex = (currentIndex + 1) % this.cases.length;
        // Получаем следующее объявление
        this.activeCase = this.cases[nextIndex];
        // Добавляем класс активности к следующему объявлению
        this.activeCase.classList.add('rotator__case_active');

        // Перезапускаем интервал с новым значением скорости, если оно изменилось
        // Это важно, так как скорость объявлений может быть разной
        clearInterval(this.intervalId); // Сначала очищаем предыдущий интервал (если он был)
        this.intervalId = setInterval(() => {
            this.rotate();
        }, this.getActiveCaseSpeed());
    }
}

// Дожидаемся полной загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    // Находим все элементы с классом 'rotator'
    const rotatorElements = document.querySelectorAll('.rotator');
    // Для каждого найденного ротатора создаем новый экземпляр класса Rotator
    rotatorElements.forEach(element => new Rotator(element));
});
