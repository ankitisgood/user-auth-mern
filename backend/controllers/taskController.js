import { tasks } from '../models/taskModel.js';
import { v4 as uuidv4 } from 'uuid';

export const createTask = (req, res) => {
  const { title, startTime, endTime, priority, status } = req.body;

  const id = uuidv4();
  tasks.push({ id, title, startTime: new Date(startTime), endTime: new Date(endTime), priority, status });
  res.status(201).json({ message: 'Task created successfully', taskId: id });
};

export const updateTask = (req, res) => {
  const { id } = req.params;
  const { title, startTime, endTime, priority, status } = req.body;

  const task = tasks.find(task => task.id === id);
  if (!task) return res.status(404).json({ message: 'Task not found.' });

  if (status === 'finished' && task.status !== 'finished') {
    task.endTime = new Date();
  }
  Object.assign(task, { title, startTime: new Date(startTime), endTime: new Date(endTime), priority, status });
  res.json({ message: 'Task updated successfully.' });
};

export const getTasks = (req, res) => {
  const { priority, status, sortBy } = req.query;
  let filteredTasks = tasks;

  if (priority) filteredTasks = filteredTasks.filter(task => task.priority === parseInt(priority, 10));
  if (status) filteredTasks = filteredTasks.filter(task => task.status === status);

  if (sortBy === 'startTime') filteredTasks.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
  if (sortBy === 'endTime') filteredTasks.sort((a, b) => new Date(a.endTime) - new Date(b.endTime));

  res.json(filteredTasks);
};
