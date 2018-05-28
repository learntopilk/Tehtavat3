const mongoose = require('mongoose')
const dbInfo = require('dotenv').config()


//let user = ""
//let pwd = ""
//let dbUrl = ""

console.log("Env: ", process.env.NODE_ENV)
if (process.env.NODE_ENV !== "production"){
    require('dotenv').config()
    //user = process.env.DBUSER
    //pwd = process.env.DBPWD
    //dbUrl = `mongodb://${user}:${pwd}@ds237610.mlab.com:37610/fullstack`
} else {
    //user = process.env.DEV_DBUSER
    //pwd = process.env.DEV_DBPWD
    //dbUrl = `mongodb://${user}:${pwd}@ds137600.mlab.com:37600/fullstack-dev`
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