import express, { request, response } from 'express'
const app = express();


app.use(express.json());

let users = [];


app.post("/user", (request,response)=>{
    const user = request.body
    users.push({
        
            id: Math.floor(Math.random()*67676),
            name: user.name,
            email: user.email,
            password: user.password,
            message: {
                messageId: Math.floor(Math.random()*67),
                titulo: user.message.titulo,
                descricao: user.message.descricao
            }
    })
    response.status(204).json();
    console.log(user)
})
app.get("/user",(request,response)=>{

    return response.status(200).json(users)
})
app.get("/user/:id",(request, response)=>{
    const id = Number(request.params.id);
    const user = users.find(user=> user.id===id);
    return response.json(user);
})
app.put("/user/:id",(request,response)=>{
    const user = request.body
    const id =Number(request.params.id)
    const indexuser = users.findIndex(cuser=> user.id === id)
    users[indexuser]= {
        
        id: Math.floor(Math.random()*67676),
        name: user.name,
        email: user.email,
        password: user.password,
        message: {
            messageId: Math.floor(Math.random()*67),
            titulo: user.message.titulo,
            descricao: user.message.descricao
             }
            }
        console.log(user[indexuser])
        return response.status(200).json(user[indexuser])
 })

app.delete("/cars/:id",(request,response)=>{
    const id =Number(request.params.id)
    const indexCar = cars.findIndex(car=> car.id === id)
    cars.splice(indexCar,1)
    response.status(200).json()
})

app.get('/', (request, response) => {
    return response.json('OK');})
        
app.listen(8080, () => console.log("Servidor Iniciado"));