'use strict'
const analitic_id = 'post'

module.exports = function (storage, utils, poster) {
    return function (userID, article_id, title, article, created) {
        let post
        let action = 'update'
        //Create domain
        if (!article_id) { //new post
            post = poster.create(userID, title, article, created)
            action = 'create'

        } else {
            post = poster.update(article_id, title, article, created)
        }
        //Save to persistance
        let len = storage.put(post)
        utils.analytics(userID, action, post.id, new Date().getTime())
        //utils.social(userid, post.id)
        return len
    }
}