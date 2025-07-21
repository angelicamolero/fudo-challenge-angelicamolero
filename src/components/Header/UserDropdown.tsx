import styles from './Header.module.scss'

type Props = {
  name: string
}

const UserDropdown = (Props) => {
    const { name } = Props
    return (
        <div role="menu" className={styles.Dropdown}>{name}</div>
      )
}
 
export default UserDropdown;