// eslint-disable-next-line no-unused-vars
const dummy = blogs => {
    return 1
}

const total_likes = blogs => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favourite_blog = blogs => blogs

const most_blogs = blogs => blogs

const most_likes = blogs => blogs

module.exports = {
    dummy,
    total_likes,
    favourite_blog,
    most_blogs,
    most_likes
}