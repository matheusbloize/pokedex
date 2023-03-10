import styles from "./ErrorPage.module.css"

import error from "../assets/error.png"

import { useNavigate } from "react-router-dom"

const ErrorPage = () => {
  const navigate = useNavigate()

  setTimeout(()=> {
    navigate("/")
  }, 5000)

  return (
    <div className={styles.error}>
      <span>Aconteceu algum erro, redirecionando para a página inicial!</span>
      <img src={error} alt="Imagem de Erro" />
    </div>
  )
}

export default ErrorPage