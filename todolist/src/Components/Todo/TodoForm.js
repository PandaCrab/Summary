import React from 'react';

import './TodoForm.css'

const TodoForm = ({ newTask, handleChange, handleSubmit }) =>
{
    return (
        <form onSubmit={handleSubmit} className='submit-area'>
          <input
          maxLength="118"
            className='input'
            name="title"
            placeholder="New task"
            value={newTask.title || ""}
            onChange={handleChange}
          />
          {!newTask.title ? null : (
              <>
              <button type="submit">Add Task</button>
              </>
          )}
        </form>
      );
};


export default TodoForm;