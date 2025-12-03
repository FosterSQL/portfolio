import mongoose from 'mongoose'
import config from '../config/config.js'

async function dropIndex() {
  try {
    console.log('Connecting to DB:', config.db)
    await mongoose.connect(config.db)
    const coll = mongoose.connection.collection('projects')
    const indexes = await coll.indexes()
    console.log('Current indexes on projects collection:', indexes.map(i => i.name))
    const idx = indexes.find(i => i.name === 'email_1')
    if (!idx) {
      console.log('Index "email_1" not found on projects collection. Nothing to drop.')
    } else {
      console.log('Dropping index "email_1" on projects collection...')
      await coll.dropIndex('email_1')
      console.log('Dropped index "email_1".')
    }
  } catch (err) {
    console.error('Error while dropping index:', err)
  } finally {
    await mongoose.disconnect()
  }
}

dropIndex()
