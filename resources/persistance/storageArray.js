'use strict'

// "database"

function repository() {
    return posts
}

var posts = [];

function put(post) {
    posts.push(post)
    return post.id
}

function get(id) {
    for (var i = posts.length - 1; i >= 0; i--) {
        console.log(`${posts[i].id} = ${id}`)
        if (posts[i].id == id) {
            return posts[i];
        }
    }
    return null
}

function del(post) {
    for (var i = posts.length - 1; i >= 0; i--) {
        if (posts[i].id === id) {
            posts.splice(i, 1);
        }
    }
}

module.exports = {
    put: put,
    get: get,
    del: del,
    repository: repository,
}