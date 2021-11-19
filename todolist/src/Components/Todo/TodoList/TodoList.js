import React from 'react';
import { BsTrash } from 'react-icons/bs';
//import { HiOutlinePencil } from 'react-icons/hi';

import './TodoList.css'

const TodoList = ({ allTasks,handleDelete }) => {
    return (
        <ul className='list'>
          {allTasks.map(({ title, id }) => (
            <li key={id} className='list-items'>
                <h2>{title}</h2>
                <div className="del-add">
                  <BsTrash onClick={() => handleDelete(id)} />
                </div>
            </li>
          ))}
        </ul>
      );
};

export default TodoList;