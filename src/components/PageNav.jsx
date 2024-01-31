import { NavLink } from 'react-router-dom'
import styles from './PageNav.module.css'
import Logo from './Logo'
import { useAuth } from '../contexts/FakeAuthContext'
export default function PageNav () {
  const { isAuthenticated } = useAuth()
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to='/pricing'>Pricing</NavLink>
        </li>
        <li>
          <NavLink to='/products'>Product</NavLink>
        </li>
        {!isAuthenticated ? (
          <li>
            <NavLink to='/login' className={styles.ctaLink}>
              Login
            </NavLink>
          </li>
        ) : (
          ''
        )}
      </ul>
    </nav>
  )
}
