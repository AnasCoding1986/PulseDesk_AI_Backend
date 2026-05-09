import { Response, NextFunction } from 'express';
import Project from '../models/Project';
import { catchAsync } from '../utils/catchAsync';
import { sendResponse } from '../utils/response';
import { AuthRequest } from '../middleware/authMiddleware';
import { AppError } from '../utils/AppError';

export const getAllProjects = catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
  // In a real app, we'd filter by workspace ID from the user
  const projects = await Project.find().populate('client').populate('assignedTo');
  sendResponse(res, 200, 'Projects retrieved successfully', projects);
});

export const createProject = catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
  const newProject = await Project.create({
    ...req.body,
    workspace: req.user.workspaces[0], // Use first workspace by default
  });
  sendResponse(res, 201, 'Project created successfully', newProject);
});

export const getProject = catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
  const project = await Project.findById(req.params.id).populate('client').populate('assignedTo');
  if (!project) return next(new AppError('No project found with that ID', 404));
  sendResponse(res, 200, 'Project retrieved successfully', project);
});

export const updateProject = catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!project) return next(new AppError('No project found with that ID', 404));
  sendResponse(res, 200, 'Project updated successfully', project);
});
