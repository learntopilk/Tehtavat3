const mongoose = require('mongoose')
const dbInfo = require('dotenv').config()

const user = process.env.DBUSER
const pwd = process.env.DBPWD

const dbUrl = `mongodb://${user}:${pwd}@ds237610.mlab.com:37610/fullstack`

mongoose.connect(dbUrl)
const contactSchema = new mongoose.Schema({
    name: String,
    number: String
})
contactSchema.statics.format = function(c) {
    return {name: c.name, number: c.number, id: c._id}
}
const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact