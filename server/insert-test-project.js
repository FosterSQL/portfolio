import mongoose from 'mongoose'
import config from '../config/config.js'
import Project from './models/project.model.js'

async function run(){
  try{
    await mongoose.connect(config.db)
    console.log('Connected to DB. Inserting test project...')
    const p = new Project({
      title: 'Inserted via script - API test',
      completion: new Date(),
      description: 'This project was inserted by insert-test-project.js to verify DB insertion post-index-drop.',
      image: 'script-image.png'
    })
    const saved = await p.save()
    console.log('Inserted project _id:', saved._id.toString())
  } catch (err) {
    console.error('Insert error:', err)
  } finally {
    await mongoose.disconnect()
  }
}

run()
