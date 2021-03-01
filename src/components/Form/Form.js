const pug = require('pug')

export class FormComponent {
    constructor({
                    parent = document.body,
                    data = [],
                } = {}) {

        this._parent = parent;
        this._data = data;
    }

    render() {
        const template = pug.compileFile('./Form.pug')
        console.log(template())
        this._parent.innerHTML = template();
    }
}