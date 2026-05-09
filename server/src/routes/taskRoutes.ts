import express from 'express';
import * as taskController from '../controllers/taskController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.use(protect);

router.post('/', taskController.createTask);
router.get('/project/:projectId', taskController.getProjectTasks);

router
  .route('/:id')
  .patch(taskController.updateTask)
  .delete(taskController.deleteTask);

export default router;
