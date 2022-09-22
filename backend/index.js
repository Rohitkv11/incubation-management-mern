const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require("dotenv")
const connectDatabase = require('./config/connection')

dotenv.config();    


const userRoutes = require('./routes/user')
const adminRoutes = require('./routes/admin')   



connectDatabase();

app.use(cors())
app.use(express.json())


app.use('/users',userRoutes)
app.use('/admin',adminRoutes)



app.listen(3001,()=>{
    console.log("server started on 3001");
})