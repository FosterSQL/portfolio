import express from 'express'
    import contactCtrl from '../controllers/contact.controller.js' 
    const router = express.Router()

    import authCtrl from '../controllers/auth.controller.js'
    router.route('/api/contacts').post(authCtrl.requireSignin, authCtrl.isAdmin, contactCtrl.create)
    router.route('/api/contacts').get(contactCtrl.list)
    router.route('/api/contacts').delete(authCtrl.requireSignin, authCtrl.isAdmin, contactCtrl.removeMany)
    router.param('contactId', contactCtrl.contactByID)
    router.route('/api/contacts/:contactId').get(contactCtrl.read)
    router.route('/api/contacts/:contactId').put(authCtrl.requireSignin, authCtrl.isAdmin, contactCtrl.update)
    router.route('/api/contacts/:contactId').delete(authCtrl.requireSignin, authCtrl.isAdmin, contactCtrl.remove)

    export default router


