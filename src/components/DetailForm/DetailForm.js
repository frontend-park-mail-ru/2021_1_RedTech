export class DetailFormComponent {
    constructor({
                    parent = document.body,
                    data = [],
                } = {}) {

        this._parent = parent;
        this._data = data;
    }

    render() {
        const template = puglatizer.DetailForm.DetailForm()
        //console.log(template())
        this._parent.innerHTML = template;
    }
}

