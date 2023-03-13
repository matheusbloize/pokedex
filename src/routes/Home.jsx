import styles from "./Home.module.css"

import PokeCard from "../components/PokeCard"

import { useState } from "react"

const Home = () => {
  const [loading, setLoading] = useState(true)

  const generatePokemon = () => {
    const arr = []
    for (let i = 1; i <= 151; i++) {
      arr.push(<PokeCard number={i} key={i} />)
    }
    return arr
  }

  const showPokemon = () => {
    return generatePokemon()
  }

  setTimeout(() => {
    setLoading(false)
  }, 4900)

  setTimeout(() => {
    if(document.querySelector("#root").children[0].children[0].children[1].classList.length >= 2 && document.querySelector("#root").children[0].children[0].children[1].classList[1].includes("start")) {
      document.querySelector("#root").children[0].children[0].children[1].style.marginTop = "2em"
    }
  }, 5000)

  return (
    <div className={styles.home_container}>
      <h1>Pokédex</h1>
      {loading && (
        <div className={`${styles.pokedex_container_home}`}>
          <code>Loading...</code>
        </div>
      )}
      <div className={`${styles.pokedex_container_home} ${styles.pokedex_start}`}>
        {showPokemon()}
      </div>
    </div>
  )
}

export default Home