describe('Blog list', () => {
    beforeEach(() => {
        cy.request('POST', 'http://localhost:3003/api/reset')
        cy.visit('http://localhost:3000')
    })
    it('can open front page', () => {
        cy.contains('username')
        cy.contains('password')
        cy.contains('login')
    })

    describe('when not logged in', () => {
        beforeEach(() => {
            cy.request('POST', 'http://localhost:3003/api/users', { user: 'test', username: 'test', password: 'test' })
        })
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
    // describe('when logged in', () => {

    // })
})