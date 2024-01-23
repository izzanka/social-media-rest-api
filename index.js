const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')

const app = express()
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')

dotenv.config()

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("connected to mongodb")
}).catch((error) => {
    console.log("error connecting to mongodb: ", error)
})

app.use(express.json())
app.use(helmet())
app.use(morgan("common"))

app.use('/api/v1/users', userRoute)
app.use('/api/v1/auth', authRoute)

app.listen(8800, () => {
    console.log('backend server is running')
})