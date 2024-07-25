// const mongoose=require('../connection')
const mongoose=require("mongoose")

const Schemaregistro=new mongoose.Schema({
    detalhe:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Registro'
    },
processo:Number,
curso:String, 
sala:Number, 
turno:String, 
anoAcademico:Number
}, {timestamps:true}
)

const RegistrarLeitor=mongoose.model('Leitor', Schemaregistro)

module.exports= RegistrarLeitor 

