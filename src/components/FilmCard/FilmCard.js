export class CardFormComponent {
    constructor({
                    parent = document.body,
                    data = [],
                } = {}) {

        this._parent = parent;
        this._data = data;
    }

    render() {
        const template = puglatizer.CardForm.CardForm()
        //console.log(template())
        this._parent.innerHTML = template;
    }
}

