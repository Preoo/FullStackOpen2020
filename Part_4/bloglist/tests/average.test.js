const { average } = require('../utils/for_testing')

describe('average', () => {
    test('of empty array to be zero', () => expect(average([])).toBe(0))

    test('of single value to return identity', () => {
        expect(average([1])).toBe(1)
    })

    test('of many to be correct', () => {
        expect(average([1, 2, 3, 4, 5, 6])).toBe(3.5)
    })
})