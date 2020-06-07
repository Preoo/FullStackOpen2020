describe('Blog list', () => {
    beforeEach(() => {
        cy.request('POST', 'http://localhost:3003/api/reset')
        cy.request('POST', 'http://localhost:3003/api/users', { user: 'test', username: 'test', password: 'test' })
        cy.visit('http://localhost:3000')
    })
    it('can open front page', () => {
        cy.contains('username')
        cy.contains('password')
        cy.contains('login')
    })

    describe('when not logged in', () => {
        it('logging in works with correct creds', () => {
            cy.get('#usernameInput').type('test')
            cy.get('#passwordInput').type('test')
            cy.get('#loginButton').click()
            cy.contains('Hello test')
        })
        it('logging in fails with wrong password', () => {
            cy.get('#usernameInput').type('test')
            cy.get('#passwordInput').type('wrong')
            cy.get('#loginButton').click()
            cy.contains('Invalid credentials')
        })
        it('logging in fails with nonexisting username', () => {
            cy.get('#usernameInput').type('missing')
            cy.get('#passwordInput').type('wrong')
            cy.get('#loginButton').click()
            cy.contains('Invalid credentials')
        })
    })
    describe('when logged in', () => {
        beforeEach(() => {
            cy.login({ username: 'test', password: 'test' })
        })
        it('user can post new blog', () => {
            const blog = {
                title: 'test_blog',
                author: 'test_author',
                url: 'test_url'
            }
            cy.contains('new blog').click()
            cy.get('#addBlogForm').get('#inputTitle').type(blog.title)
            cy.get('#addBlogForm').get('#inputAuthor').type(blog.author)
            cy.get('#addBlogForm').get('#inputUrl').type(blog.url)
            cy.contains('add').click()
            cy.contains('added blog')
            cy.contains('test_blog')
        })
        it('user can add a like to a blog', () => {
            const blog = {
                title: 'like_test_blog',
                author: 'like_test_author',
                url: 'like_test_url'
            }
            cy.createBlog(blog)
            cy.contains('more').click()
            cy.contains('Likes: 0')
            cy.get('.likeButton').click()
            cy.contains('Likes: 1')
        })
    })
})