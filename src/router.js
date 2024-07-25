const {Router}=require('express')
const router=new Router()

   // rota publica
 router.get('/public', (req,res)=>{
    return res.json({message:'tudo okay por aqui'})
 })
 


   // criando as rotas de inicio de sessao e termino de sessao de usuario geral
 const Registro= require('./controller/controllerSession/Registro')
 const Session= require('./controller/controllerSession/Session')

 

 router.post('/createuser', Registro.Create)
 router.post('/login/auth', Session.Login)
 router.get('/user/get', Session.VerificarJWT,Registro.Get)
 router.get('/user/get/leitor', Session.VerificarJWT,Registro.GetLeitor)
 router.get('/user/get/bibliotecario', Session.VerificarJWT,Registro.GetBibliotecario)
 router.put('/user/update/:id', Session.VerificarJWT,Registro.Update)
 router.delete('/user/delete/:id', Session.VerificarJWT, Registro.Delete)




   // criando as rotas do livro
const Livro= require('./controller/controllerLivro/Livro')

router.get('/book/get', Session.VerificarJWT, Livro.Get)
router.get('/book/get/:id', Session.VerificarJWT, Livro.GetOne)
router.get('/book/getbyquery', Session.VerificarJWT, Livro.GetByQuery)
router.post('/book/create', Session.VerificarJWT, Livro.Create)
router.put('/book/update/:id', Session.VerificarJWT, Livro.Update)
router.delete('/book/delete/:id', Session.VerificarJWT, Livro.Delete)


   // criando as rotas do leitor
   const Leitor=require('./controller/controllerLeitor/Leitor')
   router.get('/reader/get', Session.VerificarJWT, Leitor.Get)
   router.post('/reader/create', Session.VerificarJWT, Leitor.Create)
   router.put('/reader/update/:id', Session.VerificarJWT, Session.verifyUser, Leitor.Update)
   router.delete('/reader/delete/:id', Session.VerificarJWT, Session.verifyUser, Leitor.Delete)


   // criando a rota de dashboard
   const Dashboard=require('./controller/controllerDashboard/Dashboard')
   router.get('/private/dashboard/Tot_usuarios',Session.VerificarJWT, Dashboard.Usuarios)
   router.get('/private/dashboard/livros',Session.VerificarJWT, Dashboard.Livros)
   router.get('/private/dashboard/Tot_usuarios/leitores',Session.VerificarJWT, Dashboard.Leitores)
   router.get('/private/dashboard/Tot_usuarios/bibliotecarios',Session.VerificarJWT, Dashboard.Bibliotecarios)
   router.get('/private/dashboard/Tot_usuarios/pendentes',Session.VerificarJWT, Dashboard.MostrarPendentes)

   //criando a rota do emprestimo
   const Emprestimo=require('./controller/controllerEmprestimo/Emprestimo')
   router.post('/solicitar/:livro/:leitor', Emprestimo.Create)
   router.get('/solicitar/mostrar',Session.VerificarJWT, Emprestimo.Get)
   router.get('/solicitar/mostrar/pendentes',Session.VerificarJWT, Emprestimo.GetPendentes)
   router.get('/solicitar/mostrar/:leitor',Session.VerificarJWT, Emprestimo.GetEmprestimoByUser)
   router.put('/solicitar/mostrar/:id/aprovar', Emprestimo.AprovePendentes)
   router.delete('/solicitar/deletar/:id',Session.VerificarJWT, Emprestimo.Delete)

// ------------------------------------------------------------

 module.exports=router
 