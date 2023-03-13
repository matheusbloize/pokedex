import styles from "./PokeCard.module.css"

import { useState, useEffect } from "react"

import { Link } from "react-router-dom"

const URL = "https://pokeapi.co/api/v2/pokemon/"

const PokeCard = ({ number }) => {
  const [pokemon, setPokemon] = useState([])
  const [loading, setLoading] = useState(true)
  const [background, setBackground] = useState("normal")

  const getPokemon = async (url) => {
    const res = await fetch(url)
    const data = await res.json()

    try {
      setPokemon({
        name: data.name,
        types: data.types,
        sprites: data.sprites.front_default
      })
      setTimeout(() => {
        setLoading(true)
      }, 1000)
    } catch (err) {
      document.querySelector("#root").children[0].children[0].children[1].innerHTML = "Aconteceu um erro ao buscar um ou mais Pokémon, recarregando a página..."
      document.querySelector("#root").children[0].children[0].children[1].style.display = "flex"
      document.querySelector("#root").children[0].children[0].children[1].style.justifyContent = "center"
      document.querySelector("#root").children[0].children[0].children[1].style.alignItems = "center"
      document.querySelector("#root").children[0].children[0].children[1].style.scale = 1.5
      console.log(err)
      setTimeout(() => {
        location.reload()
      }, 3500)
    }
  }

  useEffect(() => {
    const pokeApiUrl = `${URL}${number}`
    getPokemon(pokeApiUrl)
  }, [])

  useEffect(() => {
    if (pokemon.name) {
      const type = pokemon.types[0].type.name
      setBackground(type)
    }
    setLoading(false)
  }, [pokemon])

  return (
    <Link to={`pokedex/${number}`} className={styles.pokedex_pokemon}>
      {!loading && <h2 style={{ color: "#333", fontSize: "1.2em" }}>Loading...</h2>}
      <div className={styles.pokedex_pokemon_image} style={{ backgroundImage: `url('../images/types-bg/${background}.jpeg')`, backgroundSize: "cover" }}>
        {pokemon.sprites && <img type-data={`${pokemon.types[0].type.name}`.toString()} src={pokemon.sprites} alt={pokemon.name} id={number} />}
      </div>
      <div className={styles.pokedex_pokemon_info}>
        <h2>{pokemon.name}</h2>
        {pokemon.types && typeof pokemon.types[1] === "undefined" && <p><span>{pokemon.types[0].type.name}</span></p>}
        {pokemon.types && typeof pokemon.types[1] !== "undefined" && <p><span>{pokemon.types[0].type.name}</span> | <span>{pokemon.types[1].type.name}</span></p>}
      </div>
    </Link>
  )
}

export default PokeCard