// eslint-disable-next-line no-unused-vars
const dummy = blogs => {
    return 1
}

const total_likes = blogs => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favourite_blog = blogs => {
    if (!blogs.length) return {}
    const fav = blogs.reduce((fav_blog, blog) => blog.likes > fav_blog.likes ? blog : fav_blog, {likes: -Infinity})
    return {
        title: fav.title,
        author: fav.author,
        likes: fav.likes
    }
}

// below is terribad func, should be replaced by _.countBy and max or reduce
const most_blogs = blogs => {
    if (!blogs.length) return {}
    const authors_by_blogs = new Map()
    blogs.forEach(blog => {
        const author = blog.author
        authors_by_blogs.has(author)
            ? authors_by_blogs.set(author, authors_by_blogs.get(author) + 1)
            : authors_by_blogs.set(author, 1)
    })
    const [top_author, top_blogs] = [...authors_by_blogs.entries()].reduce((a,c) => c[1] > a[1] ? c : a)
    // has form [<author_name>, <num_of_blogs>] and it will be author with most blogs in input list
    return {
        author: top_author,
        blogs: top_blogs
    }
}

const most_likes = blogs => {
    if (!blogs.length) return {}
    const counting = {}
    blogs.forEach(blog => {
        const a = blog.author
        const l = blog.likes
        hasOwnProperty.call(counting, a)
            ? counting[a] += l
            : counting[a] = l
    })
    const [top_author, top_likes] = Object.entries(counting).sort((a,b) => a[1] - b[1]).pop()
    return {
        author: top_author,
        likes: top_likes
    }
}

module.exports = {
    dummy,
    total_likes,
    favourite_blog,
    most_blogs,
    most_likes
}