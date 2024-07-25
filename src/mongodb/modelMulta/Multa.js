const mongoose=require('../connection')


const Multa=mongoose.model('Multa', {
    valor:{
        type:Number,
        default:500
    },
    descricao:{
        type:String,
       message:`O valor da multa e ${valor}` 
    },

    IdEmprestimo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Emprestimo'
        },
})




module.exports=Multa