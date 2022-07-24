import logo from '/logo-todo.svg'

import styles from './style.module.css'

export function Header () {
  return (
    <header className={styles.header}>
      <img src={logo} alt="" />
    </header>
  )
}