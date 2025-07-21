
import styles from './Post.module.scss'

interface NewPostI {
  onClick: () => void
}

const NewPost = ( props: NewPostI) => {
    const { onClick } = props
    return ( 
            <button className={styles.CreatePost} onClick={onClick} aria-label="Crear nuevo post">
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="#a52a2a"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M12 5V19M5 12H19" stroke="#a52a2a" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </button>
     );
}
 
export default NewPost;