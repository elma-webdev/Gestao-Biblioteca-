const mongoose=require("mongoose")

const schemaEmprestimo=new mongoose.Schema({
    prazo:{
        type:Number,
        default:5
    },
    dataEmprestimo:{
        type:Date,
        default:Date.now
    },
    dataDevolucao:Date,
    livro:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Livro'
    },
    leitor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Registro'
    },
    status:{
      type:Boolean,
      default:false
    }
}, {timestamps:true}
) 
// Middleware pre-save para definir dataEmprestimo como createdAt
schemaEmprestimo.pre('save', function(next) {
    if (this.isNew) { // Verifica se o documento está sendo criado
        this.dataEmprestimo = this.createdAt; // Define dataEmprestimo como a data de createdAt
        this.dataDevolucao = new Date(this.dataEmprestimo.getTime() + this.prazo * 24 * 60 * 60 * 1000); // Calcula dataDevolucao
    }
    next();
  });

 
  
const Emprestimo=mongoose.model('Emprestimo', schemaEmprestimo  )

module.exports=Emprestimo




