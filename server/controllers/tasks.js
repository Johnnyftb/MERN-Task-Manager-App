import {Task} from '../models/taskModel.js';
import mongoose from 'mongoose';

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        console.log(error);
    }
}

export const createTask = async (req, res) => {
    const newTask = req.body;
    try {
        const task = await new Task(req.body).save();
        res.status(200).send(task);
    } catch (error) {
        console.log(error);
    }
}

export const updateTask = async (req, res) => {
    const updatedTask = req.body;
    const id = req.params.id;
    try {
        await Task.findOneAndUpdate({_id: id}, updatedTask);
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        console.log(error);
    }
}

export const deleteTask = async (req, res) => {
    const id = req.params.id;
    try {
        await Task.findByIdAndDelete({_id: id});
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        console.log(error);
    }
}