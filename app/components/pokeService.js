// Private
import Pokemon from "../models/pokemon.js"

// Provide controls to GET/POST/PUT/DELETE
let _pokeAPI = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/pokemon'
})

let _sandbox = axios.create({
    baseURL: ''
})

// Variable controls for Poke
let _offset = 0
let _limit = '?limit=20'

let _state = {
    pokemons: [],
    nextPrevPokemon: {
        nextUrl: '',
        previousUrl: ''
    },
    activePokemon: {},
    myTeam: []
}

let _subscribers = {
    apiPokemons: [],
    nextPrevPokemon: {
        nextUrl: '',
        previousUrl: ''
    },
    activePokemon: {},
    myTeam: []
}

// Handles all asynchronous code
function setState(prop, data) {
    _state[prop] = data
    _subscribers[prop].forEach(fn => fn())
}

// Public
export default class PokeService {
    addSubscriber(prop, fn) {
        _subscribers[prop].push(fn)
    }

    get NextPokemons() {
        return _state.nextPrevPokemon.nextUrl
    }

    get PreviousPokemons() {
        return _state.nextPrevPokemon.previousUrl
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
        _pokeAPI.get(`${_limit}&offset=${_offset}`)
            .then(res => {
                console.log(res)
                let data = res.data.results.map(d => new Pokemon(d))
                let nextPrev = {
                    nextUrl: res.data.next,
                    previousUrl: res.data.previous
                }
                setState('apiPokemons', data)
                setState('nextPrevPokemon', nextPrev)

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