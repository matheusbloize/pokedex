import styles from "./Pokedex.module.css"

import background from "../assets/background.jpg"

import { BsArrowRight } from "react-icons/bs"

import { useParams, useNavigate, Link } from "react-router-dom"
import { useState, useEffect } from "react"

const URL = "https://pokeapi.co/api/v2/pokemon/"

const Pokedex = () => {
  const [pokemon, setPokemon] = useState([])
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (id <= 0 || id > 493) {
      alert("Pokémon não encontrado!")
      navigate("/error")
    }
    fetch(`${URL}${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setPokemon(data)
      })
      .catch(err => console.log(err))
  }, [id])

  return (
    <div className={styles.pokedex_container}>
      <div className={styles.pokedex_top}>
        <div className={`${styles.pokedex_circle1}`}></div>
        <div className={`${styles.pokedex_circle} ${styles.pokedex_circle2}`}></div>
        <div className={`${styles.pokedex_circle} ${styles.pokedex_circle3}`}></div>
        <div className={`${styles.pokedex_circle} ${styles.pokedex_circle4}`}></div>
        <div className={styles.pokedex_top1}></div>
        <div className={styles.pokedex_top1right}></div>
        <div className={styles.pokedex_top2right}></div>
        <div className={styles.pokedex_top3right}></div>
        <div className={styles.pokedex_top2}></div>
      </div>
      <div className={styles.pokedex_center}>
        <div className={styles.pokedex_center_diag}></div>
        <div className={styles.pokedex_center_polygon}></div>
        <div className={styles.pokedex_center_polygon_border}></div>
        <div className={styles.pokedex_center_circle1}></div>
        <div className={styles.pokedex_center_circle2}></div>
        <div className={styles.pokedex_center_circle3}></div>
        <div className={styles.pokedex_center_main}>
          <img className={styles.pokedex_center_main_image} src={background} alt="Background" />
          {pokemon.sprites && <img src={pokemon.sprites.front_default} alt={pokemon.name} id={id} className={styles.pokemon_image} />}
          {pokemon.name && <p className={styles.pokemon_name}>{pokemon.name}</p>}
          <div className={styles.pokemon_types}>
            {pokemon.types && typeof pokemon.types[1] === "undefined" && (
              <div className={styles.pokemon_type}>
                <div>
                  <p>
                    <span className={styles.pokemon_type_style1}>{pokemon.types[0].type.name}</span>
                  </p>
                </div>
                <div>
                  <p>
                    <span className={`${styles.pokemon_type_style2} ${styles.pokemon_type_style2_undefined}`}>none</span>
                  </p>
                </div>
              </div>
            )}
            {pokemon.types && typeof pokemon.types[1] !== "undefined" && (
              <div className={styles.pokemon_type}>
                <div>
                  <p>
                    <span className={styles.pokemon_type_style1}>{pokemon.types[0].type.name}</span>
                  </p>
                </div>
                <div>
                  <p>
                    <span className={styles.pokemon_type_style2}>{pokemon.types[1].type.name}</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.pokedex_right}>
        <div className={styles.pokedex_right1}></div>
        <div className={styles.pokedex_right2}></div>
      </div>
      <div className={styles.pokedex_controller}>
        <Link className={styles.pokedex_controller_top} to={`/pokedex/${parseInt(id) + 1}`}>
          <BsArrowRight />
        </Link>
        <Link className={styles.pokedex_controller_right} to={`/pokedex/${parseInt(id) + 1}`}>
          <BsArrowRight />
        </Link>
        <Link className={styles.pokedex_controller_bottom} to={`/pokedex/${parseInt(id) - 1}`}>
          <BsArrowRight />
        </Link>
        <Link className={styles.pokedex_controller_left} to={`/pokedex/${parseInt(id) - 1}`}>
          <BsArrowRight />
        </Link>
        <div className={styles.pokedex_controller_mid}></div>
      </div>
    </div>
  )
}

export default Pokedex