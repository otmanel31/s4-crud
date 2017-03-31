const mongoose = require('mongoose')

const Schema = mongoose.Schema

const StatSchema = new Schema({
    name: String,
    description: String,
    point: Array, //{x: Number, y: Number},
    statu: String
})

const Stat = mongoose.model('stat', StatSchema)
module.exports = Stat
