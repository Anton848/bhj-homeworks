// Класс для управления корзиной товаров
class CartManager {
    constructor() {
        // Инициализация элементов DOM
        this.cartProductsContainer = document.querySelector('.cart__products');
        this.productElements = document.querySelectorAll('.product');

        // Привязка методов для корректного `this`
        this.addProductToCart = this.addProductToCart.bind(this);
        this.updateQuantity = this.updateQuantity.bind(this);

        // Назначение обработчиков событий
        this.setupEventListeners();
    }

    // Настройка обработчиков событий для кнопок изменения количества и добавления в корзину
    setupEventListeners() {
        this.productElements.forEach(productElement => {
            const quantityControls = productElement.querySelectorAll('.product__quantity-control');
            const addButton = productElement.querySelector('.product__add');

            // Обработчики для кнопок +/-
            quantityControls.forEach(control => {
                control.addEventListener('click', this.updateQuantity);
            });

            // Обработчик для кнопки "Добавить в корзину"
            addButton.addEventListener('click', this.addProductToCart);
        });
    }

    // Обновление количества товара в карточке
    updateQuantity(event) {
        const quantityValueElement = event.target.closest('.product__quantity-controls').querySelector('.product__quantity-value');
        let currentQuantity = parseInt(quantityValueElement.textContent);

        if (event.target.classList.contains('product__quantity-control_inc')) {
            currentQuantity++;
        } else if (event.target.classList.contains('product__quantity-control_dec') && currentQuantity > 1) {
            currentQuantity--;
        }
        quantityValueElement.textContent = currentQuantity;
    }

    // Добавление товара в корзину
    addProductToCart(event) {
        const productElement = event.target.closest('.product');
        const productId = productElement.dataset.id;
        const productImageSrc = productElement.querySelector('.product__image').src;
        const quantityToAdd = parseInt(productElement.querySelector('.product__quantity-value').textContent);

        // Поиск существующего товара в корзине
        const existingCartProduct = this.cartProductsContainer.querySelector(`.cart__product[data-id='${productId}']`);

        if (existingCartProduct) {
            // Если товар уже в корзине, увеличиваем его количество
            const currentCartCount = parseInt(existingCartProduct.querySelector('.cart__product-count').textContent);
            existingCartProduct.querySelector('.cart__product-count').textContent = currentCartCount + quantityToAdd;
        } else {
            // Иначе, создаем новый элемент корзины
            const newCartProduct = document.createElement('div');
            newCartProduct.classList.add('cart__product');
            newCartProduct.dataset.id = productId;
            newCartProduct.innerHTML = `
                <img class="cart__product-image" src="${productImageSrc}" alt="Product Image">
                <div class="cart__product-count">${quantityToAdd}</div>
            `;
            this.cartProductsContainer.appendChild(newCartProduct);
        }
    }
}

// Создание экземпляра CartManager после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    new CartManager();
});
