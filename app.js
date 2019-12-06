const express = require('express')
const app = express()

const routes = require('routes')

app.use(express.json())

app.use(routes)

app.use((req, res) => {
  res.status(400).json({
    status: false,
    message: '잘못된 경로입니다',
  })
})

app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json({
    status: false,
    message: '에러가 발생했습니다.',
    data: err
  })
}) 

module.exports = app