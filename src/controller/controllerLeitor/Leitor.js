const RegistroLeitor=require('../../mongodb/modelLeitor/Leitor')

module.exports={

    async Create (req,res){
        
        const {detalhe,processo,curso, sala, turno, anoAcademico}=req.body

        try{
            const Registro=await RegistroLeitor.create({detalhe,processo,curso, sala, turno, anoAcademico})
            return res.json({message:"Registro de leitor criado", Registro})

        }catch(error){
            return res.status(400).json({message:"nao foi possivel criar registro"})
        }
    },

    async Update(req,res){
        const {id}=req.params
        const 
        {detalhe,
        telefone, 
        processo,
        curso, 
        sala, 
        turno, 
        anoAcademico}=req.body
     
        try {
            const Registro= await RegistroLeitor.findOneAndUpdate({_id:id},{detalhe,
                processo,
                curso, 
                sala, 
                turno, 
                anoAcademico} , {new:true})

            return res.json({"message":"registro de leitor actualizado com sucesso", Registro})
        }catch(error){
            return res.status(400).json({message:"nao foi possivel actualizar registro de leitor"}) 
        }


},

    async Get(req,res){
        try{
            const Registro=await RegistroLeitor.find().sort().populate("detalhe", "-senha")
            return res.json(Registro)

        }catch(error){
            return res.status(404).json({message:"ouh, nao conseguimos mostrar seus dados"}, error) 
        }
    },

    async Delete(req,res){
        const {id}=req.params

        try{
            const Registro=await RegistroLeitor.findByIdAndDelete(id)
            return res.json({message:"dados apagados!"})

        }catch(error){
            return res.status(400).json({message:"opps, verifique seus passos"}) 
        }
    }

}