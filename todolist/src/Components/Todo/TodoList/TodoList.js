import React, { useState } from 'react';

import { BsTrash } from 'react-icons/bs';
import { HiOutlinePencil } from 'react-icons/hi';

import './TodoList.css'

const TodoList = ({ allTasks,handleDelete }) => {
  const [taskEdit, setTaskEdit] = useState(null);
  const [textEdit, setTextEdit] = useState("");

  const editTask = id => {
    [...allTasks].map(task => {
      if (task.id === id) {
        task.title = textEdit
      }
      return task
    });
    setTaskEdit(null);
    setTextEdit("");
  };

    return (
        <ul className='list'>
          {allTasks.map(({ title, id }) => (
            <li key={id} className='list-items'>
                {taskEdit === id ?
                  (<input 
                    className='edit-input'
                    type="text"
                    onChange={(e) => setTextEdit(e.target.value)}
                    value={textEdit}
                  />) : <h2>{title}</h2>
                }
                {taskEdit === id ? (<button onClick={() => editTask(id)}>submit edit</button>) : (<div className="del-add">
                  <BsTrash onClick={() => handleDelete(id)} />
                  <HiOutlinePencil onClick={() => setTaskEdit(id)} />
                </div>)
                }
            </li>
          ))}
        </ul>
      );
};

export default TodoList;