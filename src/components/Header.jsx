import styles from '../styles/Header.module.css';

const Header = () => {
  return(
    <header>
      <nav className={styles.nav}>
        <h1>Where in the world?</h1>
        <p>Dark Mode</p>
      </nav>
    </header>
  )
}

export default Header