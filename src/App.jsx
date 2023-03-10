import styles from './App.module.css'

import background from "./assets/background.jpg"

import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div className={styles.app}>
      <Outlet />
      <img src={background} className={styles.background} alt="Background" />
    </div>
  )
}

export default App
