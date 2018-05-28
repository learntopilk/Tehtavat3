//index.js
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Contact = require('./models/Contact')

const PORT = process.env.PORT || 3002
const app = express()

app.use(cors())
morgan.token('body', (req) => { return JSON.stringify(req.body) })
app.use(morgan(':method :url :body :status :res[content-length] - :response-time: ms'))
app.use(express.static('build'))
app.use(bodyParser.json())


const parametersOK = (person) => {
  if (!person.name || !person.number) {
    return false
  }
  if (person.name === '' || person.number === '') {
    return false
  }
  return true
}


app.get("/info", (req, res) => {
  Contact
   .find()
   .then(res = res.send(`<div>palvelimella on ${res.length} yhteystietoa.</div>`))
  //res.send(`<div>Palvelimella on ${persons['persons'].length} yhteystietoa.</div><div>${new Date()}</div>`)
})

app.get("/api/persons", (req, res) => {
  Contact
    .find({})
    .then(persons => {
      let p = persons.map(person => Contact.format(person))
      console.log("p: ", p)
      res.json(p)
    })

})

app.get("/api/persons/:id", (req, res) => {

  console.log(req.params.id)

  Contact
    .find({ _id: req.params.id })
    .then(pers => {
      console.log(pers[0])
      res.status(200).json(Contact.format(pers[0]))
    })
})

app.post("/api/persons/", (req, res) => {

  const body = req.body
  console.log(body)

  if (parametersOK(body)) {

    Contact
      .find({ name: body.name })
      .then(result => {
        console.log("result: ", result)
        if (result.length !== 0) {
          return res.status(400).json({ error: "Contact already in database!" })
        } else {

          const contact = new Contact({
            name: body.name,
            number: body.number,
          })

          contact
            .save()
            .then(result => {
              console.log(result)
              res.status(200).json(Contact.format(result))
            })
        }
      })
  } else {
    res.status(400).json({ 'error': 'Invalid parameters' })
  }
})


app.delete("/api/persons/:id", (req, res) => {
  let found = false;
  let newList = []

  persons['persons'].map(person => {
    if (person.id !== Number(req.params.id)) {
      newList.push(person)
    } else {
      found = true
      return false
    }
  })

  if (found) {
    persons['persons'] = newList;
    console.log("Persons: ", persons['persons'])
    res.status(200).end()
  } else {
    res.status(404).end()
  }
})


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

console.log("Hullo Borld")