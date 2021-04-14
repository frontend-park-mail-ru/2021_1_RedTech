export class DetailFormComponent {
    constructor({
        parent = document.body,
        data = [],
    } = {}) {

        this._parent = parent;
        this._data = data;
    }

    render() {
        const template = puglatizer.DetailForm.DetailForm();
        this._parent.innerHTML = template;
    }
}
