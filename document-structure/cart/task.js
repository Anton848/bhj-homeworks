// Класс для управления корзиной товаров
class CartManager {
    constructor() {
        // Получаем контейнер для товаров в корзине
        this.cartProductsContainer = document.querySelector('.cart__products');
        // Получаем все элементы товаров на странице
        this.productElements = document.querySelectorAll('.product');

        // Привязываем методы к текущему экземпляру класса
        this.addProductToCart = this.addProductToCart.bind(this);
        this.updateQuantity = this.updateQuantity.bind(this);

        // Настраиваем обработчики событий
        this.setupEventListeners();
    }

    // Настройка обработчиков событий для кнопок управления количеством и добавлением товара
    setupEventListeners() {
        this.productElements.forEach(productElement => {
            // Находим кнопки управления количеством и кнопку добавления
            const quantityControls = productElement.querySelectorAll('.product__quantity-control');
            const addButton = productElement.querySelector('.product__add');

            // Добавляем обработчик на кнопки +/-
            quantityControls.forEach(control => {
                control.addEventListener('click', this.updateQuantity);
            });

            // Добавляем обработчик на кнопку "Добавить в корзину"
            addButton.addEventListener('click', this.addProductToCart);
        });
    }

    // Метод для обновления количества товара в карточке
    updateQuantity(event) {
        // Находим элемент, отображающий количество
        const quantityValueElement = event.target.closest('.product__quantity-controls').querySelector('.product__quantity-value');
        let currentQuantity = parseInt(quantityValueElement.textContent);

        // Увеличиваем или уменьшаем количество, проверяя минимальное значение
        if (event.target.classList.contains('product__quantity-control_inc')) {
            currentQuantity++;
        } else if (event.target.classList.contains('product__quantity-control_dec') && currentQuantity > 1) {
            currentQuantity--;
        }
        // Обновляем отображаемое количество
        quantityValueElement.textContent = currentQuantity;
    }

    // Метод для добавления товара в корзину
    addProductToCart(event) {
        // Определяем родительский элемент товара и получаем его ID, изображение и количество
        const productElement = event.target.closest('.product');
        const productId = productElement.dataset.id;
        const productImageSrc = productElement.querySelector('.product__image').src;
        const quantityToAdd = parseInt(productElement.querySelector('.product__quantity-value').textContent);

        // Проверяем, есть ли уже такой товар в корзине
        const existingCartProduct = this.cartProductsContainer.querySelector(`.cart__product[data-id='${productId}']`);

        if (existingCartProduct) {
            // Если товар есть, увеличиваем его количество
            const currentCartCount = parseInt(existingCartProduct.querySelector('.cart__product-count').textContent);
            existingCartProduct.querySelector('.cart__product-count').textContent = currentCartCount + quantityToAdd;
        } else {
            // Если товара нет, создаем новый элемент для корзины
            const newCartProduct = document.createElement('div');
            newCartProduct.classList.add('cart__product');
            newCartProduct.dataset.id = productId;
            // Используем шаблонную строку для создания HTML-разметки нового товара в корзине
            newCartProduct.innerHTML = `
                <img class="cart__product-image" src="${productImageSrc}" alt="Product Image">
                <div class="cart__product-count">${quantityToAdd}</div>
            `;
            // Добавляем новый товар в контейнер корзины
            this.cartProductsContainer.appendChild(newCartProduct);
        }
    }
}

// Инициализация менеджера корзины после полной загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    new CartManager();
});
