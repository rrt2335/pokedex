import PokeService from "./pokeService.js";

let _ps = new PokeService()

function drawPokemonApi() {
    let template = ''
    _ps.PokemonsApi.forEach(p => {
        template += `
        <li onclick="app.controllers.pokeController.getDetails('${p.url}')">${p.name}</li>
        `
    })
    document.querySelector('#api-pokemon').innerHTML = template;
    document.querySelector('#buttons').innerHTML = `
     <button onclick = "app.controllers.pokeController.prevPokemon()">prev</li>
     <button onclick = "app.controllers.pokeController.nextPokemon()">Next</li>
     `
}

function drawActivePokemon() {
    document.querySelector('#active-pokemon').innerHTML = _ps.ActivePokemon.getTemplate()
}

export default class PokeController {
    constructor() {
        _ps.addSubscriber('pokemonsApi', drawPokemonApi)
        _ps.addSubscriber('activePokemon', drawActivePokemon)
        _ps.getPokemonData()
    }

    getDetails(url) {
        _ps.getDetails(url)
    }

    showDetails(id) {
        _ps.showDetails(id)
    }

    prevPokemon() {
        _ps.prevPokemon()
    }

    nextPokemon() {
        _ps.nextPokemon()
    }
}