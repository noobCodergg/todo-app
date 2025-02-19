import { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [error, setError] = useState("");
  const navigate=useNavigate();
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/todo/gettodo/${localStorage.getItem("userId")}`,{
        withCredentials:true
      });
      setTodos(response.data);
    } catch (err) {
      setError("Failed to fetch todos");
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      await axios.post("http://localhost:5000/api/todo/createtodo", {
        task: newTodo,
        userId: localStorage.getItem("userId")
      },{withCredentials:true});
      setNewTodo("");
      fetchTodos(); 
    } catch (err) {
      setError("Failed to add todo");
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todo/deletetodo/${id}`,{
        withCredentials:true
      });
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id)); 
    } catch (err) {
      setError("Failed to delete todo");
    }
  };

  const handleLogOut = async () =>{
    try{
      await axios.post("http://localhost:5000/api/auth/logout",{},{
        withCredentials: true
      })
      localStorage.removeItem("userId");
      alert("Logged Out Successfully");
      navigate("/");
    }catch(error){
      console.log("Error during logout")
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-semibold mb-4">Todo List</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={addTodo} className="mb-4 flex gap-2">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new todo"
          className="p-2 border rounded-md"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
          Add Todo
        </button>
      </form>
      <ul className="w-96 bg-white p-4 rounded-lg shadow-md">
        {todos.map((todo) => (
          <li key={todo.id} className="flex justify-between items-center p-2 border-b">
            <span>{todo.task}</span>
            <button onClick={() => deleteTodo(todo.id)} className="text-red-500">
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleLogOut} className="px-4 py-2 mt-10 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition">
  Log Out
</button>

    </div>
  );
};

export default Dashboard;
