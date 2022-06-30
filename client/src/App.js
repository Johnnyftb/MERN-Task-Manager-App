import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'
import './app.css';

import { getTasks, addTask, updateTask, removeTask } from "./api/tasks";

const App = () => {

    const [tasks, setTasks] = React.useState([]);
    const [newTask, setNewTask] = React.useState("");

    React.useEffect(() => {
        getTasks().then(response => setTasks(response.data));
    }, [])

    const addNewTask = async () => {
        await addTask({task: newTask}).then(response => {
            setTasks(tasks => {
                return [
                    ...tasks,
                    response.data
                ]
            })
        })
        setNewTask("");
    }

    const completeTask = async (id) => {
        await updateTask(id, {completed: true}).then(response => setTasks(response.data));
    }

    const deleteTask = async (id) => {
        await removeTask(id).then(response => setTasks(response.data));
    }

    return (
        <div className="app d-flex justify-content-center align-items-center bg-light">
            <div className="content w-50 h-50 rounded bg-white shadow d-flex flex-column p-3">
                <div className="row justify-content-between">
                    <div className="col-9">
                        <input type="text" placeholder="task" className='w-100 border border-none lead' value={newTask} onChange={(e) => setNewTask(e.target.value)}/>
                    </div>
                    <div className="col-3">
                        <button className="btn bg-dark text-white w-100 rounded fw-bold" onClick={addNewTask}>Add</button>
                    </div>
                </div>
                {tasks && tasks.map(item => (
                    <div className="my-2 w-100 bg-dark text-white d-flex justify-content-between align-items-center rounded p-2">
                        <p className={`lead mb-0 ${item.completed && 'line-through'}`}>{item.task}</p>
                        <div className="d-flex justify-content-center align-items-center">
                            <i className="fa fa-check fa-md text-success mx-2" onClick={() => completeTask(item._id)}></i>
                            <i className="fa fa-trash-can fa-md text-danger mx-2" onClick={() => deleteTask(item._id)}></i>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default App;