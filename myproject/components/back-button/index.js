export class BackButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
            <button class="my-btn primary back-btn" type="button">
                <span>←</span> Назад
            </button>
        `;
    }

    render(listener) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        const backButton = this.parent.querySelector('.back-btn');

        if (backButton) {
            backButton.addEventListener("click", (e) => {
                e.preventDefault();
                listener(e);
            });
        } else {
            console.error('Кнопка "Назад" не найдена');
        }
    }
}
