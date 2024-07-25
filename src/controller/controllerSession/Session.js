const UserRegistro=require('../../mongodb/modelSession/Registro')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const SECRET= 'wpil923#kzgfdybbqi*'

module.exports={
async Login(req, res, next){

    try{      
//--------- Validacao do usuario  -------------//                 

        // procurar pelo usuario
       const {email, senha}= req.body 
       const finduser=await UserRegistro.findOne({email})

       if(!finduser){
        return res.json({message:'email ou senha incorrectos'})
       }
       
       // comparacao da senha nova e a antiga
       const verificarSenha= await bcrypt.compare(senha, finduser.senha)
    
       if(verificarSenha){

        //criacao do token do user caso a validacao funcione
        const CreateToken=jwt.sign({email, senha, roles:finduser.roles}, SECRET, {expiresIn:'1d'})  
        res.cookie("token", CreateToken)
        return res.json({
            message: "Success", 
            nome:finduser.nome,
            sobrenome:finduser.sobrenome, 
            roles:finduser.roles,
            _id:finduser._id,
            token:CreateToken})  
    }

        return res.status(401).json({message:"email ou senha incorrectos"}).end()           
       
    }catch(error){
        console.log(error)
    }      
    next()
},

    // verificar e autenticar token dos usuarios para as rotas
    // no cabeçalho de autenticacao, retorne a parte que foi dividida, que é do token
    async VerificarJWT(req, res, next){
        const tokenHeader=req.headers['authorization']
        const token=tokenHeader && tokenHeader.split(" ")[1]
    
        if(!token){
            return res.status(401).json({message:"nao tem token valido"})
        }
        
        next()  
    },


     verifyUser(req, res, next){

        const Decodedtoken=req.cookies.token
        jwt.verify(Decodedtoken, SECRET, (err, decoded)=>{
                    if(err){
                        return res.json("Erro com o token", err)
                    }else{
                        if(decoded.roles==="admin"){
                            next()
                        }else{
                            console.log("não tem permissão, nao é adm")
                            return res.status(403).json({message:"No permission"})
                        }
                    }
                })  
        
 }










}