const Livros=require('../../mongodb/modelLivro/RegistrarLivro')
const Usuario_Geral=require('../../mongodb/modelSession/Registro')
const Emprestimos=require('../../mongodb/modelEmprestimo/Emprestimo')
// const Multas=require('../../mongodb/modelMulta/Multa')


module.exports={
    async Livros (req, res){
        try{
        const livros=await Livros.find().countDocuments()
        return res.json(livros)    
        }
        catch(error){
        console.log("N conseguimos pegar os livros", error)
        }
        
    },

    async Usuarios(req,res){
        try{
            const usuarios=await Usuario_Geral.find().countDocuments()
            return res.json(usuarios)    
            }
            catch(error){
            console.log("N conseguimos pegar os usuarios gerais", error)
            } 
    },
    async Leitores(req,res){
        try{
            const leitores=await Usuario_Geral.find({roles:"leitor"}).countDocuments()
            return res.json(leitores)
        }
        catch(error){
            console.log("Nao foi possivel saber o numero de leitores", error)  
        }
    },
    async Bibliotecarios(req,res){
        try{
            const bibliotecarios=await Usuario_Geral.find({roles:"bibliotecario"}).countDocuments()
            return res.json(bibliotecarios)
        }
        catch(error){
            console.log("Nao foi possivel saber o numero de bibliotecarios", error)  
        }
    },

    async MostrarPendentes(req, res){

        try{
            const estados_pendentes=await Emprestimos.find({status:false})
        return res.json(estados_pendentes)  
        }catch(error){
            console.log("Nao foi possivel saber o numero de estados pendentes.", error)  
        }     
    }
}