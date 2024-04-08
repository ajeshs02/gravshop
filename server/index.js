import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'
import cors from 'cors'
import connectDB from './config/dbConnection.js'
import { userRouter } from './routes/userRoutes.js'
import { errorHandler, notFound } from './middlewares/errorHandler.js'
import { storeRouter } from './routes/storeRoutes.js'

//for database connection
connectDB()

const port = process.env.PORT || 4000

const app = express()
//for populating "req.body" with the data send from the frontend form
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//for accessing the cookies on "req.cookies"
app.use(cookieParser())

//to allow frontend to access backend
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000'],
  })
)

//main routes
app.use('/api/v1/user', userRouter)
app.use('/api/v1/store', storeRouter)

//error handling middleware
app.use(notFound)
app.use(errorHandler)

//server starting on specified port
app.listen(port, () => {
  console.log(`Server is listening to port ${port}`)
})
