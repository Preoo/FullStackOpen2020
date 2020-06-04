import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('The BlogForm', () => {
    test('BlogForm calls event handler with correct details', () => {
        const mockEventHandler = jest.fn()
        const component = render(<BlogForm addNewBlog={mockEventHandler} />)
        const expected = {
            title: 'TEST_TITLE',
            author: 'TEST_AUTHOR',
            url: 'TEST_URL'
        }
        const inputTitle = component.container.querySelector('#inputTitle')
        const inputAuthor = component.container.querySelector('#inputAuthor')
        const inputUrl = component.container.querySelector('#inputUrl')
        const form = component.container.querySelector('#addBlogForm')

        fireEvent.change(inputTitle, {
            target: { value: expected.title }
        })

        fireEvent.change(inputAuthor, {
            target: { value: expected.author }
        })

        fireEvent.change(inputUrl, {
            target: { value: expected.url }
        })
        fireEvent.submit(form)

        expect(mockEventHandler).toHaveBeenCalled()
        expect(mockEventHandler).toHaveBeenCalledWith(expected)
    })
})