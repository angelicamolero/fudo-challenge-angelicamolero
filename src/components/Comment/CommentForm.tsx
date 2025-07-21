import { useState } from 'react'
import styles from './Comment.module.scss'
import { Comment } from '../../types'

interface CommentFormProps {
  onSubmit: (data: Omit<Comment, 'id'>) => void
  onCancel?: () => void
  initialData?: Partial<Comment>
  isEditing?: boolean
}

const CommentForm = ({ onSubmit, onCancel, initialData, isEditing }: CommentFormProps) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    avatar: initialData?.avatar || '',
    content: initialData?.content || '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    onSubmit({
      ...formData,
      createdAt: new Date().toISOString(),
      parentId: null,
    })

    setFormData({
        name: '',
        avatar: '',
        content: '',
    })
  }

  return (
    <form className={styles.CommentForm} onSubmit={handleSubmit}>
      <h3 className={styles.CommentForm__title}>{isEditing ? 'Editar comentario' : 'Comenta'}</h3>

      <div className={styles.CommentForm__inputs}>
        <input
            type="text"
            name="name"
            placeholder="Tu nombre"
            value={formData.name}
            onChange={handleChange}
            required
        />

        <input
            type="text"
            name="avatar"
            placeholder="URL del avatar"
            value={formData.avatar}
            onChange={handleChange}
            required
        />
      </div>

      <div className={styles.CommentForm__textarea}>
        <textarea
            name="content"
            placeholder="Escribí tu comentario..."
            value={formData.content}
            onChange={handleChange}
            required
        />
        <div className={styles.CommentForm__actions}>
            {onCancel && (
            <button type="button" onClick={onCancel} className={styles.cancel}>
                Cancelar
            </button>
            )}
            <button type="submit" className={styles.submit}>
            {isEditing ? 'Guardar' : 'Comentar'}
            </button>
        </div>
      </div>

    </form>
  )
}

export default CommentForm
