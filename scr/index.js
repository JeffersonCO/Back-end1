import bcrypt from 'bcrypt';
import express, { request, response } from 'express'
const app = express();


app.use(express.json());

let users = [];


app.post("/user", (request,response)=>{
    const user = request.body
    const userexist = users.find(user =>user.email === request.body.email)
    const  saltRounds = 10;

    if(userexist){
        return response.status(401).json("Email ja existe em outro usuario")
    }else{
        bcrypt.hash(user.password,saltRounds,function(err,hash){
            if(hash){
                users.push({
            
                    id: Math.floor(Math.random()*67676),
                    name: user.name,
                    email: user.email,
                    password:hash,
                    note:[]
            })
            }else {
                return response.status(400).json("Ocorreu um erro"+ err)
            }
        })
    
    response.status(204).json("Usuario criado com sucesso!");
    console.log(user)
    }
})
app.post("/userLogin", (request,response)=>{
    
    const username = users.find(user =>user.name === request.body.name)
    const userpassword = users.find(user =>user.password === request.body.password)

    if(!username.name){
        return response.status(401).json("Nome de usuario nao encontrado")
    }
    if(!userpassword.password){
        return response.status(401).json("Senha esta incorreta")
    }
    else{
    response.status(200).json("Usuario Logado com sucesso!");
    
    }
})
app.get("/user",(request, response)=>{
    
    return response.status(200).json(users);

})

app.get("/userNote/:id",(request, response)=>{
    const id = Number(request.params.id);
    const user = users.find(user=> user.id===id);
    return response.json(user);
})
app.put("/userNote/:id/",(request,response)=>{
    const user = request.body
    const id =Number(request.params.id)
    const indexuser = users.findIndex(user=> user.id === id)
    users[indexuser]= 
        
        users.note.push({
                noteid: Math.floor(Math.random()*67),
                titulo: user.note.titulo,
                descricao: user.note.descricao
            })
        console.log(user[indexuser])
        return response.status(200).json(user[indexuser])
 })

app.delete("/userDelete/:id",(request,response)=>{
    const id =Number(request.params.id)
    const indexuser = users.findIndex(user=> user.id === id)
    note.splice(indexuser,1)
    response.status(200).json()
})

app.get('/', (request, response) => {
    return response.json('OK');})
        
app.listen(8080, () => console.log("Servidor Iniciado"));