import { NavLink } from 'react-router-dom'
import styles from './PageNav.module.css'

export default function PageNav () {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to='/'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/pricing'>Pricing</NavLink>
        </li>
        <li>
          <NavLink to='/products'>Product</NavLink>
        </li>
      </ul>
    </nav>
  )
}
