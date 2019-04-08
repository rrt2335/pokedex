export default class Pokemon {
    constructor(data) {
        this._id = data._id || data.id
        this.order = data.id
        this.name = data.name[0].toUpperCase() + data.name.substr(1)
        this.url = data.url
        this.height = data.height
        this.weight = data.weight
        this.base_experience = data.base_experience
        this.types = data.types
        this.sprites = data.sprites
    }
    getTemplate() {
        // Get template for Pokemon types
        let listOfTypes = ''
        for (let i = 0; i < this.types.length; i++) {
            let type = this.types[i].type.name
            if (i == this.types.length - 1) {
                listOfTypes += type
            } else {
                listOfTypes += type + ", "
            }
        }

        // Get template for images
        let spriteImage = this.sprites.front_default

        // Add zeroes before order number
        let order = 0;
        if (this.order < 10) {
            order = `00${this.order}`
        } else if (this.order >= 10 && this.order < 100) {
            order = `0${this.order}`
        } else {
            order = `${this.order}`
        }

        return `
        <div class="card">
        <div class="card-body text-center">
            <p id="order" class="card-text text-muted">#${order}</p>
            <img src="${spriteImage}">
            <h3 class="card-title">${this.name}</h3>
            <h5 class="card-subtitle mb-2 text-muted">Type: ${listOfTypes}</h5>
            <p class="card-text">Weight: ${Math.ceil(this.weight / 4.525)} lbs (${Math.ceil(this.weight / 9.8)} kg)<br>
            Height: ${this.height * 4} in (${this.height * 10.16} cm)<br>
            Base experience: ${this.base_experience} XP</p>
            <button class="btn btn-danger" onclick="app.controllers.pokeController.addPokemon()">I Choose You!</button>
        </div>
        </div>
        `
    }
}