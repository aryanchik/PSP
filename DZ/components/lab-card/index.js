export class LabCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="product-detail-card" style="flex-direction: column; width: 100%; margin-bottom: 20px;">
                <h4 class="product-title" style="font-size: 1.5rem; color: #4caf50;">${data.title}</h4>
                <div class="product-info">
                    <p class="product-text"><strong>Вход:</strong> <code>${data.input}</code></p>
                    <div class="product-settings" style="background: #e8f5e9; color: #2e7d32; font-size: 1.2rem;">
                        <strong>Результат:</strong> ${data.result}
                    </div>
                </div>
            </div>
        `;
    }

    render(data) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML(data));
    }
}
