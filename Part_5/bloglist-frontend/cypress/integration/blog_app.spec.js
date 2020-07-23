describe('Blog list', () => {
    beforeEach(() => {
        cy.request('POST', 'http://localhost:3003/api/reset')
        cy.request(
            'POST',
            'http://localhost:3003/api/users',
            { user: 'test', username: 'test', password: 'test' }
        )
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
            cy.get('.like_Button').click()
            cy.contains('Likes: 1')
        })
        it('user can delete added blog', () => {
            const blog = {
                title: 'delete_test_blog',
                author: 'delete_test_author',
                url: 'delete_test_url'
            }
            cy.createBlog(blog)
            cy.contains('more').click()
            cy.contains('remove').click()
            cy.contains(blog.title).should('not.exist')
        })
        it('blogs are (desc.) sorted w.r.t to likes', () => {
            // due to way backend handes creatin of new blogs
            // likes property can be passed in here
            const blog1 = {
                title: 'order_test_blog_1',
                author: 'order_test_author_1',
                url: 'order_test_url_1',
                likes: 1
            }
            const blog2 = {
                title: 'order_test_blog_2',
                author: 'order_test_author_2',
                url: 'order_test_url_2',
                likes: 2
            }
            cy.createBlog(blog1)
            cy.createBlog(blog2)
            // yes, these are brittle, I know.
            //Just disposable code (this tiem for real) so no matter.
            cy.get('.blog_main').as('blogs')
            cy.get('@blogs').first().contains('more').click()
            cy.get('@blogs').first().should('contain', 'Likes: 2')
            cy.get('@blogs').first().should('contain', 'order_test_blog_2')

            cy.get('@blogs').last().contains('more').click()
            cy.get('@blogs').last().should('contain', 'Likes: 1')
        })
    })
})