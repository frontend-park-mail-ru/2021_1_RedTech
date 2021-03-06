export class HomeComponent {
    constructor({
                    parent = document.body,
                    data = [],
                } = {}) {

        this._parent = parent;
        this._data = data;
    }

    render() {
        const template = puglatizer.views.HomeView.HomeView()
        //console.log(template())
        this._parent.innerHTML = template;
    }
}


