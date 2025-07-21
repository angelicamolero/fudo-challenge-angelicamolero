import { useState } from "react";
import { currentUser } from "../../constants/currentUser";
import UserDropdown from "./UserDropdown";
import styles from './Header.module.scss'

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleDropdown = () => {
        setIsOpen(prev => !prev)
    }

    return ( 
        <header className={styles.HeaderContainer}>
            <div className={styles.HeaderContainer__logoContainer}>
                <a className={styles.HeaderContainer__logo} href="/">Postea</a>
            </div>
            <div className={styles.HeaderContainer__searchbar}>
                <input placeholder="Search" type="text" className={styles.HeaderContainer__searchbar__input}/>
            </div>
            <div className={styles.HeaderContainer__userContainer}>
                <img src={currentUser?.avatar} alt={currentUser?.name} className={styles.HeaderContainer__avatar}/>
                <button
                    onClick={toggleDropdown}
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    aria-label="Open Dropdown"
                    className={styles.HeaderContainer__dropdown__button}
                    >
                     <svg
                        className={`${styles.arrowIcon} ${isOpen ? styles.open : ''}`}
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#a52a2a"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        >
                        <polyline points="6 9 12 15 18 9" />
                        </svg>
                    {isOpen && <UserDropdown name={currentUser?.name}/>}
                </button>
            </div>
        </header>
     )

}
 
export default Header;