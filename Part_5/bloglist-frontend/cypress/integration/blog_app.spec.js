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
})