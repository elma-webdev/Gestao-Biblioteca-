const mongoose=require('../connection')

const LivroSchema= new mongoose.Schema({
    titulo:{
        type:String,
        required:true,
        // lowercase:true
    },
    autor:{
            type:[String],
            required:true 
    },
    isbn:{
        type:String,
        required:true,
        unique:false
    },
   
        nome:String,
        cidade:String,
        ano:Number,
    
    categoria:{
        type:String,
        required:true
    },
    qntExemplar:{
        type: Number,
        required:true
    },
    edicao:String,
    volume:Number,
    paginas:Number,
    descricao:String,
    
}, {timestamps:true})

const RegistrarLivro=mongoose.model('Livro', LivroSchema)
module.exports= RegistrarLivro
