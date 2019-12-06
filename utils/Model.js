// const fs = require('fs')
// const path = require('path')
const { pipe, reverseArray } = require('utils/value')

const json = require('utils/json')
const moment = require('utils/moment')

class Model {
  constructor (name, fields) {
    const notAllowedFields = [
      'id', 'createdAt', 'updatedAt',
    ]
    
    const errors = Object.keys(fields)
      .filter(e => notAllowedFields.includes(e))
    
    if (errors.length) {
      throw new Error(errors.join())
    }
    
    this.name = name
    this.fields = fields
  }

  readJSON () {
    return json.load(this.name)
      .catch(() => (
        json.save(this.name, [])
        .then(()=> [])
      ))
  }

  createEntityData (left = {}, right = {}) {
    return Object.keys(this.fields)
      .reduce((prev, curr) => ({
        ...prev,
        [curr]: left[curr] || right[curr] || null,
      }), {})
  }

  async findOne (id) {
    try {
      const src = await this.readJSON()
      return src.filter(e => e.id === id)[0]
    } catch (err) {
      throw err
    }
  }

  async findList ({
    page = 1,
    length = null,
    reverse = false,
  }) {
    try {
      const src = await this.readJSON()

      const results = pipe(
        reverse && reverseArray,
        !isNaN(length) && (length > 0) && (arr => arr.slice(
          (page - 1) * length,
          page * length,
        )),
      )(src)

      return {
        results,
        count: src.length,
      }
    } catch (err) {
      throw err
    }
  }

  async create (data) {
    try {
      const entities = await this.readJSON()

      console.log(entities)

      const newEntity = {
        id: Date.now(),
        createdAt: moment(),
        updatedAt: null,
        ...this.createEntityData(data, this.fields),
      }

      await json.save(
        this.name,
        entities.concat(newEntity)
      )

      return newEntity
    } catch (err) {
      throw err
    }
  }

  async update (id, data) {
    try {
      let count = 0
      const prevEntities = await this.readJSON()
      const nextEntities = prevEntities.map(entity => {
        if (entity.id !== id) return entity
        count++
        return {
          id: entity.id,
          createdAt: entity.createdAt,
          updatedAt: moment(),
          ...this.createEntityData(data, entity),
        };
      })

      await json.save(
        this.name,
        nextEntities,
      )
      
      return count
    } catch (err) {
      throw err
    }
  }

  async remove (id) {
    try {
      let count = 0
      const prevEntities = await this.readJSON()
      const nextEntities = prevEntities.filter(
        entity => {
          const ret = entity.id !== id
          if (!ret) { count++ }
          return ret
        }
      )
      await json.save(
        this.name,
        nextEntities,
      )
      return count
    } catch (err) {
      throw err
    }
  }
}

module.exports = Model