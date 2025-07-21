import { useEffect, useState } from 'react';
import { Avatar } from '../components/Avatar/Avatar';
import { Link, useParams } from 'react-router-dom'
import Header from '../components/Header/Header'
import {usePosts}  from '../hooks/usePosts';
import styles from './PostDetail.module.scss'
import { Post } from '../types';
import { formatDate } from '../utils/formatDate';
import defaultPostImage from '../assets/post-placeholder.png'
import PostActionsMenu from '../components/Posts/PostActionsMenu';
import CommentList from '../components/Comment/CommentList';
import PostForm from '../components/Posts/PostForm';

const PostDetail = () => {
    const { postId } = useParams<{ postId: string }>()
    const { getSinglePost, editPost } = usePosts()
    const [post, setPost] = useState<Post | null>(null)
    const [isEditing, setIsEditing] = useState(false)


    useEffect(() => {
    if (!postId) return

    const fetchData = async () => {
        const fetchedPost = await getSinglePost(postId)
        setPost(fetchedPost)
    }
        fetchData()
    }, [postId])

    const handleEditSubmit = async (data: Partial<Post>) => {
        if (!data.id) return

        const updated = await editPost(data as Post)
        if (updated) {
            setPost(updated)
            setIsEditing(false)
        }
    }

    if (!post) return <p>Loading post...</p>

    return (
       <>
         <Header/>
         <Link to="/" className={styles.GoBack}>← Home</Link>
        <div className={styles.ProductDetail}>
            <main className={styles.PostDetailContainer}>
                <div className={styles.PostDetailContainer__header}>
                    <div className={styles.PostDetail__row__left}>
                        <Avatar
                        src={post?.avatar}
                        alt={`${post?.name}'s avatar`}
                        className={styles.avatar}
                        />
                        <span className={styles.PostDetail__username}>{post?.name}</span>
                    </div>

                    <div className={styles.PostDetail__row__right}>
                        <p className={styles.PostDetail__createdAt}>{formatDate(post?.createdAt ?? '')}</p>
                        <PostActionsMenu
                            post={post}
                            onEdit={() => setIsEditing(true)}
                        />
                    </div>
                </div>

              {isEditing ? (
                    <PostForm
                    initialData={post}
                    isEditing
                    onSubmit={handleEditSubmit}
                    onCancel={() => setIsEditing(false)}
                    />
                ) : (
                    <>
                    <div className={styles.PostDetailContainer__imageContainer}>
                        <img src={defaultPostImage} alt="Imagen del post" className={styles.PostDetailContainer__image} />
                    </div>
                    <h3 className={styles.PostDetailContainer__title}>{post?.title}</h3>
                    <p className={styles.PostDetailContainer__content}>{post?.content}</p>
                    </>
                )}

                <CommentList postId={post.id}/>
            </main>
        </div>
       </>
     );
}
 
export default PostDetail;
