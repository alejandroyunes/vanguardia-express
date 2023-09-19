import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import dotenv from 'dotenv';


import * as middlewares from './middlewares'
import api from './api'
import MessageResponse from './interfaces/MessageResponse'
import mongoose from 'mongoose'
import ContactSchema from './models/contactSchema'

const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(express.json())

const corsOptions = {
  origin: ['https://www.vanguardia.tech'],
  methods: 'POST',
};

app.use(cors(corsOptions));

dotenv.config()

const connectToDb = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_DB}`)
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
};
connectToDb()

app.get<{}, MessageResponse>('/', (_req, res) => {
  res.json({
    message: '👋🌎🌍🌏✨',
  })
})

app.post('/contacto', async (req, res) => {
  const { name, email } = req.body

  if (!name || !email) {
    return res.status(400).json({ error: 'Name, email, and message are required' })
  }

  try {
    const contact = new ContactSchema(req.body)
    await contact.save()

    res.status(200).json({ message: 'ok' });

  } catch (error) {
    res.send(error)
  }
})

app.use('/api/v1', api)

app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

export default app
