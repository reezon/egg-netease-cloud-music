'use strict'

const mock = require('egg-mock')

describe('test/netease-cloud-music.test.js', () => {
  let app
  before(() => {
    app = mock.app({
      baseDir: 'apps/netease-cloud-music-test'
    })
    return app.ready()
  })

  after(() => app.close())
  afterEach(mock.restore)

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, neteaseCloudMusic')
      .expect(200)
  })
})
