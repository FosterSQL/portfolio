import mongoose from 'mongoose'
import config from '../config/config.js'
import Project from './models/project.model.js'

async function main(){
  try{
    await mongoose.connect(config.db)
    console.log('Connected to DB, fetching latest projects...')
    const projects = await Project.find().sort({_id:-1}).limit(10).lean()
    console.log('Latest projects (up to 10):')
    console.dir(projects, { depth: null })
  } catch (err) {
    console.error('Error fetching projects:', err)
  } finally {
    await mongoose.disconnect()
  }
}

main()
