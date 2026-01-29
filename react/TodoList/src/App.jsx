import { useState, useEffect } from "react";
import TaskInput from "./TaskInput.jsx";
import TaskList from "./TaskList.jsx";
import "./App.css";

function App() {
  const API_URL = "https://mitu-virid.vercel.app/api/tasks";
  const API_KEY = "my-secret-key";

  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    fetch(API_URL, { headers: { "x-api-key": API_KEY } })
      .then((res) => res.json())
      .then(setTasks)
      .catch((err) => console.error(err));
  }, []);

  const handleAddTask = async () => {
    if (inputValue.trim() === "") return;

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
        body: JSON.stringify({ text: inputValue }),
      });
      const newTask = await res.json();
      setTasks((prev) => [...prev, newTask]);
      setInputValue("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          "x-api-key": API_KEY,
        },
      });
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateTask = async (id, newText) => {
    if (newText.trim() === "") return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
        body: JSON.stringify({ text: newText }),
      });
      const updated = await res.json();
      setTasks((prev) => prev.map((task) => (task.id === id ? updated : task)));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="App">
        <h1>Мой список дел</h1>
        <main className="main-content">
          <TaskInput
            inputValue={inputValue}
            setInputValue={setInputValue}
            onAddTask={handleAddTask}
          />
          <TaskList
            tasks={tasks}
            onDeleteTask={handleDeleteTask}
            onUpdateTask={handleUpdateTask}
          />
        </main>
        <p>Задач: {tasks.length}</p>
      </div>
    </>
  );
}

export default App;
