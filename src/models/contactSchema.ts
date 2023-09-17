import mongoose, { Schema } from 'mongoose'

const contactSchema = new Schema({
  name: String,
  email: String,
  message: String
})

const ContactSchema = mongoose.model('Contact', contactSchema)

export default ContactSchema