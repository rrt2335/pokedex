export default class Pokemon {
    constructor(data) {
        this.name = data.name
        this.url = data.url
    }

    get BasicTemplate() {
        return `<li onclick="app.controllers.pokeController.getPokemons('${this.url}')">${this.name}</li>`
    }

    get DetailedTemplate() {
        return `
        <h3>${this.name}</h3>
        `
    }
}