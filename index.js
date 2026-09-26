require ('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const connectDB = require('./config/mongoDBConfig.js')

const studentRouter = require('./routes/studentRouter.js')

connectDB()

app.use(cors())
app.use(express.json())


app.use('/api/auth/v1/students',studentRouter)


const port = process.env.PORT || 5000

app.listen(port, ()=> {
    console.log("server is running")
})

