import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
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
    })
})

