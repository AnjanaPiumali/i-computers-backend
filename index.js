import express, { application } from 'express'
import mongoose from 'mongoose'
import studentRouter from './routes/studentRouter.js'
import userRouter from './routes/userRouter.js'
import authenticateUser from './middlewares/authenticate.js'
import productRouter from './routes/productRouter.js'

const mongoUrl = "mongodb://admin:1234@ac-ejvimcb-shard-00-00.nszhldb.mongodb.net:27017,ac-ejvimcb-shard-00-01.nszhldb.mongodb.net:27017,ac-ejvimcb-shard-00-02.nszhldb.mongodb.net:27017/?ssl=true&replicaSet=atlas-egy3zi-shard-0&authSource=admin&appName=Cluster0"

mongoose.connect(mongoUrl).then(
    ()=> {
        console.log("Connected to MongoDB")
    }
)

const app = express()

app.use(express.json())

app.use(authenticateUser)

app.use("/students",studentRouter)
app.use("/users",userRouter)
app.use("/products",productRouter)



app.listen(3000,
    () =>{
        console.log('Server is running')
    }
)
