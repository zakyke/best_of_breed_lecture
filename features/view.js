'use strict'


module.exports = function (storage, utils) {
    return function (userID, articleID) {
        //Check in usage if user can read the article
        utils.analytics(userID, `view`, articleID, new Date().getTime())
        let post = storage.get(articleID)
        post.article =  utils.augment(post.article)
        //If err write error analitics
        //utils.analytics(userID, `view-err`, articleID, new Date().getTime())
        //return eror
        //post.article = utils.augment(post.article)
        return post
    }
}