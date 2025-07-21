import { useState } from 'react'
import {usePosts} from '../../hooks/usePosts'
import styles from './Post.module.scss'
import PostCard from './PostCard'
import NewPost from './NewPost'
import PostForm from './PostForm'
import { Post } from '../../types'

const PostList = () => {
    const {posts, loading, error, createPost} = usePosts()
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [showToast, setShowToast] = useState(false)

    if (loading.getAll) return <p>Cargando posts...</p>
    if (error) return <p>Error al cargar los posts.</p>
    if (!posts || posts.length === 0) return <p>No hay posts todavía.</p>

   const handleCreatePost = async (data: Omit<Post, 'id' | 'createdAt'>) => {
        const postWithDate = {
        ...data,
        createdAt: new Date().toISOString(),
        }
        try {
            await createPost(postWithDate)
            setShowToast(true)
            setIsFormOpen(false)

            setTimeout(() => {
            setShowToast(false)
            }, 3000) 
        } catch (err) {
            console.error('Error al crear el post', err)
        }
    }

    return (
        <div className={styles.PostListContainer}>
            <NewPost onClick={() => setIsFormOpen(true)} />
            {isFormOpen && (
                <div role='button' className={styles.overlay} onClick={() => setIsFormOpen(false)}>
                    <div role='button' onClick={(e) => e.stopPropagation()} className={styles.PostFormContainer}>
                        <PostForm
                            initialData={{
                                title: '',
                                content: '',
                                avatar: '',
                                name: '',
                                id: '',
                                createdAt: '',
                            }}
                            onSubmit={handleCreatePost}
                            onCancel={() => setIsFormOpen(false)}
                        />
                    </div>
                </div>
            )}

             {showToast && (
                <p className={styles.successMessage}>✅ Post creado con éxito</p>
            )}
            
            {posts.map((post:any) => (
                <PostCard key={post?.id} post={post}/>
            ))}
        </div>
    )
}
 
export default PostList;
