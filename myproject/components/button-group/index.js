export class ButtonGroupComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
            <div class="btn-group mt-3" role="group">

            </div>
        `;
    }

    render() {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
    }
}
