const mongoose = require('mongoose')
const dbInfo = require('dotenv').config()


let user = ""
let pwd = ""
let dbUrl = ""

console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV !== "PROD"){
    user = process.env.DEV_DBUSER
    pwd = process.env.DEV_DBPWD
    dbUrl = `mongodb://${user}:${pwd}@ds137600.mlab.com:37600/fullstack-dev`
    
} else {
    user = process.env.DBUSER
    pwd = process.env.DBPWD
    dbUrl = `mongodb://${user}:${pwd}@ds137600.mlab.com:37600/fullstack-dev`
}

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