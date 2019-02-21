export default class Pokemon {
    constructor(data){
        this._id = data._id
        this.name = data.name
    }
    getTemplate() {
        return
        `
        <div class="card">
        <div class="card-body">
            <h5 class="card-title">${this.name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">Level: ${this.level} -- Duration: ${this.duration}</h6>
            <p class="card-text">${this.desc}</p>
            <p class="card-text">Page: ${this.page}</p>
            <button class="btn btn-danger" onclick="app.controllers.spellController.addSpell()">Add to Spellbook</button>
        </div>
        </div>
        `
    }
}