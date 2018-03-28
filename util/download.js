'use strict'
const http = require('http')
const https = require('https')
const fs = require('fs')

module.exports = (url, localFileName) => {
  return new Promise(function (resolve, reject) {
    var reg = /^https.*/
    var opt = http
    if (reg.test(url)) opt = https
    opt.get(url, function (res) {
      var imgData = ''
      var type = res.headers['content-type']
      res.setEncoding('binary')
      res.on('data', function (chunk) {
        imgData += chunk
      })
      res.on('error', function (err) {
        reject && reject(err)
      })
      res.on('end', function () {
        var buffer = new Buffer(imgData, 'binary')
        try {
          fs.writeFileSync(localFileName, buffer)
        } catch (e) {
          console.log(e)
          throw e
        }
        resolve && resolve(buffer)
      })
    })
  })
}
