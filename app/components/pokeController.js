import PokeService from "./pokeService.js";

let _ps = new PokeService()

function drawPokemonApi() {
    console.log('Drawing listed Pokémon...');
    let template = ''
    _ps.PokemonsApi.forEach(p => {
        template += `
        <li onclick="app.controllers.pokeController.getDetails('${p.url}')">${p.name}</li>
        `
    })
    document.querySelector('#api-pokemon').innerHTML = template;
    // document.querySelector('#buttons').innerHTML = `
    //  <button onclick="app.controllers.pokeController.prevPokemons()">Previous</button>
    //  <button onclick="app.controllers.pokeController.nextPokemons()">Next</button>
    //  `
}

function drawActivePokemon() {
    console.log('Drawing the selected Pokémon...');
    document.querySelector('#active-pokemon').innerHTML = _ps.ActivePokemon.getTemplate()
}

function drawMyPokemon() {
    console.log('Drawing your chosen Pokémon...');
    let template = ''
    _ps.MyPokemon.forEach(p => {
        template += `
        <li onclick="app.controllers.pokeController.showDetails('${p._id}')">${p.name}</li>
        `
    })
    document.querySelector('#my-pokemon').innerHTML = template
}

export default class PokeController {
    constructor() {
        _ps.addSubscriber('pokemonsApi', drawPokemonApi)
        _ps.addSubscriber('activePokemon', drawActivePokemon)
        _ps.addSubscriber('myPokemon', drawMyPokemon)
        _ps.getPokemonData()
    }

    getDetails(url) {
        _ps.getDetails(url)
    }

    showDetails(id) {
        _ps.showDetails(id)
    }

    prevPokemons() {
        _ps.prevPokemons()
    }

    nextPokemons() {
        _ps.nextPokemons()
    }

    addPokemon() {
        _ps.addPokemon()
    }

    // addTodo(event) {
	// 	event.preventDefault()
	// 	var form = event.target
	// 	var todo = {
	// 		description: form.description.value
	// 	}
	// 	_tds.addTodo(todo)
	// 	// Clears the form
	// 	form.reset();
	// }
}