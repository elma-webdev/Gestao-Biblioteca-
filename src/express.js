const cors = require('cors')
const express= require('express')
const router=require('./router')
const cookieParser=require("cookie-parser")
const app=express()



app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use('/api', router)



const mongoose=require('./mongodb/connection');



module.exports=app