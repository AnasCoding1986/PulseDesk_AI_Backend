import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Workspace from '../models/Workspace';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/AppError';
import { sendResponse } from '../utils/response';

const signToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN as any,
  } as jwt.SignOptions);
};

export const register = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password, workspaceName } = req.body;

  const newUser = await User.create({
    name,
    email,
    password,
    role: 'owner',
  });

  // Create a default workspace for the new owner
  const workspace = await Workspace.create({
    name: workspaceName || `${name}'s Workspace`,
    slug: (workspaceName || name).toLowerCase().replace(/ /g, '-'),
    owner: newUser._id,
    members: [{ user: newUser._id, role: 'admin' }],
  });

  newUser.workspaces.push(workspace._id as any);
  await newUser.save();

  const token = signToken((newUser._id as any).toString());

  sendResponse(res, 201, 'User registered successfully', {
    token,
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      workspaces: newUser.workspaces,
    },
  });
});

export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await (user as any).comparePassword(password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  const token = signToken(user._id.toString());

  sendResponse(res, 200, 'Logged in successfully', {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});
