import { ProductComponent } from "../../components/product/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id; // ID из карточки
    }

    async render() {
        this.parent.innerHTML = `
            <div id="product-page">
                <div class="controls-container" style="padding: 20px;"></div>
                <div id="product-content">Загрузка модели...</div>
            </div>
        `;

        try {
            // Запрос к API по конкретному ID
            const response = await fetch(`http://localhost:3000/stocks/${this.id}`);

            if (!response.ok) {
                throw new Error(`Сервер ответил с ошибкой: ${response.status}`);
            }

            const data = await response.json();

            // Кнопка назад
            const backBtn = new BackButtonComponent(this.parent.querySelector('.controls-container'));
            backBtn.render(() => new MainPage(this.parent).render());

            // Отрисовка компонента с 3D
            const product = new ProductComponent(this.parent.querySelector('#product-content'));
            product.render(data);
        } catch (err) {
            console.error("Ошибка запроса к API:", err);
            this.parent.querySelector('#product-content').innerHTML = `
                <div style="text-align:center; color:red; padding:50px;">
                    <h3>Ошибка загрузки товара</h3>
                    <p>${err.message}</p>
                </div>`;
        }
    }
}
