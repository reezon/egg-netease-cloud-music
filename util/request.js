'use strict'
const http = require('http')

module.exports = (url) => {
  return new Promise(function (resolve, reject) {
    http.get(url, (res) => {
      const { statusCode } = res
      const contentType = res.headers['content-type']

      let error
      if (statusCode !== 200) {
        error = new Error('请求失败。\n' +
                      `状态码: ${statusCode}`)
      } else if (!/^application\/json/.test(contentType)) {
        error = new Error('无效的 content-type.\n' +
                      `期望 application/json 但获取的是 ${contentType}`)
      }
      if (error) {
        // 消耗响应数据以释放内存
        res.resume()
        return reject(error)
      }
      res.setEncoding('utf8')
      let rawData = ''
      res.on('data', (chunk) => { rawData += chunk })
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(rawData)
          resolve && resolve(parsedData)

        } catch (e) {
          reject && reject(e)
        }
      })
    }).on('error', (e) => {
      reject && reject(e)
    })
  })
}
