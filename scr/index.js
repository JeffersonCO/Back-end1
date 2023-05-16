import { hash } from 'bcrypt';
import express, { request, response } from 'express'
const app = express();


app.use(express.json());

let users = [];


app.post("/user", (request,response)=>{
    const user = request.body
    const userexist = users.find(user =>user.email === request.body.email)

    if(userexist){
        return response.status(401).send("Email ja existe em outro usuario")
    }else{
        const bcryptPassword = bcrypt.hash(password,10)
    users.push({
        
            id: Math.floor(Math.random()*67676),
            name: user.name,
            email: user.email,
            bcryptPassword:hash,
            note:[]
    })
    response.status(200).send("Usuario criado com sucesso!");
    console.log(user)
    }
})
app.post("/user", (request,response)=>{
    const user = request.body
    const userexist = users.find(user =>user.email === request.body.email)

    if(!userexist.name){
        return response.status(401).send("Nome de usuario nao encontrado")
    }
    if(!userexist.password){
        return response.status(401).send("Senha esta incorreta")
    }
    else{
    response.status(200).send("Usuario Logado com sucesso!");
    
    }
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
        
        note:[ {
                titulo: user.note.titulo,
                descricao: user.note.descricao
            }]
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