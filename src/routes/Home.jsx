import styles from "./Home.module.css"

import PokeCard from "../components/PokeCard"

import { useState } from "react"

const Home = () => {
  const [loading, setLoading] = useState(true)

  const generatePokemons = () => {
    const arr = []
    for (let i = 1; i <= 493; i++) {
      arr.push(<PokeCard number={i} key={i} />)
    }
    return arr
  }

  setTimeout(() => {
    setLoading(false)
  }, 3000)

  return (
    <div className={styles.home_container}>
      <h1>Pokédex</h1>
      {loading && (
        <div className={`${styles.pokedex_container_home}`}>
          <code>Loading...</code>
        </div>
      )}
      {!loading && (
        <div className={styles.pokedex_container_home}>
          {generatePokemons()}
        </div>
      )}
    </div>
  )
}

export default Home