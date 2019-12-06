const http = require('http')
const path = require('path')
const app = require('app')

http.createServer(app).listen(3000, () => {
  console.log('서버시작')
})