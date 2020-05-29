const blogs = require('../utils/blogs_for_tests')
const list_helper = require('../utils/list_helper')

test('dummy returns constant', () => {
    const res = list_helper.dummy([])
    expect(res).toBe(1)
})