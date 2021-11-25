import React, { useState } from 'react';

import { BsTrash } from 'react-icons/bs';
import { HiOutlinePencil } from 'react-icons/hi';

import './TodoList.css'

const TodoList = ({ allTasks,handleDelete, addToTasks, completeTask,}) => {
  const [taskEdit, setTaskEdit] = useState(null);
  const [textEdit, setTextEdit] = useState('');

  const editTask = id => {
    const updatedTasks = [...allTasks].map(task => {
      if (task.id === id) {
        task.title = textEdit.match(/\w/g) ? textEdit : task.title;
        task.isCompleted = textEdit ? false : task.isCompleted;
      }
      return task
    });
    addToTasks(updatedTasks);
    setTaskEdit(null);
    setTextEdit('');
  };

    return (
        <ul className='list'>
          {allTasks.map(({ title, id, isCompleted }) => (
            <li key={id}
                className={isCompleted ? 'complete' : 'list-items'}
                >
                {taskEdit === id ?
                  (<input 
                    className='edit-input'
                    type="text"
                    autoFocus
                    maxLength='120'
                    placeholder='what we do?'
                    onChange={(e) => setTextEdit(e.target.value)}
                    value={textEdit || title}
                    onKeyDown={(e) => e.key === 'Enter' && editTask(id)}
                  />) : (<div className="complete-btn"  onClick={() => completeTask(id)}>
                          <p>{title}</p>
                         </div>)
                }
                {taskEdit === id ? 
                  (<button onClick={() => editTask(id)}>Update</button>)
                   : 
                  (<div className="del-add">
                  <BsTrash 
                    className="delete-btn"
                    onClick={() => handleDelete(id)} />
                  <HiOutlinePencil 
                    className="update-btn"
                    onClick={() => setTaskEdit(id)} />
                </div>)
                }
            </li>
          ))}
        </ul>
      );
};

export default TodoList;