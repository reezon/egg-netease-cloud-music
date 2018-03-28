'use strict'

const assert = require('assert')
const request = require('../util/request')
const download = require('../util/download')

class NeteaseCloudMusic {
  constructor (app) {
    const { serverIP, serverPort, serverDomain } = app.config.neteaseCloudMusic
    this.serverPrefix = serverDomain ? `http://${serverDomain}` : `http://${serverIP}:${serverPort}`
  }

  /**
  * search music by keyword
  * @param {String} keyword - keyword
  */
  async searchMusic (keyword) {
    const url = this.serverPrefix + '/search?keywords=' + encodeURIComponent(keyword)
    const res = await request(url)
    return res.result
  }

  /**
  * get music url by netease id
  * @param {String} neteaseId - neteaseId
  */
  async getMusicUrl (neteaseId) {
    const url = this.serverPrefix + '/music/url?id=' + neteaseId
    const res = await request(url)

    if (res.data && res.data.length > 0) {
      return res.data[0].url
    } else {
      return ''
    }
  }

  /**
  * download music to local location
  * @param {String} neteaseId - neteaseId
  * @param {String} localFileName - localFileName, contians path and name
  */
  async downloadMusic (neteaseId, localFileName) {
    const musicUrl = await this.getMusicUrl(neteaseId)

    if (musicUrl) {
        return await download(musicUrl, localFileName)
    } else {
        return null
    }
  }
}

const mount = app => {
  const { serverIP, serverPort, serverDomain } = app.config.neteaseCloudMusic
  assert((serverIP && serverPort) || serverDomain,
    '[egg-netease-cloud-music] Must set `serverIP` and `serverPort` or `serverDomain` in neteaseCloudMusic\'s config')
  app.neteaseCloudMusic = new NeteaseCloudMusic(app)
}
module.exports = mount
