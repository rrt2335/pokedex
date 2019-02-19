export default class Pokemon {
    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.abilities = data.abilities
    }


    getCard(button) {
        return `
        <div class="col-3">
        <div class="card">
                <img class="card-img-top" src="${this.img}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${this.name}</h5>
                    <p class="card-text">${this.id}</p>
                    ${button}
                </div>
                <form hidden id="${this.id}" onsubmit="app.controllers.pokeController.editPokemonevent)">
                    <input type="text" name="description">
                    <button class="btn btn-info" type="submit">Submit</button>
                </form>
                    
        </div>
        </div>
        `
    }
}
