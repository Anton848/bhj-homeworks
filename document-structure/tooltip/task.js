class TooltipManager {
    constructor() {
        // Получаем все элементы, которые должны иметь всплывающую подсказку
        this.tooltipTriggers = document.querySelectorAll('.has-tooltip');
        // Получаем элемент, который будет отображать саму подсказку (он должен быть в HTML, но скрыт)
        this.tooltipElement = document.querySelector('.tooltip');

        // Если элемента подсказки нет, нет смысла продолжать
        if (!this.tooltipElement) {
            console.error("Элемент .tooltip не найден на странице.");
            return;
        }

        // Регистрируем обработчики событий
        this.registerEvents();
    }

    registerEvents() {
        // Добавляем обработчик клика на каждый элемент-триггер
        this.tooltipTriggers.forEach(trigger => {
            trigger.addEventListener('click', (event) => {
                event.preventDefault(); // Предотвращаем стандартное поведение ссылки

                const title = trigger.getAttribute('title'); // Получаем текст подсказки из атрибута title

                // Если текст подсказки есть
                if (title) {
                    this.showTooltip(trigger, title);
                }
            });
        });

        // Добавляем обработчик для скрытия подсказки при клике в любом другом месте документа
        document.addEventListener('click', (event) => {
            // Проверяем, был ли клик не по триггеру и не по самой подсказке
            if (!event.target.closest('.has-tooltip') && !event.target.closest('.tooltip')) {
                this.hideTooltip();
            }
        });

        // Дополнительно: скрываем подсказку при прокрутке, чтобы она не оставалась в неверном положении
        window.addEventListener('scroll', this.hideTooltip.bind(this));
    }

    showTooltip(triggerElement, tooltipText) {
        // Устанавливаем текст подсказки
        this.tooltipElement.textContent = tooltipText;

        // Позиционируем подсказку относительно триггерного элемента
        const triggerRect = triggerElement.getBoundingClientRect();
        const tooltipRect = this.tooltipElement.getBoundingClientRect(); // Получаем размеры подсказки

        // Вычисляем положение подсказки, чтобы она была под триггером
        // Добавляем небольшой отступ (например, 5px)
        let top = triggerRect.bottom + 5 + window.scrollY; // window.scrollY нужен для правильного позиционирования при прокрутке
        let left = triggerRect.left + window.scrollX;

        // Проверка, не выходит ли подсказка за правую границу экрана
        if (left + tooltipRect.width > window.innerWidth) {
            left = window.innerWidth - tooltipRect.width - 5; // Сдвигаем влево, оставляя небольшой отступ
        }
        // Проверка, не выходит ли подсказка за левую границу экрана (хотя это реже)
        if (left < 0) {
            left = 5;
        }

        // Применяем рассчитанные стили
        this.tooltipElement.style.top = `${top}px`;
        this.tooltipElement.style.left = `${left}px`;

        // Делаем подсказку видимой
        this.tooltipElement.classList.add('tooltip_active');
    }

    hideTooltip() {
        // Удаляем класс, делающий подсказку видимой, и сбрасываем её стили
        this.tooltipElement.classList.remove('tooltip_active');
        this.tooltipElement.style.top = '';
        this.tooltipElement.style.left = '';
    }
}

// Инициализируем менеджер подсказок при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
    new TooltipManager();
});
