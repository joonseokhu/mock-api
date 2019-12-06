const path = require('path')
const file = require('./file')

const getFilename = name => path.join(__dirname, '../data', `${name}.json`)

const loadJSON = async name => {
  try {
    const src = await file.read(getFilename(name))
    return JSON.parse(src)
  } catch (err) {
    throw err
  }
}

const saveJSON = async (name, data) => {
  try {
    const src = JSON.stringify(data)
    const filename = await file.write(getFilename(name), src)
    return filename
  } catch (err) {
    throw err
  }
}

module.exports = {
  load: loadJSON,
  save: saveJSON,
}