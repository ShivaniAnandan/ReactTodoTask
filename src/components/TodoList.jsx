import React, { useState } from 'react';

const TodoList = ({ lists, onDelete, onEdit, onStatusChange }) => {
    const [editIndex, setEditIndex] = useState(-1);
    const [editName, setEditName] = useState("");
    const [editDescription, setEditDescription] = useState("");

    const handleEdit = (index) => {
        setEditIndex(index);
        setEditName(lists[index].name);
        setEditDescription(lists[index].description);
    };

    const handleSave = (index) => {
        onEdit(index, { ...lists[index], name: editName, description: editDescription });
        setEditIndex(-1);
    };

    const getStatusBackgroundColor = (status) => {
        return status === "Completed" ? "#16AC88" : "#FF8284";
    };

    return (
        <div>
            <div className="row">
                {lists.map((list, index) => (
                    <div className="col-3" key={index}>
                        <div className="card" style={{ backgroundColor: "#CCF5D3" }}>
                            <div className="card-body">
                                {editIndex === index ? (
                                    <>
                                        <input type="text" className="form-control" value={editName} onChange={e => setEditName(e.target.value)} />
                                        <input type="text" className="form-control mt-2" value={editDescription} onChange={e => setEditDescription(e.target.value)} />
                                    </>
                                ) : (
                                    <>
                                        <p className="card-title">Name: {list.name}</p>
                                        <p className="card-text">Description: {list.description}</p>
                                    </>
                                )}
                                <div className="dropdown mt-2">
                                    <p>Status:</p>
                                    <select
                                        className="form-select"
                                        value={list.status}
                                        onChange={e => onStatusChange(index, e.target.value)}
                                        style={{ backgroundColor: getStatusBackgroundColor(list.status) }}
                                    >
                                        <option value="Completed">Completed</option>
                                        <option value="Not Completed">Not Completed</option>
                                    </select>
                                </div>
                                <div className="buttonflex mt-2">
                                    {editIndex === index ? (
                                        <button className="btn" style={{ backgroundColor: "#13AD89" }} onClick={() => handleSave(index)}>Save</button>
                                    ) : (
                                        <button className="btn" style={{ backgroundColor: "#13AD89" }} onClick={() => handleEdit(index)}>Edit</button>
                                    )}
                                    <button className="btn" style={{ backgroundColor: "#D05E1F" }} onClick={() => onDelete(index)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TodoList;
