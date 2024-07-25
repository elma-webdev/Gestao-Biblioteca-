const UserRegistro=require('../../mongodb/modelSession/Registro')
const bcrypt=require('bcrypt')

module.exports={

     async Create(req, res){

        // dados enviados pelo usuario
        const dados=
        {   nome:req.body.nome, 
            sobrenome:req.body.sobrenome,
            telefone:req.body.telefone,
            email:req.body.email, 
            senha:req.body.senha,
            confirmsenha:req.body.confirmsenha,
            roles:req.body.roles
        }

        // verificar se as senhas sao as mesmas
        if(dados.senha !== dados.confirmsenha){
            console.log("as senhas nao coincidem!")
        }
        // verificar se o campo nome esta vazio
        if(!dados.nome){
            console.log("insira o nome!")
        }
        // verificar se o email ja existe
        if (dados.email == UserRegistro.email){
            console.log("este email ja existe, tente outro!")
            return res.json({message:"este email ja existe, tente outro!"})
        }
         
      // caso toda validacao esteja certa
        else{

            try {
      // senha criptografada
    const salt=await bcrypt.genSalt(12)
    const senhaHash= await bcrypt.hash(dados.senha, salt) 
    dados.senha=senhaHash 
    const usuario= (await UserRegistro.create(dados))
    return res.json({"message":"usuario criado!", usuario})

        } catch (error) {
            console.log(error, "Não foi criado nenhum usuário ainda!")
        }  
        }
      
    },


    async Get(req,res) {
    
        try {
            const usuario= await UserRegistro.find().select("-senha")
            return res.json(usuario)
        } catch (error) {
            console.log(error, "Não foi encontrado nenhum usuário geral ainda!")
        }
       
    },
    async GetLeitor(req,res) {
    
        try {
            const usuario= await UserRegistro.find({roles:'leitor'}).select("-senha")
            return res.json(usuario)
        } catch (error) {
            console.log(error, "Não foi encontrado nenhum usuário ainda!")
        }
       
    },
    async GetBibliotecario(req,res) {
    
        try {
            const usuario= await UserRegistro.find({roles:'bibliotecario'}).select("-senha")
            return res.json(usuario)
        } catch (error) {
            console.log(error, "Não foi encontrado nenhum usuário ainda!")
        }
       
    },


    async Update(req, res){
        const {id}=req.params
        const dados=
        {nome:req.body.nome, 
        sobrenome:req.body.sobrenome,
        telefone:req.body.telefone,
        email:req.body.email, 
        senha:req.body.senha,
        roles:req.body.roles}
     
        try {
            const usuario= await UserRegistro.findOneAndUpdate({_id:id}, dados, {new:true})
            return res.json({"message":"usuário actualizado com sucesso", usuario})
            
        } catch (error) {
            console.log(error, "não foi possível actualizar usuário")  
        }
    },

    
    async Delete(req,res){
        const {id}=req.params

        try {
             const usuario=await UserRegistro.findByIdAndDelete({_id:id})
             res.json({"message":"usuário apagado com sucesso"})
        } catch (error) {
            console.log(error)  
        }
        
    }

  }