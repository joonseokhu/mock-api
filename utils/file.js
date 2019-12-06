const fs = require('fs')

const read = file => new Promise((resolve, reject) => {
  fs.readFile(file, (err, data) => {
    if (err) return reject(err)
    resolve(data)
  })
})

const write = (file, data) =>new Promise((resolve, reject) => {
  fs.writeFile(file, data, err => {
    if (err) return reject(err)
    resolve(file)
  })
})

module.exports = {
  read,
  write,
}