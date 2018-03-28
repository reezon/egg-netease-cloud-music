'use strict'

const Controller = require('egg').Controller

class HomeController extends Controller {
  async index () {
    const musicList = await this.app.neteaseCloudMusic.searchMusic('天使的翅膀')
    console.log(musicList)
    const musicUrl = await this.app.neteaseCloudMusic.getMusicUrl(27747330)
    console.log(musicUrl)
    const musicDownload = await this.app.neteaseCloudMusic.downloadMusic(27747330, '/test.mp3')
    console.log(musicDownload)
    this.ctx.body = 'hi, ' + this.app.plugins.neteaseCloudMusic.name
  }
}

module.exports = HomeController
