import React from 'react'
import './App.css'
import {useState} from 'react'

const App = () => {

  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])
  const [editId,setEditID]=useState(0)
  


  const handleSubmit=(e)=>{
    e.preventDefault()

    if(editId){
      const editTodo=todos.find((i)=>i.id===editId)

      const updatedTodos=todos.map((t)=>t.id===editTodo.id?(t={id:t.id,todo}):{id:t.id,todo:t.todo})

      setTodos(updatedTodos)
      setEditID(0)
      setTodo('')
      return;
    }

    if(todo!==''){
      setTodos([{id:`${todo}-${Date.now()}` ,todo},...todos])
      setTodo('')
    }
  };

  const handleDelete=(id)=>{
    const delTodo=todos.filter((to)=> to.id !== id)
    setTodos([...delTodo])
  }

  const handleEdit=(id)=>{
    const editTodo=todos.find((i)=>i.id===id)
    setTodo(editTodo.todo)
    setEditID(id)
  }

  return (
    <div className='App'>
     <div className='container'>
      <h1>ToDo List App</h1>
      <form className='todoform' onSubmit={handleSubmit}>
        <input type='text' value={todo} onChange={(e)=>setTodo(e.target.value)}/>
        <button type='submit'>{editId?'Edit':'Go'}</button>
      </form>

      <ul className='alltodos'>


        {
          todos.map((t)=>{
          return (
          <li className='singletodo'>
          <span className='todotext' key={t.id}>{t.todo}</span>
          <button onClick={()=>handleEdit(t.id)}>Edit</button>
          <button onClick={()=>handleDelete(t.id)}>Delete</button>
        </li>
        );
          })
        }

        
      </ul>
     </div>
    </div>
  )
}

export default App
