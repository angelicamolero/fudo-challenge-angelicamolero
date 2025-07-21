import { render, screen, fireEvent } from '@testing-library/react'
import CommentForm from './CommentForm'

describe('CommentForm', () => {
  it('should submit the form with correct data', () => {
    const mockOnSubmit = jest.fn()

    render(<CommentForm onSubmit={mockOnSubmit} />)

    const nameInput = screen.getByPlaceholderText('Tu nombre')
    const avatarInput = screen.getByPlaceholderText('URL del avatar')
    const commentTextarea = screen.getByPlaceholderText('Escribí tu comentario...')
    const submitButton = screen.getByRole('button', { name: /comentar/i })

    fireEvent.change(nameInput, { target: { value: 'Angie' } })
    fireEvent.change(avatarInput, { target: { value: 'https://i.pravatar.cc/150?img=47' } })
    fireEvent.change(commentTextarea, { target: { value: '¡Qué buen post!' } })

    fireEvent.click(submitButton)

    expect(mockOnSubmit).toHaveBeenCalledTimes(1)

    const submittedData = mockOnSubmit.mock.calls[0][0]

    expect(submittedData).toMatchObject({
      name: 'Angie',
      avatar: 'https://i.pravatar.cc/150?img=47',
      content: '¡Qué buen post!',
      parentId: null,
    })

    expect(new Date(submittedData.createdAt).toString()).not.toBe('Invalid Date')
  })

    it('should not call onSubmit if required fields are missing', () => {
    const mockOnSubmit = jest.fn()

    render(<CommentForm onSubmit={mockOnSubmit} />)

    fireEvent.change(screen.getByPlaceholderText('Tu nombre'), {
      target: { value: 'Ana' },
    })

    fireEvent.change(screen.getByPlaceholderText('URL del avatar'), {
      target: { value: 'https://avatar.com' },
    })

    fireEvent.click(screen.getByRole('button', { name: /comentar/i }))

    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

})
