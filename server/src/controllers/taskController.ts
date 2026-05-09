import { Response, NextFunction } from 'express';
import Task from '../models/Task';
import { catchAsync } from '../utils/catchAsync';
import { sendResponse } from '../utils/response';
import { AuthRequest } from '../middleware/authMiddleware';
import { AppError } from '../utils/AppError';

export const getProjectTasks = catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
  const tasks = await Task.find({ project: req.params.projectId }).populate('assignee');
  sendResponse(res, 200, 'Tasks retrieved successfully', tasks);
});

export const createTask = catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
  const newTask = await Task.create(req.body);
  sendResponse(res, 201, 'Task created successfully', newTask);
});

export const updateTask = catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) return next(new AppError('No task found with that ID', 404));
  sendResponse(res, 200, 'Task updated successfully', task);
});

export const deleteTask = catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return next(new AppError('No task found with that ID', 404));
  sendResponse(res, 204, 'Task deleted successfully');
});
