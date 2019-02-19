// Private
import PokeService from "./pokeService.js";

let _pokeService = new PokeService()

function drawApiPokemons() {
    let template = ''
    let pokemons = _pokeService.ApiPokemons
    pokemons.forEach(p => {
        let button = `<button class="btn btn-primary" onclick="app.controllers.pokeController.addToTeam('${p.id}')">Capture!</button>`
        template += p.BasicTemplate
    })
    document.querySelector('.allpokemon').innerHTML = template
    document.getElementById('buttons-pokemon').innerHTML = `
    <button ${_pokeService.PreviousPokemons ? '' : 'disabled'} onclick="app.controllers.pokeController.getPokemons('${_pokeService.PreviousPokemons}')">Previous</button>
    <button ${_pokeService.NextPokemons ? '' : 'disabled'} onclick="app.controllers.pokeController.getPokemons('${_pokeService.NextPokemons}')">Next</button>
    `
}
function drawMyTeam() {
    let template = ''
    let pokemons = _pokeService.MyTeam
    pokemons.forEach(p => {
        let button = `<button class="btn btn-danger" onclick="app.controllers.pokeController.removeFromTeam('${p.id}')">Free Pokémon</button>
        <i onclick="app.controllers.pokeController.showEditForm('${p.id}')" class="fas fa-pencil-alt"></i>
        `
        template += p.BasicTemplate
    })
    document.querySelector('.myteam').innerHTML = template
}

// Public
export default class PokeController {
    constructor() {
        _pokeService.addSubscriber('apiPokemons', drawApiPokemons)
        _pokeService.addSubscriber('myTeam', drawMyTeam)

        //Initialize Data
        _pokeService.getPokeData()
        _pokeService.getMyTeamData()
    }
    addToTeam(id) {
        _pokeService.addToTeam(id)
    }
    removeFromTeam(id) {
        _pokeService.removeFromTeam(id)
    }
    showEditForm(id) {
        document.getElementById(id).hidden = false;
    }

    editPokemon(event) {
        event.preventDefault();
        let data = {
            id: event.target.id,
            description: event.target.description.value
        }
        _pokeService.editPokemon(data)

    }
}
