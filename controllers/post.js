const post = require('models/post')

const validator = require('express-validator')

const validationError = (req, res, next) => {
  const errors = validator.validationResult(req);
  if (errors.isEmpty()) return next()
  return res.status(422).json({
    status: false,
    message: '요청 형식이 잘못되었습니다.',
    errors: errors.array()
  });
}

const checkID = [
  validator.param('id').toInt().isInt(),
  validationError,
]

const checkList = [
  validator.query('page').optional().toInt().isInt(),
  validator.query('length').optional().toInt(),
  validator.query('reverse').optional().toBoolean(),
  validationError,
]

const createPost = async (req, res, next) => {
  try {
    const data = await post.create(req.body)
    res.json({ data })
  } catch (err) {
    next(err)
  }
}

const updatePost = async (req, res, next) => {
  try {
    const data = await post.update(req.params.id, req.body)
    res.json({ data })
  } catch (err) {
    next(err)
  }
}

const deletePost = async (req, res, next) => {
  try {
    const data = await post.remove(req.params.id)
    res.json({ data })
  } catch (err) {
    next(err)
  }
}

const listPost = async (req, res, next) => {
  try {
    const {
      page,
      length,
      reverse,
    } = req.query
    const data = await post.findList({
      page,
      length,
      reverse,
    })

    res.json({ data })
    
  } catch (err) {
    next(err)
  }
}

const OnePost = async (req, res, next) => {
  try {
    const data = await post.findOne(req.params.id)
    res.json({ data })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  create: createPost,
  update: updatePost,
  delete: deletePost,
  list: listPost,
  one: OnePost,
  
  checkID,
  checkList,
}