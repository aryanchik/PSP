// 1. ДОБАВЛЕН ИМПОРТ КНОПКИ (исправляет ошибку со скриншота)
import { BackButtonComponent } from "../../components/back-button/index.js";
import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";
import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.cardsData = [];
        this.container = null;
        this.currentIndex = 0;
        this.cardsPerView = 3;
    }

    async getData() {
        // 1. Ждем ответа от сервера (распаковываем data и status)
        const { data, status } = await ajax.get(stockUrls.getStocks());

        // 2. Проверяем, что всё ок
        if (status === 200 && data) {
            console.log("Данные успешно получены:", data);
            this.initSlider(data); // Теперь это сработает!
        } else {
            console.error("Не удалось загрузить данные. Статус:", status);
            if (this.container) {
                this.container.innerHTML = "Ошибка загрузки данных";
            }
        }
    }

    getHTML() {
        return `
            <div class="container mt-4">
                <div class="slider-header">
                    <div class="arrows-group">
                        <button class="arrow-only-btn" id="prev-btn">←</button>
                        <button class="arrow-only-btn" id="next-btn">→</button>
                    </div>
                </div>
                <div class="cards-wrapper">
                    <div id="root" class="cards-track"></div>
                </div>
            </div>
        `;
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        // 4. ИСПРАВЛЕНО: привязываем контейнер к элементу в DOM
        this.container = this.parent.querySelector('#root');

        // Кнопка назад (убедись, что методы clickBack и свойство pageRoot существуют)
        // Если pageRoot нет, используй this.parent
        if (this.clickBack) {
            const backButton = new BackButtonComponent(this.parent);
            backButton.render(this.clickBack.bind(this));
        }

        this.getData();
    }

    initSlider(data) {
        this.cardsData = data;

        if (this.cardsData && this.cardsData.length > 0) {
            this.setupListeners();
            this.renderVisibleCards();
            this.updateArrows();
        } else if (this.container) {
            this.container.innerHTML = "Данные не получены";
        }
    }

    setupListeners() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');

        if (!prevBtn || !nextBtn) return;

        prevBtn.onclick = () => {
            if (this.currentIndex > 0) {
                this.currentIndex--;
                this.renderVisibleCards();
                this.updateArrows();
            }
        };

        nextBtn.onclick = () => {
            if (this.currentIndex + this.cardsPerView < this.cardsData.length) {
                this.currentIndex++;
                this.renderVisibleCards();
                this.updateArrows();
            }
        };
    }

    renderVisibleCards() {
        if (!this.container) return;

        this.container.innerHTML = '';
        const visibleCards = this.cardsData.slice(this.currentIndex, this.currentIndex + this.cardsPerView);

        visibleCards.forEach(item => {
            const productCard = new ProductCardComponent(this.container);
            productCard.render(item, () => {
                const productPage = new ProductPage(this.parent, item.id);
                productPage.render();
            });
        });
    }

    updateArrows() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');

        if (!prevBtn || !nextBtn) return;

        prevBtn.disabled = this.currentIndex === 0;
        nextBtn.disabled = this.currentIndex + this.cardsPerView >= this.cardsData.length;
    }
}
