import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import Template from './../template.js'
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import contactRoutes from './routes/contact.routes.js'
import projectRoutes from './routes/project.routes.js'
import educationRoutes from './routes/education.routes.js'

const app = express()

// CORS configuration for production
const corsOptions = {
    origin: [
        'http://localhost:5173',
        'https://fostersql.github.io'
    ],
    credentials: true,
    optionsSuccessStatus: 200,
}

// Middleware
app.use(cors(corsOptions))
app.use(helmet())
app.use(compress())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/', authRoutes)
app.use('/', userRoutes)
app.use('/', contactRoutes)
app.use('/', projectRoutes)
app.use('/', educationRoutes)
app.use((err, req, res, next) => {
 if (err.name === 'UnauthorizedError') {
 res.status(401).json({"error" : err.name + ": " + err.message})
 }else if (err) {
 res.status(400).json({"error" : err.name + ": " + err.message})
 console.log(err)
 }
 })
export default app

