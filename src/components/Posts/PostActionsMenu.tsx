import { useState, useRef } from 'react'
import styles from './Post.module.scss'
import { Post } from '../../types'
import { usePosts } from '../../hooks/usePosts'
import { useNavigate } from 'react-router-dom'


interface PostActionsMenuProps { 
  post: Post
  onEdit: (post: Post) => void
}

const PostActionsMenu = ({ post, onEdit }: PostActionsMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const { deletePost } = usePosts()
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const navigate = useNavigate()

    const handleDelete = async () => {
         if (!post.id) return

        const deleted = await deletePost(post.id)

        if (deleted) {
            setIsConfirmOpen(false)
            setShowSuccess(true)
            
           setTimeout(() => {
             navigate('/')
           }, 3000);
        }
    }

  return (
    <div className={styles.PostActionsMenu} ref={menuRef}>
      <button
        className={styles.PostActionsMenu__button}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Mostrar opciones del post"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <circle cx="12" cy="5" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="19" r="2" />
        </svg>
      </button>

      {isOpen && (
        <div className={styles.PostActionsMenu__dropdown}>
          <button onClick={() => {
            setIsConfirmOpen(true) 
            setIsOpen(false)}} className={styles.PostActionsMenu__option}>
            Eliminar
          </button>
          
          {onEdit && (
            <button onClick={() => {
              setIsOpen(false)
              onEdit(post)}} className={styles.PostActionsMenu__option}>
              Editar
            </button>
          )}
        </div>
      )}

    {isConfirmOpen && (
      <div role='button' className={styles.overlay} onClick={() => setIsConfirmOpen(false)}>
          <div role='button'  className={styles.confirmModal} onClick={(e) => e.stopPropagation()}>
          <p>¿Estás segura/o que querés eliminar este post?</p>
          <div className={styles.actions}>
              <button onClick={() => setIsConfirmOpen(false)}>Cancelar</button>
              <button onClick={handleDelete}>Eliminar</button>
          </div>
          </div>
      </div>
    )}

    {showSuccess && (
        <p className={styles.successMessage}>✅ Post eliminado con éxito</p>
    )}
    </div>
  )
}

export default PostActionsMenu
