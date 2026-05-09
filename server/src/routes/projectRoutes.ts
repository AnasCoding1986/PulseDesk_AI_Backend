import express from 'express';
import * as projectController from '../controllers/projectController';
import { protect, restrictTo } from '../middleware/authMiddleware';

const router = express.Router();

router.use(protect); // Protect all project routes

router
  .route('/')
  .get(projectController.getAllProjects)
  .post(restrictTo('owner', 'admin'), projectController.createProject);

router
  .route('/:id')
  .get(projectController.getProject)
  .patch(restrictTo('owner', 'admin'), projectController.updateProject);

export default router;
