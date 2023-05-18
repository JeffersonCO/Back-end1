import bcrypt from 'bcrypt';
import express, { request, response } from 'express'
const app = express();


app.use(express.json());

let users = [];


app.post("/user", (request,response)=>{
    const user = request.body
    const userExist = users.find(user =>user.email === request.body.email)
    const  saltRounds = 10;

    if(userExist){
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
                response.status(204).json("Usuario criado com sucesso!")
            }else {
                return response.status(400).json("Ocorreu um erro"+ err)
            }
            ;
        })
    
        
    
    }
})
app.post("/userLogin", (request,response)=>{
    
    const userEmail =request.body.email
    const userPassword = request.body.password
    const user = users.find(user=> user.email===userEmail)

    if(!user){
        return response.status(401).json(" usuario nao encontrado")
    }else{
            bcrypt.compare(userPassword,user.password,function(err,resul){
                    if(resul){
                        return response.status(401).json("Usuario Logado com sucesso!")
                    }
                    else{
                    return response.status(200).json("Senha esta incorreta!");
                    }
                }) 
        }
})
app.get("/user",(request, response)=>{
    
    return response.status(200).json(users);

})

app.get("/userNote/:id",(request, response)=>{
    const id = Number(request.params.id);
    const user = users.find(user=> user.id===id);

    return response.status(200).json(user.note);
})
app.post("/userNote/:id",(request,response)=>{
    const user = request.body
    const id =Number(request.params.id)
    const userId= users.find(user=> user.id === id)
    const note = {
        
        noteId: Math.floor(Math.random()*6767),  
        titulo: user.titulo,
        descricao: user.descricao
    }
    userId.note.push(note) 
        console.log(userId)
        return response.status(200).json("Recado criado com sucesso")
    
 })
 app.put("/userNote/:id/:noteId",(request,response)=>{
    const user = request.body
    const id =Number(request.params.id)
    const noteId = Number(request.params.noteId)
    const userId= users.find(user=> user.id === id)
    const noteIndex = userId.note.findIndex(recado=>recado.noteId===noteId)
    
    userId.note[noteIndex]= { 
        noteId:noteId,
        titulo: user.titulo,
        descricao: user.descricao
    }
        console.log(userId)
        return response.status(200).json("Recado editado com sucesso")
    
 })

app.delete("/userDelete/:id/:noteId",(request,response)=>{
    const id =Number(request.params.id)
    const noteId = Number(request.params.noteId)
    const userId = users.find(user=> user.id === id)
    const noteIndex = Number(userId.note.findIndex(note=>note.id === noteId))
    
        userId.note.splice(noteIndex,1)
    
    console.log(userId.note)
    response.status(200).json("Recado excluido com sucesso")
})

app.get('/', (request, response) => {
    return response.json('OK');})
        
app.listen(8080, () => console.log("Servidor Iniciado"));