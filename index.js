

const cors = require('cors');



const express = require("express")
const uuid = require('uuid')
const port = 3001
const app = express()
app.use(express.json());
app.use(cors());



const idCheck = (request, response, next) => {
    const { id } = request.params
    const index = users.findIndex(user => user.id === id)

    if (index < 0) {

        return response.status(404).json({ error: "user not fund" })
    }

    request.userIndex = index
    request.userId = id


    next()
}


const users = []

app.get("/users", (request, response) => {

    return response.json(users)

})


app.post("/users",  (request, response) => {

    const { name, age } = request.body

    const order = { id: uuid.v4(), name, age }

    users.push(order)

    return response.status(201).json(order)

})


app.put("/users/:id",idCheck, (request, response) => {

    const { name, age } = request.body
    const index = request.userIndex
    const id = request.userId
    const updateUser = { id, name, age }

    users[index] = updateUser
    return response.json(updateUser)

})


app.delete("/users/:id", idCheck,(request, response) => {
    const { name, age } = request.body
    const index = request.userIndex


    users.splice(index, 1)



    return response.status(204).json()

})



app.listen(port, () => {
    console.log(`🏍 server started on port ${port} `)
})