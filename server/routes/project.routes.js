import express from 'express';
import projectCtrl from '../controllers/project.controller.js';

const router = express.Router();

// Debug middleware to log requests
router.use('/api/projects', (req, res, next) => {
    console.log(`Project API Request: ${req.method} ${req.url}`);
    next();
});

// Routes
router.route('/api/projects')
    .get(projectCtrl.list)
    .post(projectCtrl.create)
    .delete(projectCtrl.removeMany);

router.route('/api/projects/:projectId')
    .get(projectCtrl.read)
    .put(projectCtrl.update)
    .delete(projectCtrl.remove);

// This must come after the routes that use :projectId
router.param('projectId', projectCtrl.projectByID);

export default router;


