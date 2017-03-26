'use strict'

const repository = require("./../persistance/storageArray").repository

// "search engine"
function* search(term, offset, limit) {
    if (!limit || limit > 1000) {
        limit = 1000
    }
    //search_engin.search(term,limit)
    // let ids = [{
    //     id: 'gafa',
    //     title: "post 1",
    //     userName: "zaky"
    // }, {
    //     id: 'srhptihj',
    //     title: "post 2",
    //     userName: "zaky"
    // }]
    return repository()
}

//retm = mostpopolar, latest, userid
function list(term_name, term_value, offset, limit) {
    switch (term_name) {
        case "all":
            break;
        case "mostpopolar":
            if (!term_value) {
                term_value = "current_date"
            }
            break;
        case "userid":
            if (!term_value) {
                return //with error
            }
            break;
        default:
            term_name = "latest"
            if (!term_value) {
                term_value = "current_date"
            }
    }
    //Create search term from term_name and term_value
    let q = term_name + term_value
    let results = search(q, offset, limit)
    return repository()
}

module.exports = {
    list: list, //use to be in databse
    search: search // use to be in database
}