export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="my-product-card" id="card-${data.id}" style="cursor: pointer;">
                <img src="${data.src}" alt="${data.title}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 10px;">
                <div class="body">
                    <h5>${data.title}</h5>
                    <p>${data.text}</p>
                </div>
            </div>
        `;
    }

    render(data, listener) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML(data));
        const card = this.parent.querySelector(`#card-${data.id}`);

        // Вешаем слушатель клика на всю карточку
        card.addEventListener("click", () => {
            listener();
        });
    }
}
