//index.js
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

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
    res.writeHead(200, { 'Content-Type': 'application/json' , 'Access-Control-Allow-Origin': 'true'})
    res.end(JSON.stringify(persons))
})

app.get("/api/persons/:id", (req, res) => {
    console.log("333")
    let person = persons['persons'].find(person => person.id === Number(req.params.id))

    if (!person) {
        res.status(404).end()
    } else {
        res.send(JSON.stringify(person))
    }
})

app.post("/api/persons/", (req, res) => {
  console.log("req.headers: ", req.headers)
  console.log("req.body: ", req.body)
  
  let person = {name: req.body.name, 
    number: req.body.number,
    id: Math.floor(Math.random() * 10000)}
  persons['persons'].push(person)
  console.log("Persons after update: ", persons['persons'])

  res.json(req.body)

})

app.delete("/api/persons/:id", (req, res) => {
    let found = false;
    let newList = []
     persons['persons'].map(person => {
       if (person.id !== Number(req.params.id)) {
        newList.push(person) 
        return true
       } else {
         found = true
         return false
       }
    })

    console.log("found: ", found)
    console.log("Persons: ", newList)

    if (found) {
      res.status(200).end()
    } else {
      res.status(404).end()
    }
})

app.get("/", (req, res) => {
    console.log("Request received")
    res.send(JSON.stringify(persons))
})

app.listen(3002)

console.log("Hullo Borld")