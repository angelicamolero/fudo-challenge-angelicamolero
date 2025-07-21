import { useEffect, useRef, useState } from "react"
import { Post } from "../types"
import { axiosInstance } from "../services/api"

export const usePosts = () => {
 
    const [posts, setPosts] = useState<Post[]>([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState({
        getAll: false,
        getSingle: false,
        create: false,
        delete: false,
        edit: false,
    })

    const isCached= useRef(false)

    const getPosts = async () => {

        if(isCached.current) return
        setLoading(prev => ({ ...prev, getAll: true }))

        try {
            const response = await axiosInstance.get<Post[]>('/post')
            setPosts(response?.data)
            isCached.current = true

        } catch (error) {
            setError(`Error cargando los posts, ${error}`)
        } finally {
            setLoading(prev => ({ ...prev, getAll: false }))
        }
    }

     const getSinglePost = async (postId: string): Promise<Post | null> => {
        setLoading(prev => ({ ...prev, getSingle: true }))
        try {
            const response = await axiosInstance.get<Post>(`/post/${postId}`)

            return response?.data
        } catch (error) {
             setError(`Error al cargar el post, ${error}`)
            return null
        } finally {
            setLoading(prev => ({ ...prev, getSingle: false }))
        }
    }

    const createPost = async (data: Partial<Post>): Promise<Post | null> => {
        setLoading((prev) => ({ ...prev, create: true }))
        try {
            const response = await axiosInstance.post<Post>('/post', data)
            setPosts((prev) => [response.data, ...prev])
            return response?.data
        } catch (error) {
            setError(`Error al crear el post: ${error}`)
            return null
        } finally {
            setLoading((prev) => ({ ...prev, create: false }))
        }
    }

    const deletePost = async (postId: string): Promise<Post | null> => {
         setLoading((prev) => ({ ...prev, delete: true }))
        try {
            const response = await axiosInstance.delete<Post>(`/post/${postId}`)
            return response?.data
        } catch (error) {
            setError(`Error al eliminar el post, ${error}`)
            return null
        } finally {
            setLoading((prev) => ({ ...prev, delete: false }))
        }
    }

    const editPost = async (data: Post): Promise<Post | null> => {
        setLoading((prev) => ({ ...prev, edit: true }))

        try {
            const response = await axiosInstance.put<Post>(`/post/${data.id}`, data)

            setPosts((prev) =>
                prev.map((post) => (post.id === data.id ? response.data : post))
            )
            return response.data
        } catch (error) {
            setError(`Error al editar el post: ${error}`)
            return null
        } finally {
            setLoading((prev) => ({ ...prev, edit: false }))
        }
    }


    useEffect(() => {
        getPosts()
    }, [])

    return{
        posts,
        loading,
        error,
        getPosts,
        getSinglePost,
        createPost,
        deletePost,
        editPost
    }
    
}