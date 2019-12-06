const express = require('express')
const router = express.Router()

const post = require('controllers/post')

router.post('/', post.create)
router.put('/:id', post.checkID, post.update)
router.delete('/:id', post.checkID, post.delete)
router.get('/', post.checkList, post.list)
router.get('/:id', post.checkID, post.one)

module.exports = router