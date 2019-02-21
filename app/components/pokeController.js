import PokeService from "./pokeService.js";

let _ps = new PokeService()

function drawPokemonApi() {
    let template = ''
    _ps.PokemonsApi.forEach(p => {
        template += `
        <li onclick="app.controllers.pokeController.getDetails('${p.url}')>${p.name}</li>
        `
    })
    document.querySelector('#api-pokemon').innerHTML = template;
}

export default class PokeController {
    constructor() {
        _ps.addSubscriber('pokemonsApi', drawPokemonApi)
        _ps.getPokemonData()
    }
    
    getDetails(url) {
        _ps.getDetails(url)
    }

    showDetails(id) {
        _ps.showDetails(id)
    }

}