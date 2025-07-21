import { Post } from "../../types";
import { formatDate } from "../../utils/formatDate";
import styles from './Post.module.scss'
import { Avatar } from "../Avatar/Avatar";
import defaultPostImage from '../../assets/post-placeholder.png'
import { Link } from "react-router-dom";

interface PostI {
    post: Post
}

const PostCard = (props: PostI) => {
    const { post } = props
    const preview = post?.content.length > 60 ?
    post.content.slice(0, 60) + '...' : post?.content

    return (
        <Link to={`/post/${post?.id}`} className={styles.PostCardLink}>
            <div className={styles.PostCardContainer}>
            <div>
                <div className={styles.PostCard__header}>
                    <img className={styles.PostCard__image} src={defaultPostImage} alt=''/>
                    <Avatar
                        src={post.avatar}
                        alt={`${post.name}'s avatar`}
                        className={styles.avatar}
                    />
                    <span className={styles.PostUserName}>{post?.name}</span>
            </div>
            <div className={styles.PostCard__preview}>
                    <h3 className={styles.PostTitle}>{post?.title}</h3>
                    <p className={styles.PostContent}>{preview}</p>
            </div>
            </div>
                <span className={styles.PostCreatedAt}>{formatDate(post?.createdAt)}</span>
            </div>
        </Link> 
       
     );
}
 
export default PostCard;