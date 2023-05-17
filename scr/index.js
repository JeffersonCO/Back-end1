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
app.post("/userLogin/:id", (request,response)=>{
    const userid = request.params.id
    const useremail =request.body.email
    const userpassword = request.body.password
    const user = users.find(user=> user.id===userid)

    if(!useremail.email){
        return response.status(401).json(" usuario nao encontrado")
    }
    bcrypt.compare(userpassword,user.password,function(err,resul){
        if(resul){
            return response.status(401).json("Senha esta incorreta")
        }
        else{
            return response.status(200).json("Usuario Logado com sucesso!");
        }
    })
})
app.get("/user",(request, response)=>{
    
    return response.status(200).json(users);

})

app.get("/userNote/:id",(request, response)=>{
    const id = Number(request.params.id);
    const user = users.find(user=> user.id===id);
    return response.json(user);
})
app.post("/userNote/:id",(request,response)=>{
    const user = request.body
    const id =Number(request.params.id)
    const userid= users.find(user=> user.id === id)
    const note = {
        
        noteid: Math.floor(Math.random()*6767),  
        titulo: user.titulo,
        descricao: user.descricao
    }
    userid.note.push(note) 
        console.log(user[userid])
        return response.status(200).json(userid)
    
 })

app.delete("/userDelete/:id/:noteid",(request,response)=>{
    const id =Number(request.params.id.noteid)
    const indexuser = users.findIndex(user=> user.id === id)
    const noteid = note.findIndex(note=>note.id === noteid)
    if(indexuser){
        note.splice(noteid,1)}
    response.status(200).json()
})

app.get('/', (request, response) => {
    return response.json('OK');})
        
app.listen(8080, () => console.log("Servidor Iniciado"));