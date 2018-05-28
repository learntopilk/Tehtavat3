const mongoose = require('mongoose')
const dbInfo = require('dotenv').config()

const user = process.env.DEV_DBUSER
const pwd = process.env.DEV_DBPWD

const dbUrl
if (process.NODE_ENV !== "PROD"){
    dbUrl = `mongodb://${user}:${pwd}@ds237610.mlab.com:37610/fullstack`
} else {
    dbUrl = `mongodb://${user}:${pwd}@ds137600.mlab.com:37600/fullstack-dev`
}
mongoose.connect(dbUrl)
const contactSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Contact = mongoose.model('Contact', contactSchema)

if (process.argv[2] && process.argv[3]) {
    const name = process.argv[2]
    const number = process.argv[3]
    console.log(name, number)

    const cont = new Contact({ name, number })
    cont
        .save()
        .then(result => {
            console.log(`Lisätty luetteloon henkilö ${name} numerolla ${number}`)
            mongoose.connection.close()
        })
} else {
    Contact
        .find({})
        .then(res => {
            console.log("puhelinluettero:")
            res.forEach(r => {console.log(`${r.name} ${r.number}`)})
            mongoose.connection.close()
        })
}


