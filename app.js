'use strict'

/**
 * Module dependencies.
 */

var logger = require('koa-logger');
var route = require('koa-route');
var parse = require('co-body');
var koa = require('koa');

const searchProvider = require('./resources/search/searchArray');
const storageProvider = require('./resources/persistance/storageArray');
const UI = require('./UIweb/resources/render');

let storage = function () {}
storage.search = searchProvider.search
storage.list = searchProvider.list
storage.put = storageProvider.put
storage.get = storageProvider.get
storage.del = storageProvider.del

let utils = function () {}

//In order to change tagger from library to wrapper
//tagger = require('./resources/tagsYahoo')(httpClient)
utils.tagger = require('./resources/tags');
utils.analytics = function (userID, action, value, time) {}
utils.grammerer = require('./resources/grammer');
utils.idMaker = require('./resources/id_maker');

//This way augment is shot down
utils.augment = function (article) {
  return article + `<a href = "">Buy this book</a>`
}

const poster = require('./Posts/post')(utils, storage.get)

let features = function () {}
features.list = require('./features/list')(storage, utils.analytics)
features.view = require('./features/view')(storage, utils)
features.put = require('./features/add')(storage, utils, poster)

let settings = function () {}
//unmarshal yml to settings
settings.defaultPageLimit = 25





var app = createApp();


function createApp() {
  let koaapp = koa()

  koaapp.use(logger());

  // route 


  koaapp.use(route.get('/post/ui/new', newUIResource));
  koaapp.use(route.get('/post/ui/', listUIResource(storage)));
  
  koaapp.use(route.get('/',  listUIResource(storage)));
  koaapp.use(route.get('/post/', listResource(features, settings)));
  koaapp.use(route.post('/post', addResource(features)));
  koaapp.use(route.put('/post/:id', addResource(features)));
  koaapp.use(route.get('/post/:id', viewResource(features, storage)));




  return koaapp
}

// listen 
console.log(`Running on http://127.0.0.1:3000`)
if (!module.parent) app.listen(3000);

module.exports = app;

function indexUIResource() {
  return function* () {
    this.body = yield UI('index');
  }
}

function newUIResource() {
  return function* () {
    this.body = yield UI('new');
  }
}

function listUIResource(storage) {
  return function* () {
    this.body = yield UI('list', {
      posts: storage.list()
    });
  }
}

function listResource(featureProvider, settingsProvider) {
  return function* () {
    let offset = this.request.query.offset

    if (isNaN(offset) || Number(offset) < 1) {
      offset = 0
    }
    let limit = this.request.query.limit
    if (isNaN(limit) || Number(limit) < 1 || Number(limit) > 100) {
      limit = settingsProvider.defaultPageLimit
    }
    let userID = 9
    this.body = yield featureProvider.list(userID, "", this.request.query, offset, limit)
  }
}

function viewResource(featureProvider, storageProvider) {
  return function* (id) {
    //Get user
    let userID = 9
    let post = featureProvider.view(userID, id)
    this.body = yield UI('show', {
      post: post
    });
    // this.body = featureProvider.view(userID, articleID)
  }
}

//Handle create and update post
function addResource(featureProvider) {
  return function* () {
    let postId = null
    if (this.params && this.params.id) {
      postId = this.params.id
    }

    var post = yield parse(this);

    let userID = -1
    let createdID = featureProvider.put(userID, postId, post.title, post.article, new Date().getTime())
    let newPost = featureProvider.view(userID, createdID)
    this.body = yield UI('show', {
      post: newPost
    });
  }
}