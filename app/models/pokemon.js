export default class Pokemon {
    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.ulr = data.url
    }

    get BasicTemplate() {
        return `<li onclick="app.controllers.swController.getPerson('${this.url}')" class="${this.id}">${this.name}</li>`
    }

    get DetailedTemplate() {
        return `
        <h3>${this.name}</h3>

        `
    }
}
