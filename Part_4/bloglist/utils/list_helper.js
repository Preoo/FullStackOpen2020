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

const most_blogs = blogs => blogs

const most_likes = blogs => blogs

module.exports = {
    dummy,
    total_likes,
    favourite_blog,
    most_blogs,
    most_likes
}