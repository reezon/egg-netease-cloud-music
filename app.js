'use strict'
const mount = require('./lib/')
module.exports = app => {
  if (app.config.neteaseCloudMusic.app) mount(app)
}
