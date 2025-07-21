import { useEffect, useMemo } from 'react'
import { useComments } from '../../hooks/useComments'
import {Comment} from '../../types/index'
import styles from './Comment.module.scss'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'

interface CommentListProps {
  postId: string
}

const CommentList = ({ postId }: CommentListProps) => {
  const { comments, loading, error, getComments, createComment, setComments, editComment } = useComments()

 const topLevelComments = useMemo(() => {
    return comments.filter(
      (comment) => comment.parentId === null && comment.postId === postId
    )
  }, [comments, postId])
  
  const handleCreateComment = async (data: Omit<Comment, 'id'>) => {
        await createComment(postId, data)
  }

  const handleDeleteFromList = (deletedId: string) => {
    setComments(prev => prev.filter(comment => comment.id !== deletedId))
  }

  const handleEditComment = async (updatedComment: Partial<Comment> & { id: string }): Promise<boolean> => {
    if (!updatedComment.id) return false
    const updated = await editComment(postId, updatedComment.id, updatedComment)
    if (updated) {
      setComments(prev =>
        prev.map(comment =>
          comment.id === updated.id ? updated : comment
        )
      )
      return true
    }
    return false
  }

  useEffect(() => {
    if (postId){
        getComments(postId)
    }
  }, [postId])


  if (loading?.getAll) return <p>Cargando comentarios...</p>

  let content;

  if (!loading?.getAll && !error && topLevelComments.length === 0) {
    content = <p className={styles.CommentError}>No hay comentarios todavía.</p>
  } else if (error) {
    content = <p className={styles.CommentError}>Error al cargar comentarios.</p>
  } else {
    content = (
      <>
        <h4 className={styles.CommentList__title}>
          Comentarios <span className={styles.CommentList__length}>{topLevelComments.length}</span>
        </h4>
        {topLevelComments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            postId={postId}
            onDeleted={handleDeleteFromList}
            onEdited={handleEditComment}
          />
        ))}
      </>
    )
  }

  return (
    <div className={styles.CommentList}>
       <CommentForm onSubmit={handleCreateComment}/>
       {content}
    </div>
  )
}

export default CommentList
