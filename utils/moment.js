const moment = require('moment-timezone')
const TZ = 'Asia/Seoul'

module.exports = t => moment(t).tz(TZ)