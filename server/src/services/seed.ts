import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';
import Workspace from '../models/Workspace';
import Project from '../models/Project';
import Client from '../models/Client';
import Task from '../models/Task';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Workspace.deleteMany({});
    await Project.deleteMany({});
    await Client.deleteMany({});
    await Task.deleteMany({});

    console.log('Cleared existing data.');

    // 1. Create Users
    const users = await User.create([
      { name: 'Azizul Rabby', email: 'anas@pulsedesk.io', password: 'password123', role: 'owner' },
      { name: 'Sara Mitchell', email: 'sara@pulsedesk.io', password: 'password123', role: 'admin' },
      { name: 'James Nguyen', email: 'james@pulsedesk.io', password: 'password123', role: 'member' },
    ]);

    // 2. Create Workspace
    const workspace = await Workspace.create({
      name: 'PulseDesk Agency',
      slug: 'pulsedesk-agency',
      owner: users[0]._id,
      members: [
        { user: users[0]._id, role: 'admin' },
        { user: users[1]._id, role: 'admin' },
        { user: users[2]._id, role: 'member' },
      ],
      plan: 'pro',
    });

    // Update users with workspace
    await User.updateMany({}, { $push: { workspaces: workspace._id } });

    // 3. Create Clients
    const clients = await Client.create([
      { 
        workspace: workspace._id, 
        name: 'Alex Thornton', 
        company: 'NovaTech Solutions', 
        email: 'alex@novatech.io', 
        status: 'active', 
        totalRevenue: 48500 
      },
      { 
        workspace: workspace._id, 
        name: 'Morgan Lee', 
        company: 'Bloom Digital', 
        email: 'morgan@bloomdigital.co', 
        status: 'active', 
        totalRevenue: 32000 
      },
    ]);

    // 4. Create Projects
    const projects = await Project.create([
      {
        workspace: workspace._id,
        name: 'NovaTech Platform Redesign',
        description: 'Complete UI/UX overhaul of the NovaTech SaaS dashboard.',
        client: clients[0]._id,
        status: 'active',
        priority: 'high',
        health: 82,
        startDate: new Date('2024-03-01'),
        dueDate: new Date('2024-06-30'),
        assignedTo: [users[0]._id, users[1]._id],
        budget: 28000,
        progress: 67,
      },
      {
        workspace: workspace._id,
        name: 'Bloom Marketing Microsite',
        description: 'Campaign landing page with A/B testing and animations.',
        client: clients[1]._id,
        status: 'active',
        priority: 'medium',
        health: 94,
        startDate: new Date('2024-04-15'),
        dueDate: new Date('2024-05-31'),
        assignedTo: [users[1]._id],
        budget: 8500,
        progress: 45,
      },
    ]);

    // Update clients with project IDs
    await Client.findByIdAndUpdate(clients[0]._id, { $push: { projects: projects[0]._id } });
    await Client.findByIdAndUpdate(clients[1]._id, { $push: { projects: projects[1]._id } });

    // 5. Create Tasks
    await Task.create([
      { 
        project: projects[0]._id, 
        title: 'Design system audit', 
        status: 'done', 
        priority: 'high', 
        assignee: users[1]._id, 
        order: 0,
        labels: ['design']
      },
      { 
        project: projects[0]._id, 
        title: 'Dashboard layout rebuild', 
        status: 'in-progress', 
        priority: 'critical', 
        assignee: users[0]._id, 
        order: 1,
        labels: ['frontend']
      },
      { 
        project: projects[1]._id, 
        title: 'Landing page copy', 
        status: 'todo', 
        priority: 'medium', 
        assignee: users[1]._id, 
        order: 0,
        labels: ['content']
      },
    ]);

    console.log('✅ Database seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
