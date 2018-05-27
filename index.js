//index.js
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const PORT = process.env.port || 3002

const app = express()

app.use(cors())
morgan.token('body', (req) => {return JSON.stringify(req.body)})
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

  //return (person.name && person.name !== '' && person.number && person.number !== '')
}

const personInList = (person) => {
  //console.log("Checking if the person is already listed")
  for (let i = 0; i < persons['persons'].length; i++) {
    if (persons['persons'][i].name === person.name) {
      return true
    }
  }
  return false
  //return !persons['persons'].some(p => p.name === person.name)
}

let persons = {
  "persons": [
    {
      "name": "Sergei Sarkahousu",
      "number": "1049348796",
      "id": 6
    },
    {
      "name": "Martti Särmä",
      "number": "400-125892",
      "id": 11
    },
    {
      "name": "Sirkka Hähmä",
      "number": "090-1231234",
      "id": 12
    },
    {
      "name": "Seppo Semivaara",
      "number": "001-kunnonhyvä",
      "id": 13
    },
    {
      "name": "Sami Sukko",
      "number": "111-123123",
      "id": 14
    },
    {
      "name": "Leena Sumppu",
      "number": "111-234",
      "id": 15
    }
  ]
}

app.get("/info", (req, res) => {
  //res.writeHead(200, {'Content-type': 'text/html'})
  res.send(`<div>Palvelimella on ${persons['persons'].length} yhteystietoa.</div><div>${new Date()}</div>`)
})

app.get("/api/persons", (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(persons['persons']))
})

app.get("/api/persons/:id", (req, res) => {

  let person = persons['persons'].find(person => person.id === Number(req.params.id))

  if (!person) {
    res.status(404).end()
  } else {
    res.send(JSON.stringify(person))
  }
})

app.post("/api/persons/", (req, res) => {
  
  //console.log("req.body: ", req.body)

  if (parametersOK(req.body)) {
    //console.log("Params OK")
    if (!personInList(req.body)) {
      //console.log("Person not in list")
      let person = {
        name: req.body.name,
        number: req.body.number,
        id: Math.floor(Math.random() * 10000)
      }
      persons['persons'].push(person)
     // console.log("Persons after update: ", persons['persons'])

      res.json(person).end()
    } else {
      res.status(400).json({'error': 'Person already in list!'})
    }
  } else {
    res.status(400).json({'error': 'One or more parameters are not valid or do not exist.'})
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

app.get("/", (req, res) => {
  //console.log("Request received")
  res.send(JSON.stringify(persons))
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

console.log("Hullo Borld")