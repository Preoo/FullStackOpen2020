const { palindrome } = require('../utils/for_testing')

describe('palindrome', () => {
    test('of react', () => expect(palindrome('react')).toBe('tcaer'))
    test('of react falsy', () => expect(palindrome('react') === 'tkaer').toBeFalsy())
})