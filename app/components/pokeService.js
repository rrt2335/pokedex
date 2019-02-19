// Private
import Pokemon from "../models/pokemon.js"

// Provide controls to GET/POST/PUT/DELETE
let _pokeAPI = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/pokemon/'
})

let _sandbox = axios.create({
    baseURL: ''
})

//variable controls for Poke
let _characters = 'characters?limit=50'
let _offset = 200
let _apiKey = '53496df3cd682930aa9108759e347171'


let _state = {
    apiPokemons: [],
    myTeam: []
}

let _subscribers = {
    apiPokemons: [],
    myTeam: []
}

function setState(prop, data) {
    _state[prop] = data
    _subscribers[prop].forEach(fn => fn())
}

// Public
export default class PokeService {
    addSubscriber(prop, fn) {
        _subscribers[prop].push(fn)
    }

    get ApiPokemons() {
        return _state.apiPokemons.map(p => new Pokemon(p))
    }

    get MyTeam() {
        return _state.myTeam.map(p => new Pokemon(p))
    }

    // Post data
    addToTeam(d) {
        // Find specific Pokémon
        let pokemon = _state.apiPokemons.find(pokemon => pokemon.id == id)
        // Find if Pokémon is already in list
        let myPokemon = _state.myTeam.find(p => p.name == pokemon.name)
        // Prevent adding duplicates
        if (myPokemon) {
            alert('You cannot have more than one type of Pokémon.')
            return
        }
        // Send data to server
        // First parameter is appended on baseURL, second parameter is data to send
        _sandbox.post('', pokemon)
            .then(res => {
                this.getMyTeamData()
            })
            .catch(err => {
                console.log(err)
            })
    }

    // Get data
    getMyTeamData() {
        _sandbox.get()
            .then(res => {
                let data = res.data.data.map(d => new Pokemon(d))
                setState('myTeam', data)
            })
            .catch(err => {
                console.error(err)
            })
    }
    // Get Poke Data
    getPokeData() {
        _pokeAPI.get(`${_characters}&offset=${_offset}&apikey=${_apiKey}`)
            .then(res => {
                let data = res.data.data.results.map(d => new Pokemon(d))
                setState('apiPokemons', data)
            })
            .catch(err => {
                console.error(err)
            })
    }

    //DELETE DATA
    removeFromTeam(id) {
        _sandbox.delete(id)
            .then(res => {
                console.log(res.data)
                this.getMyTeamData()
            })
            .catch(err => {
                console.error(err)
            })
    }

    editPokemon(newData) {
        _sandbox.put(newData.id, newData)
            .then(res => {
                this.getMyTeamData()
            })
    }
}