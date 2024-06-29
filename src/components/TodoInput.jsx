import React, { useState } from 'react';
import TodoList from './TodoList';

const TodoInput = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [list, setList] = useState([]);
    const [filter, setFilter] = useState("All");

    const handleSubmit = () => {
        const taskObj = {
            name,
            description,
            status: "Not Completed"
        };
        setList([...list, taskObj]);
        setName("");
        setDescription("");
    };

    const handleDelete = (index) => {
        const newList = list.filter((_, i) => i !== index);
        setList(newList);
    };

    const handleEdit = (index, updatedTask) => {
        const newList = list.map((task, i) => i === index ? updatedTask : task);
        setList(newList);
    };

    const handleStatusChange = (index, newStatus) => {
        const newList = list.map((task, i) => i === index ? { ...task, status: newStatus } : task);
        setList(newList);
    };

    const filteredList = list.filter(task => {
        if (filter === "All") return true;
        return task.status === filter;
    });

    const getFilterBackgroundColor = (filter) => {
        switch (filter) {
            case "Completed":
                return "#16AC88";
            case "Not Completed":
                return "#FF8284";
            case "All":
                return "#FF8284"; 
        }
    };

    return (
        <div>
            <h1 className='text-center' style={{color:"#16AC88"}}>My todo</h1>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-4">
                        <input type="text" className="form-control border-success" id="name" placeholder="Todo Name" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div className="col-4">
                        <input type="text" className="form-control border-success" id="description" placeholder="Todo Description" value={description} onChange={e => setDescription(e.target.value)} />
                    </div>
                    <div className="col-2">
                        <button type='button' className='btn btn-success px-5' style={{backgroundColor:"#16AC88"}} onClick={handleSubmit}>Add Todo</button>
                    </div> 
                </div>
                <div className="title mt-4">
                    <h3 className='text-dark'>My Todos</h3>
                    <div className="dropdown">
                        <p className="h3">Status Filter:</p>
                        <select
                            className="form-select"
                            value={filter}
                            onChange={e => setFilter(e.target.value)}
                            style={{ backgroundColor: getFilterBackgroundColor(filter) , display:'inline-block'}}
                        >
                            <option value="All">All</option>
                            <option value="Completed">Completed</option>
                            <option value="Not Completed">Not Completed</option>
                        </select>
                    </div>
                </div>
            </div>
            <TodoList lists={filteredList} onDelete={handleDelete} onEdit={handleEdit} onStatusChange={handleStatusChange} />
        </div>
    );
};

export default TodoInput;
