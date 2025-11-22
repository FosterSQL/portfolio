import mongoose from 'mongoose'
import config from '../config/config.js'
import Qualification from './models/qualification.model.js'

async function run(){
  try{
    await mongoose.connect(config.db)
    console.log('Connected to DB. Inserting test qualification...')
    const q = new Qualification({
      title: 'Test Qualification - script',
      firstname: 'Test',
      lastname: 'User',
      completion: new Date('2025-11-21'),
      description: 'Inserted by test script to verify qualification insert works.'
    })
    const saved = await q.save()
    console.log('Inserted qualification _id:', saved._id.toString())
  } catch (err) {
    console.error('Insert error:', err)
  } finally {
    await mongoose.disconnect()
  }
}

run()
