export class FormComponent {
    constructor({
                    parent = document.body,
                    data = [],
                } = {}) {

        this._parent = parent;
        this._data = data;
    }

    render() {
        const template = puglatizer.Form.Form()
        //console.log(template())
        this._parent.innerHTML = template;
    }
}

