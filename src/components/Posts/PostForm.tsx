import { useEffect, useState } from "react";
import { Post } from "../../types";
import styles from './Post.module.scss'

type PostFormData = Omit<Post, 'id' | 'createdAt'>

interface PostFormI {
  initialData: Post
  onSubmit: (data: PostFormData | Post) => void | Promise<void>
  onCancel?: () => void
  isEditing?: boolean
}

const PostForm = (props: PostFormI) => {
    const { initialData, onSubmit, onCancel, isEditing= false } = props
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        avatar: '',
        name: '',
    })

    useEffect(() => {

    if (initialData) {
      setFormData({
        title: initialData.title,
        content: initialData.content,
        avatar: initialData.avatar,
        name: initialData.name,
      })
    }
  }, [initialData])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const payload = isEditing && initialData.id
            ? { ...formData, id: initialData.id }
            : formData

        onSubmit(payload)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        }

    return ( 
        <form className={styles.PostForm} onSubmit={handleSubmit}>
            <h2 className={styles.PostFormTitle}>{isEditing ? 'Editar Post' : 'Nuevo Post'}</h2>
            {isEditing ? 
                <label htmlFor="title" className={styles.PostForm__label}>Titulo</label> 
            :  null }
             <input
                type="text"
                name="title"
                placeholder="Título"
                value={formData.title}
                onChange={handleChange}
                required
                className={styles.PostFormInput}
            />
            {isEditing ? 
                <label htmlFor="content" className={styles.PostForm__label}>Contenido</label> 
            :  null }
            <textarea
                name="content"
                placeholder="Contenido"
                value={formData.content}
                onChange={handleChange}
                required
                className={styles.PostFormTextArea}
            />

            {isEditing ? 
                <label htmlFor="name" className={styles.PostForm__label}>Nombre del Autor</label> 
            :  null }
            <input
                type="text"
                name="name"
                placeholder="Nombre del autor"
                value={formData.name}
                onChange={handleChange}
                required
                className={styles.PostFormInput}
            />

            {isEditing ? 
                <label htmlFor="avatar" className={styles.PostForm__label}>URL del avatar</label> 
            :  null }
            <input
                type="text"
                name="avatar"
                placeholder="URL del avatar"
                value={formData.avatar}
                onChange={handleChange}
                required
                className={styles.PostFormInput}
            />
            <div className={styles.PostForm__actions}>
                {onCancel && (
                <button type="button" onClick={onCancel} className={styles.cancel}>
                    Cancelar
                </button>
                )}
                <button type="submit" className={styles.submit}>
                   {isEditing ? 'Guardar' : 'Publicar'}
                </button>
            </div>
        </form>
     );
}
 
export default PostForm;