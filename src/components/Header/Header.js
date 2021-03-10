export class HeaderComponent {
    constructor({
        parent = document.body,
        data = [],
    } = {}) {

        this._parent = parent;
        this._data = data;
    }

    render() {
        const template = puglatizer.components.Header.Header();
        //console.log(template())
        this._parent.innerHTML = template;
    }
}

