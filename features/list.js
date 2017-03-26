'use strict'


module.exports = function (storage, analitcs) {
    return function (userID, term_name, term_value, offset, limit) {
        if (Number(userID) == NaN) {
            term_name = "latest"
        } else {
            term_name = "userid"
            term_value = userID
        }
        analitcs(userID, `list`, term_name + term_value + offset + limit, new Date().getTime())

        return storage.list(term_name, term_value, offset, limit)
    }
}