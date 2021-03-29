export class CardFormComponent {
    constructor({
        parent = document.body,
        data = [],
    } = {}) {

        this._parent = parent;
        this._data = data;
    }

    render() {
        const template = puglatizer.CardForm.CardForm();
        this._parent.innerHTML = template;
    }
}
