import Header from "../components/Header/Header";
import PostList from "../components/Posts/PostList";
import styles from './Home.module.scss'

const Home = () => {
    
    return ( 
        <div className={styles.home}>
            <Header/>
            <PostList/>
        </div>
     )
}
 
export default Home;