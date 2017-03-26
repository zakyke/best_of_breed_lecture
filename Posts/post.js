'use strict'

module.exports = function (utils, getPost) {
    return {
        create: function (user, title, article, created) {
            //validation
            if (!title || title.length < 25) {
                throw new Error(`short title`)
            }

            //Create id
            let id = utils.idMaker(user, title, created)
            //Grammer
            article = utils.grammerer(article)
            //Tags
            let tags = utils.tagger(article)
            return {
                id: id,
                title: title,
                tags: tags,
                article: article,
                version_date: created
            }
        },

        update: function (id, title, article, created) {
            //validation
            if (!title || title.length < 25) {
                throw new Error(`short title`)
            }

            let post = getPost(id)
            post.title = title
            //Grammer
            post.article = util.grammerer(article)
            //Tags
            post.tags = util.tagger(post.article)
            post.version_date = created
            return post
        },
    };
}