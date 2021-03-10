export class DetailComponent {
    constructor({
        parent = document.body,
        data = [],
    } = {}) {

        this._parent = parent;
        this._data = data;
    }

    render() {
        const template = puglatizer.DetailView.DetailView(this._data);
        //console.log(template())
        this._parent.innerHTML = template;
    }
}


