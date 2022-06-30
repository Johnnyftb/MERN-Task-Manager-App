import axios from 'axios';

const url = "http://localhost:5000";

export const getTasks = () => {
    return axios.get(url);
}

export const addTask = (task) => {
    return axios.post(url, task)
}

export const updateTask = (id, updatedTask) => {
    return axios.patch(`${url}/${id}`, updatedTask);
}

export const removeTask = (id) => {
    return axios.delete(`${url}/${id}`);
}