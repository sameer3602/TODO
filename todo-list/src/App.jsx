import { useEffect, useState } from 'react'
import './App.css'
import { Todoprovider } from './contexts'
import Form from './components/Form'
import Item from './components/Item'

function App() {
  const [todos,setTodos]=useState([])
  const addTodo=(todo)=>{
    setTodos((prevTodo)=>[...prevTodo,{id:Date.now(),...todo}])
  }
  const updateTodo=(id,todo)=>{
    setTodos((prevTodo)=>prevTodo.map((prev)=>(prev.id===id ? todo:prev)))
  }
  const deleteTodo=(id)=>{
    setTodos((prevTodo)=>prevTodo.filter((todo)=>todo.id!==id))
  }
  const toggleComplete=(id)=>{
    setTodos((prevTodo)=>prevTodo.map((prev)=>prev.id===id ? {...prev,completed:!prev.completed}:prev))
  }

  useEffect(()=>{
    const todos=JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length>0){
      setTodos(todos)
    }
  },[])
  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])
  return (
      <Todoprovider value={{todos,addTodo,updateTodo,deleteTodo,toggleComplete}}>
          <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */}
                        <Form/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo)=>(
                          <div key={todo.id} className='w-full'>
                            <Item todo={todo}/>
                          </div>
                        ))}
                    </div>
                </div>
          </div>
      </Todoprovider>
    
  )
}

export default App
