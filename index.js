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
    .then(result => res.send(`<div>palvelimella on ${result.length} yhteystietoa.</div>`))
    .catch(err => {
      console.log("Error while getting all contacts for contact list length: " + err)
      response.status(404).end()
    })
})

app.get("/api/persons", (req, res) => {
  Contact
    .find({})
    .then(persons => {
      let p = persons.map(person => Contact.format(person))
      console.log("p: ", p)
      res.json(p)
    })
    .catch(err => {
      console.log("Error while getting all contacts: " + err)
      response.status(404).end()
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
    .catch(err => console.log("Error while getting contact by Id: " + err))
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
            .catch(err => {
              console.log("Error while saving contact: ", err)
              response.status(404).end()
            })
        }
      })
      .catch(err => {
        console.log("Error while getting getting contacts for saving: " + err)
        response.status(404).end()
      })
  } else {
    res.status(400).json({ 'error': 'Invalid parameters' })
  }
})

// TODO: implement deleting
app.delete("/api/persons/:id", (req, res) => {
  Contact
    .findByIdAndRemove({_id: req.params.id})
    .then(result => {
      console.log(result)
      res.status(204).end()
    })
    .catch(err => {
      res.status(404).json({'error': 'Something went wrong when deleting'})
    })
})

app.put("/api/persons/:id", (req, res) => {
  
  const c = {
    name: req.body.name,
    number: req.body.number
  }
  console.log("c: ", c)
  Contact
    .findByIdAndUpdate({_id: req.params.id}, c, {new: true})
    .then(updated => {
      console.log(updated)
      res.json(Contact.format(updated))
    })
    .catch(err => {
      res.status(400).json({error: "Probably a malformatted id!"})
      console.log(err)
    })
})

app.get("/", (req, res) => {
  Contact
  .find({})
  .then(result => {
    res.json(result.map(r => Contact.format(r)))
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

console.log("Hullo Borld")