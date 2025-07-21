import { renderHook, act } from '@testing-library/react'
import { useComments } from './useComments'
import { axiosInstance } from '../services/api'
import { Comment } from '../types'

jest.mock('../services/api')

const mockedAxios = axiosInstance as jest.Mocked<typeof axiosInstance>

const sampleComment: Comment = {
  id: '1',
  name: 'Ana',
  avatar: 'ttps://i.pravatar.cc/150?img=47',
  content: 'Comentario de prueba',
  createdAt: '2023-01-01T00:00:00Z',
  parentId: null,
  postId: '123'
}

describe('useComments', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('trae todos los comentarios', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [sampleComment] })

    const { result } = renderHook(() => useComments())

    await act(() => result.current.getComments('123'))

    expect(mockedAxios.get).toHaveBeenCalledWith('/post/123/comment')
    expect(result.current.comments).toEqual([sampleComment])
  })

  it('Crea comentarios', async () => {
    const { id, ...commentWithoutId } = sampleComment
    mockedAxios.post.mockResolvedValueOnce({ data: sampleComment })

    const { result } = renderHook(() => useComments())

    await act(() => result.current.createComment('123', commentWithoutId))

    expect(mockedAxios.post).toHaveBeenCalledWith('/post/123/comment', {
      ...commentWithoutId,
      postId: '123',
    })
    expect(result.current.comments).toContainEqual(sampleComment)
  })
})
