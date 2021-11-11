import React from 'react';
import { BsTrash } from 'react-icons/bs';
//import { HiOutlinePencil } from 'react-icons/hi';
const TodoList = ({ allTasks,handleDelete }) => {
    return (
        <ul>
          {allTasks.map(({ title, description, id }) => (
            <li key={id}>
              <div>
                <h2>{title}</h2>
                <BsTrash onClick={() => handleDelete(id)} />
              </div>
              {!description ? null : <p>{description}</p>}
            </li>
          ))}
        </ul>
      );
};

export default TodoList;