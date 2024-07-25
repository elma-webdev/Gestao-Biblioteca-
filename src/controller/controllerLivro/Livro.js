const nodemon = require("nodemon")
const RegistrarLivro = require("../../mongodb/modelLivro/RegistrarLivro")


module.exports={

    async Create (req,res){

            const dadosLivro={
            titulo:req.body.titulo,
            autor:req.body.autor,
            isbn:req.body.isbn,
            nome:req.body.nome,
            cidade:req.body.cidade,
            ano:req.body.ano,
            categoria:req.body.categoria,
            qntExemplar:req.body.qntExemplar,
            edicao:req.body.edicao,
            volume:req.body.volume,
            paginas:req.body.paginas,
            descricao:req.body.descricao
            
           


        } 



        try{
            const livro=await RegistrarLivro.create(dadosLivro)
            return res.json({message:"livro registrado", livro})

        }catch(error){
            console.log(error)
            return res.status(400).json({message:"nao foi possivel registrar livro"})
        }
    },

    async Update(req,res){

        const {id}=req.params
        const dadosLivro={
            titulo:req.body.titulo,
            autor:req.body.autor,
            isbn:req.body.isbn,
            nome:req.body.nome,
            cidade:req.body.cidade,
            ano:req.body.ano,
            categoria:req.body.categoria,
            qntExemplar:req.body.qntExemplar,
            edicao:req.body.edicao,
            volume:req.body.volume,
            paginas:req.body.paginas,
            descricao:req.body.descricao
            
            
        } 
        
     
        try {
            const livro= await RegistrarLivro.findByIdAndUpdate(id, dadosLivro, {new:true})
            return res.json({"message":"livro actualizado com sucesso", livro})
        }catch(error){
            return res.status(400).json({message:"nao foi possivel actualizar livro"}) 
        }


},

    async Get(req,res){
        try{
            const livro=await RegistrarLivro.find().sort()
            return res.json(livro)

        }catch(error){
            return res.status(404).json({message:"ouh, nao conseguimos mostrar seus dados"}) 
        }
    },
    async GetOne(req,res){
        const {id}=req.params
        try{
            const livro=await RegistrarLivro.findOne({_id:id})
            return res.json(livro)

        }catch(error){
            return res.status(404).json({message:"ouh, nao conseguimos mostrar seus dados"}) 
        }
    },
    async GetByQuery(req,res){
        const {nomelivro}=req.query

        try{

            const regex=new RegExp(nomelivro, 'i')
            const Querybook=await RegistrarLivro.find({

                $or:[
                    {titulo:{$regex:regex}}
                ]

            })
            res.json(Querybook)
        }
        catch(error){
            res.json("houve um erro ao exibir a resposta", error)
        }   
    },

    async Delete(req,res){
        const {id}=req.params

        try{
            const livro=await RegistrarLivro.findOne({_id:id})
            if (livro){
                await RegistrarLivro.findOneAndDelete({_id:id})
                return res.json({message:"dados apagados!"})
            }

        }catch(error){
            return res.json({message:"não conseguimos apagar este livro, pois n existe", error}) 
        }
    }
}
