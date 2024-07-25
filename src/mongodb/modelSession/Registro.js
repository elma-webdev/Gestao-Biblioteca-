const mongoose=require('../connection')
const UserRegistroSchema=new mongoose.Schema({
    nome:{
        type:String,
        required:true,
        capitalize:true
    },
    sobrenome:{
        type:String,
        required:true,
        capitalize:true
    },
    telefone:{
        type:String,
        required:true
    },   
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    senha:{
        type:String
    },
    roles:{
        type:String,
        default:"leitor",
        lowercase:true
    }


}, {timestamps:true})


const UserRegistro=mongoose.model('Registro', UserRegistroSchema)
module.exports=UserRegistro
