import styles from "./Pokedex.module.css"

import background from "../assets/background.jpg"

import { BsArrowRight, BsArrowReturnLeft, BsLinkedin } from "react-icons/bs"

import { useParams, useNavigate, Link } from "react-router-dom"
import { useState, useEffect } from "react"

const URL = "https://pokeapi.co/api/v2/pokemon/"

const Pokedex = () => {
  const [pokemon, setPokemon] = useState([])
  const [height, setHeight] = useState()
  const [weight, setWeight] = useState()
  const [render, setRender] = useState(1)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (id <= 0 || id > 493) {
      alert("Pokémon não encontrado!")
      navigate("/pokedex")
    }
    fetch(`${URL}${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setPokemon(data)
        setRender(render + 1)
      })
      .catch(err => console.log(err))
  }, [id])

  useEffect(() => {
    if (pokemon.stats) {
      let weightRef
      switch (pokemon.weight.toString().length) {
        case 2:
          weightRef = `${pokemon.weight.toString()[0]}.${pokemon.weight.toString()[1]}`
          setWeight(weightRef)
          break
        case 3:
          weightRef = `${pokemon.weight.toString()[0]}${pokemon.weight.toString()[1]}.${pokemon.weight.toString()[2]}`
          setWeight(weightRef)
          break
        case 4:
          weightRef = `${pokemon.weight.toString()[0]}${pokemon.weight.toString()[1]}${pokemon.weight.toString()[2]}.${pokemon.weight.toString()[3]}`
          setWeight(weightRef)
          break
      }
      let heightRef
      switch (pokemon.height.toString().length) {
        case 1:
          heightRef = `0.${pokemon.height.toString()[0]}`
          setHeight(heightRef)
          break
        case 2:
          heightRef = `${pokemon.height.toString()[0]}.${pokemon.height.toString()[1]}`
          setHeight(heightRef)
          break
      }
    }
  }, [render])

  const getEasterEgg = () => {
    document.querySelector("#root").children[0].children[0].children[0].children[0].querySelector("svg").style.display = "flex"
  }

  const takeOutEasterEgg = () => {
    document.querySelector("#root").children[0].children[0].children[0].children[0].querySelector("svg").style.display = "none"
  }

  return (
    <div className={styles.pokedex_container}>
      <div className={styles.pokedex_top}>
        <a href="https://www.linkedin.com/in/matheus-bloize/" target="_blank">
          <div className={`${styles.pokedex_circle1}`} id={id} easter-egg={true.toString()} onMouseOver={() => getEasterEgg()} onMouseOut={() => takeOutEasterEgg()}>
            <BsLinkedin />
          </div>
        </a>
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
          {pokemon.sprites && <img src={`../images/animated/${id}.gif`} alt={pokemon.name} id={id} className={styles.pokemon_image} />}
          {pokemon.name && <p className={styles.pokemon_name}>{pokemon.name}</p>}
          <div className={styles.pokemon_types}>
            {pokemon.types && typeof pokemon.types[1] === "undefined" && (
              <div className={styles.pokemon_type}>
                <div className={styles.pokemon_type_div}>
                  <p>
                    <span className={styles.pokemon_type_style1}>{pokemon.types[0].type.name}</span>
                  </p>
                  <img className={styles.pokemon_type_img1} src={`../images/types-icons/${pokemon.types[0].type.name}.png`} alt={pokemon.types[0].type.name} />
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
                <div className={styles.pokemon_type_div}>
                  <p>
                    <span className={styles.pokemon_type_style1}>{pokemon.types[0].type.name}</span>
                  </p>
                  <img className={styles.pokemon_type_img1} src={`../images/types-icons/${pokemon.types[0].type.name}.png`} alt={pokemon.types[0].type.name} />
                </div>
                <div className={styles.pokemon_type_div}>
                  <p>
                    <span className={styles.pokemon_type_style2}>{pokemon.types[1].type.name}</span>
                  </p>
                  <img className={styles.pokemon_type_img2} src={`../images/types-icons/${pokemon.types[1].type.name}.png`} alt={pokemon.types[1].type.name} />
                </div>
              </div>
            )}
          </div>
          {pokemon.stats && (
            <div className={styles.pokedex_center_stats}>
              <p>hp:{pokemon.stats[0].base_stat}</p>
              <p>attack:{pokemon.stats[1].base_stat}</p>
              <p>defense:{pokemon.stats[2].base_stat}</p>
              <p>height:{height}m</p>
              <p>weight:{weight}kg</p>
            </div>
          )}
          <Link className={styles.pokedex_center_button} to="/"><BsArrowReturnLeft /></Link>
        </div>
      </div>
      <div className={styles.pokedex_right}>
        <div className={styles.pokedex_right1}></div>
        <div className={styles.pokedex_right2}></div>
      </div>
      <div className={styles.pokedex_controller}>
        <Link className={styles.pokedex_controller_top} to={`/pokedex/${parseInt(id) + 1}`} onClick={() => setRender(render + 1)}>
          <BsArrowRight />
        </Link>
        <Link className={styles.pokedex_controller_right} to={`/pokedex/${parseInt(id) + 1}`} onClick={() => setRender(render + 1)}>
          <BsArrowRight />
        </Link>
        <Link className={styles.pokedex_controller_bottom} to={`/pokedex/${parseInt(id) - 1}`} onClick={() => setRender(render + 1)}>
          <BsArrowRight />
        </Link>
        <Link className={styles.pokedex_controller_left} to={`/pokedex/${parseInt(id) - 1}`} onClick={() => setRender(render + 1)}>
          <BsArrowRight />
        </Link>
        <div className={styles.pokedex_controller_mid}></div>
      </div>
    </div>
  )
}

export default Pokedex