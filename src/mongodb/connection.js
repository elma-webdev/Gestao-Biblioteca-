const mongoose=require('mongoose')
mongoose.connect('mongodb://127.0.0.1/biblioteca')
.then(()=>console.log('BD FUNCIONANDO'))
.catch(error=>
    console.log('ERRO NA CONEXÃO', error)
    )

module.exports=mongoose
