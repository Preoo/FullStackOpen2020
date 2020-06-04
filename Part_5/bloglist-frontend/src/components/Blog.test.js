import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('A blog', () => {
    const blog = {
        title: 'TEST_TITLE',
        author: 'TEST_AUTHOR',
        url: 'TEST_URL',
        likes: 0,
    }
    let component
    beforeEach(() => {
        component = render(
            <Blog blog={blog} />
        )
    })
    test('renders content', () => {
        expect(component.container).toHaveTextContent(
            'TEST_TITLE'
        )
    })

    test('will not render details by default', () => {
        const div = component.container.querySelector('.blog_details')
        expect(div).toHaveStyle('display: none')
        const button = component.container.querySelector('.toggleDetails')
        expect(button).toHaveTextContent('more')
    })

    test('will show details after clicking show more button', () => {
        const button = component.container.querySelector('.toggleDetails')
        fireEvent.click(button)
        const div = component.container.querySelector('.blog_details')
        expect(div).not.toHaveStyle('display: none')
        expect(button).toHaveTextContent('less')
    })

    test('clicking like button will call passed in event handler', () => {
        const mockOnLikeBlog = jest.fn()
        component = render(
            <Blog blog={blog} onLikeBlog={mockOnLikeBlog} />
        )
        const likeButton = component.container.querySelector('.likeButton')
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)
        expect(mockOnLikeBlog).toHaveBeenCalledTimes(2)
    })
})

