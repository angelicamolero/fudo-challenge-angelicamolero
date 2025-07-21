import { Comment as CommentType } from '../../types'
import styles from './Comment.module.scss'
import { Avatar } from '../Avatar/Avatar'
import { formatDate } from '../../utils/formatDate'
import CommentActionsMenu from './CommentActionsMenu'
import { useState } from 'react'
import CommentForm from './CommentForm'

interface CommentProps {
  comment: CommentType
  postId: string
  onDeleted: (id: string) => void
  onEdited?: (updatedComment: Partial<CommentType> & { id: string }) => Promise<boolean>
}

const CommentItem = ({ postId, comment, onDeleted, onEdited}: CommentProps) => {

  const [isEditing, setIsEditing] = useState(false)

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const handleEditSubmit = async (data: Partial<CommentType>) => {
    if (!onEdited) return
    const updated = await onEdited({ ...data, id: comment.id })
    if (updated) {
      setIsEditing(false)
    }
  }

  return (
    <div className={styles.commentItem}>
        {isEditing ? (
        <CommentForm
          initialData={comment}
          onSubmit={handleEditSubmit}
          onCancel={handleCancel}
          isEditing
        />
      ) : (
        <>
          <div className={styles.commentItem__container}>
            <div className={styles.commentItem__rows}>
              <Avatar
                src={comment?.avatar}
                alt={`${comment?.name}'s avatar`}
                className={styles.avatar}
              />
              <p className={styles.comment__author}>{comment.name}</p>
              <p className={styles.PostDetail__createdAt}>
                {formatDate(comment?.createdAt ?? '')}
              </p>
            </div>
            <p className={styles.comment__text}>{comment.content}</p>
          </div>
          <CommentActionsMenu
            onDeleted={onDeleted}
            comment={comment}
            postId={postId}
            onEdit={handleEditClick}
          />
        </>
      )}
    </div>
  )
}

export default CommentItem
