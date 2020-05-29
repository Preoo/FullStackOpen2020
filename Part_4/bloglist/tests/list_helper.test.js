const blogs = require('../utils/blogs_for_tests')
const list_helper = require('../utils/list_helper')
describe('list_helper misc', () => {
    test('dummy returns constant', () => {
        const res = list_helper.dummy([])
        expect(res).toBe(1)
    })
})

describe('total likes', () => {
    test('when list has only 1 entry, total likes should equal likes of that entry', () => {
        const blog = blogs[blogs.length * Math.random() | 0] // sample random from blogs
        expect(list_helper.total_likes([blog])).toBe(blog.likes)
    })

    test('when list has many blogs, return correct total', () => {
        const correct = blogs.reduce((a, c) => a + c.likes, 0)
        expect(list_helper.total_likes(blogs)).toBe(correct)
    })

    test('when list is empty, return 0', () => {
        expect(list_helper.total_likes([])).toBe(0)
    })
})

describe('favourite blog', () => {
    test('for empty list return an empty object', () => {
        expect(list_helper.favourite_blog([])).toEqual({})
    })

    test('return correct blog for most likes in correct format', () => {
        const correct = {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            likes: 12
        }
        expect([correct]).toContainEqual(list_helper.favourite_blog(blogs))
    })
})

describe('author by most blogs', () => {
    test('for empty list return an empty object', () => {
        expect(list_helper.most_blogs([])).toEqual({})
    })

    test('return author by most blogs', () => {
        expect([{author: 'Robert C. Martin', blogs: 3}]).toContainEqual(list_helper.most_blogs(blogs))
    })
})

describe('author most likes', () => {
    test('for empty list return an empty object', () => {
        expect(list_helper.most_likes([])).toEqual({})
    })

    test('return author by most likes', () => {
        expect([{author: 'Edsger W. Dijkstra', likes: 17}]).toContainEqual(list_helper.most_likes(blogs))
    })
})