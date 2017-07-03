const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
http.createServer(app)

app.use(bodyParser.json())
app.use(cors())

const items = []

let nextId = 1

app.get('/', (req, res) => {
    res.send(items)
    res.end()
})

app.post('/', (req, res) => {
    let newItem = req.body
    newItem._id = nextId++
    items.push(newItem)
    res.send(newItem)
    res.end()
})

app.put('/:id', (req, res) => {
    let updatedItem = req.body
    let id = +req.params.id
    let idx = items.findIndex(item => item._id === id)
    if (idx >= 0) {
        items.splice(idx, 1, updatedItem)
        res.send(items)
    }
    res.end()
})

app.delete('/:id', (req, res) => {
    var id = +req.params.id
    var idx = items.findIndex(item => item._id === id)
    if (idx >= 0) {
        items.splice(idx, 1)
        res.send(items)
    }
    res.end()
})

app.listen(2999, () => {
    console.log('listening on localhost: 2999')
})