const mongoose = require('mongoose')
const dbInfo = require('dotenv').config()


console.log("Env: ", process.env.NODE_ENV)
if (process.env.NODE_ENV !== "production"){
    require('dotenv').config()
}
const dbUrl = process.env.MONGODB_URI

console.log(dbUrl)

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