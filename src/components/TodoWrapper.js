import React, { useState } from 'react'
import TodoForm from './TodoForm'
import {v4 as uuidv4} from 'uuid';

const TodoWrapper = () => {
    const [todos, setTodos] = useState([])

    const addTodo = todo => {
        setTodos([...todos, {id: uuidvv4(), task: todo, completed: false, isEditing: false}])
    }
  return (
    <div className='TodoWrapper'>
      <TodoForm addTodo={addTodo}/>
    </div>
  )
}

export default TodoWrapper
