import styles from "./PokeCard.module.css"

import { useState, useEffect } from "react"

import { useNavigate } from "react-router-dom"

const URL = "https://pokeapi.co/api/v2/pokemon/"

const PokeCard = ({number}) => {
  const [pokemon, setPokemon] = useState([])
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    fetch(`${URL}${number}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setPokemon(data)
        setLoading(false)
      })
      .catch(err => console.log(err))
  }, [])

  const getPokemonInfo = (e) => {
    navigate(`pokedex/${e.target.id}`)
  }

  return (
    <div className={styles.pokedex_pokemon} onClick={getPokemonInfo}>
      {loading && <p>Loading...</p>}
      {pokemon.sprites && <img src={pokemon.sprites.front_default} alt={pokemon.name} id={number} />}
      <h2>{pokemon.name}</h2>
      {pokemon.types && typeof pokemon.types[1] === "undefined" && <p><span>{pokemon.types[0].type.name}</span></p>}
      {pokemon.types && typeof pokemon.types[1] !== "undefined" && <p><span>{pokemon.types[0].type.name}</span> | <span>{pokemon.types[1].type.name}</span></p>}
    </div>
  )
}

export default PokeCard