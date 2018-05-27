//index.js
const express = require('express')

const app = express()

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

app.get("/", (req, res) => {
    console.log("Request received")
    res.send(JSON.stringify(persons))
})

app.listen(3002)

console.log("Hullo Borld")