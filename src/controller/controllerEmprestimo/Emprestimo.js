const Emprestimo=require('../../mongodb/modelEmprestimo/Emprestimo')



module.exports={
    async Create(req,res){
            try{

            
            const {livro}=req.params
            const {leitor}=req.params
            const {prazo,dataEmprestimo, dataDevolucao}=req.body

            const VerificarLivro=await Emprestimo.findOne({livro:livro})
            if(!VerificarLivro){
              const emprestimo=await Emprestimo.create({leitor,livro,prazo,dataDevolucao,dataEmprestimo})
            return res.json({message:"emprestimo registrado",emprestimo})  
            }else{
                return res.json({message:"este livro já foi solicitado"})
            }


            
        }
       
        catch(error){
            console.log(error)
            return res.status(400).json({message:"nao foi possivel registrar emprestimo"})
        }
    },
    async Get(req, res){
        try{
            const Mostrar=await Emprestimo.find().populate("livro", '-_id autor titulo isbn nome').populate('leitor', "-senha -roles -createdAt -updatedAt")
            return res.json({Mostrar})
        }
        catch(error){
            return res.json("n conseguimos encontrar emprestimo")
        }
    },
    async GetEmprestimoByUser(req, res){
        try{
            const {leitor}=req.params
            const Mostrar=await Emprestimo.find({leitor:leitor}).populate("livro", '-_id autor titulo isbn nome').populate('leitor', "-senha -roles -createdAt -updatedAt")
            return res.json(Mostrar)
        }
        catch(error){
            return res.json("n conseguimos encontrar emprestimo feito por este leitor")
        }
    },
    async Delete(req,res){

        try{
            const {id}=req.params
            const deletar=await Emprestimo.findByIdAndDelete({_id:id})
            res.json({"message":"Dados apagados!"})

        }catch(error){
            return res.json("n conseguimos apagar o emprestimo")
        }
    },
    async GetPendentes(req, res){
        try{
            const Mostrar=await Emprestimo.find({status:false}).populate("leitor", 'nome sobrenome').populate("livro", 'titulo autor')
            return res.json({Mostrar})
        }
        catch(error){
            return res.json("n conseguimos encontrar emprestimo pendente")
        }
    },
    async AprovePendentes(req, res){
        try{
            const {id}=req.params
            const Mostrar=await Emprestimo.findOneAndUpdate({_id:id},{status:true}, {new:true})
            return res.json({message:"aprovado", Mostrar})
        }
        catch(error){
            return res.json("n conseguimos encontrar emprestimo pendente")
        }
    },
  
}

// try{
//     const livro=await RegistrarLivro.findOne({_id:id})
//     if (livro){
//         await RegistrarLivro.findOneAndDelete({_id:id})
//         return res.json({message:"dados apagados!"})
//     }