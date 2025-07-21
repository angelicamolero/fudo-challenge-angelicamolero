import { useState, useRef } from 'react'
import { Comment } from '../types'
import { axiosInstance } from '../services/api'

export const useComments = () => {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState({
    getAll: false,
    create: false,
    delete: false,
  })
  const [error, setError] = useState('')
  const isCached = useRef<{ [key: string]: boolean }>({})

  const getComments = async (postId: string) => {
    if (isCached.current[postId]) return

    setLoading((prev) => ({ ...prev, getAll: true }))

    try {
      const response = await axiosInstance.get<Comment[]>(`/post/${postId}/comment`)
      setComments(response.data)
      
      console.log(response.data)
      isCached.current[postId] = true
    } catch (err) {
      if (err?.response?.status === 404) {
        setComments([])
      } else {
        setError(`Error al cargar comentarios: ${err}`)
      }
    } finally {
      setLoading((prev) => ({ ...prev, getAll: false }))
    }
  }

  const createComment = async (postId: string, data: Omit<Comment, 'id'>) => {
    setLoading((prev) => ({ ...prev, create: true }))

     try {
      const response = await axiosInstance.post<Comment>(`/post/${postId}/comment`, {
        ...data,
        postId,
      })
      setComments((prev) => [...prev, response.data])
      return response?.data
    } catch (err) {
      setError(`Error al crear comentario: ${err}`)
    } finally {
      setLoading((prev) => ({ ...prev, create: false }))
    }
  }

  const deleteComment = async ( postId:string, commentId: string) => {
    setLoading((prev) => ({ ...prev, delete: true }))
    console.log(commentId)
    try {
      const response = await axiosInstance.delete<Comment>(`/post/${postId}/comment/${commentId}`)
      return response?.data
    } catch (err) {
      setError(`Error al eliminar comentario: ${err}`)
      return null
    } finally {
      setLoading((prev) => ({ ...prev, delete: false }))
    }
  }

  const editComment = async (postId: string, commentId: string, updatedData: Partial<Comment>) => {
    try {
      const response = await axiosInstance.put<Comment>(
        `/post/${postId}/comment/${commentId}`,
        updatedData
      )

      setComments(prev =>
        prev.map(comment =>
          comment.id === commentId ? response.data : comment
        )
      )

      return response.data
    } catch (err) {
      setError(`Error al editar comentario: ${err}`)
      return null
    }
  }

  return {
    comments,
    setComments,
    loading,
    error,
    getComments,
    createComment,
    deleteComment,
    editComment
  }
}
