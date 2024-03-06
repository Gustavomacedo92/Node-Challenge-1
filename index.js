const express = require("express")
const uuid = require('uuid')
const port = 3001
const app = express()
app.use(express.json())


const orders = []

const Middlewares = (request, response, next) => {
    const { id } = request.params

    const index = orders.findIndex(client => client.id === id)

    if (index < 0) {
        return response.status(404).json({ error: "user not fond" })

    }

    request.userIndex = index
    request.userId = id
    request.order = orders[index]
    next()
}

const Middlewares2 = (request, response, next) => {
   const method = request.method
   const url = request.url

   console.log(`method: ${method} url: ${url}`)
    
    next()
}



app.get("/orders", Middlewares2,  (request, response) => {
    return response.json(orders)
})



app.post("/orders",Middlewares2, (request, response) => {
    const { order, clientName, price } = request.body
    const status = "em preparação"

    const pedido = { id: uuid.v4(), order, clientName, price, status }

    orders.push(pedido)

    return response.json(pedido)
})



app.put("/orders/:id", Middlewares,Middlewares2, (request, response) => {

    const { order, clientName, price } = request.body
    const index = request.userIndex
    const id = request.userId

    const updateUser = { id, order, clientName, price }



    orders[index] = updateUser
    return response.json(orders)

})

app.delete("/orders/:id", Middlewares,Middlewares2, (request, response) => {

    const { order, clientName, price } = request.body
    const index = request.userIndex
    const id = request.userId

    const updateUser = { id, order, clientName, price }

    orders.splice(index, 1)

    return response.status(204).json()
})


app.get("/orders/:id", Middlewares,Middlewares2, (request, response) => {
    const index = request.userIndex

    return response.status(202).json(orders[index])
})



app.patch("/orders/:id", Middlewares,Middlewares2, (request, response) => {
    const { order, clientName, price, } = request.order
    const index = request.userIndex
    const id = request.userId

    const updateUser = { id, order, clientName, price, status: "pronto" }

    orders[index] = updateUser

    return response.json(updateUser)

})

app.listen(port, () => {
    console.log(`🏍 server started on port ${port} `)
})