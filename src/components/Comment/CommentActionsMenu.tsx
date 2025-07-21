import { useState, useRef } from 'react'
import styles from './Comment.module.scss'
import { Comment } from '../../types'
import { useComments } from '../../hooks/useComments'

interface CommentActionsMenuProps {
  comment: Comment
  postId: string
  onDeleted?: (commentId: string) => void
  onEdit?: () => void
}

const CommentActionsMenu = ({ comment, postId, onDeleted, onEdit }: CommentActionsMenuProps) => {

  const [isOpen, setIsOpen] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const { deleteComment } = useComments()

  const handleDelete = async () => {

    if (!comment.id) return

    const deleted = await deleteComment(postId, comment.id)

    if (deleted) {
      setIsConfirmOpen(false)
      onDeleted?.(comment.id) 
    }
  }

  return (
    <div className={styles.CommentActionsMenu} ref={menuRef}>
      <button
        className={styles.CommentActionsMenu__button}
        onClick={() => setIsOpen(prev => !prev)}
        aria-label="Mostrar opciones del comentario"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <circle cx="12" cy="5" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="19" r="2" />
        </svg>
      </button>

      {isOpen && (
        <div className={styles.CommentActionsMenu__dropdown}>
          {onEdit && (
            <button
              onClick={() => {
                setIsOpen(false)
                onEdit()
              }}
              className={styles.CommentActionsMenu__option}
            >
              Editar
            </button>
          )}
          <button
            onClick={() => {
              setIsConfirmOpen(true)
              setIsOpen(false)
            }}
            className={styles.CommentActionsMenu__option}
          >
            Eliminar
          </button>
        </div>
      )}

      {isConfirmOpen && (
        <div role='button' className={styles.overlay} onClick={() => setIsConfirmOpen(false)}>
          <div role='button' className={styles.confirmModal} onClick={(e) => e.stopPropagation()}>
            <p>¿Querés eliminar este comentario?</p>
            <div className={styles.actions}>
              <button onClick={() => setIsConfirmOpen(false)}>Cancelar</button>
              <button onClick={handleDelete}>Eliminar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CommentActionsMenu
