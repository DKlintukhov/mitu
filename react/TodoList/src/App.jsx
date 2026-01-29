import { useState, useEffect } from "react";
import TaskInput from "./TaskInput.jsx";
import TaskList from "./TaskList.jsx";
import Filter from "./Filter.jsx";
import "./App.css";

function App() {
  const API_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:4000/api/tasks"
      : "https://mitu-virid.vercel.app/api/tasks";
  const API_KEY = "my-secret-key";

  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getFilteredTasks = () => {
    switch (filter) {
      case "active":
        return tasks.filter((task) => task.active);
      case "completed":
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL, { headers: { "x-api-key": API_KEY } });

      if (!res.ok) {
        throw new Error(`Ошибка ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      setTasks(data);
    } catch (err) {
      setError(`Ошибка загрузки: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async () => {
    if (inputValue.trim() === "") {
      setError("Введите текст задачи");
      return;
    }

    const task = { text: inputValue, active: false, completed: false };

    try {
      setError("");
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
        body: JSON.stringify({ task }),
      });

      if (!res.ok) {
        throw new Error(`Ошибка ${res.status}: ${res.statusText}`);
      }

      const newTask = await res.json();
      setTasks((prev) => [...prev, newTask]);
      setInputValue("");
    } catch (err) {
      setError(`Ошибка добавления: ${err.message}`);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      setError("");
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          "x-api-key": API_KEY,
        },
      });

      if (!res.ok) {
        throw new Error(`Ошибка ${res.status}: ${res.statusText}`);
      }

      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      setError(`Ошибка удаления: ${err.message}`);
    }
  };

  const handleUpdateTask = async (task) => {
    try {
      setError("");
      const res = await fetch(`${API_URL}/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
        body: JSON.stringify({ task }),
      });

      if (!res.ok) {
        throw new Error(`Ошибка ${res.status}: ${res.statusText}`);
      }

      const updated = await res.json();
      setTasks((prev) => prev.map((el) => (el.id === task.id ? updated : el)));
    } catch (err) {
      setError(`Ошибка обновления: ${err.message}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  return (
    <>
      <div className="App">
        <header>
          <h1>Мой список дел</h1>
        </header>
        <main className="main-content">
          <TaskInput
            inputValue={inputValue}
            setInputValue={setInputValue}
            onKeyPress={handleKeyPress}
            onAddTask={handleAddTask}
          />
          <Filter currentFilter={filter} onFilterChange={setFilter} />
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Загрузка...</p>
            </div>
          ) : (
            <TaskList
              tasks={getFilteredTasks()}
              onDeleteTask={handleDeleteTask}
              onUpdateTask={handleUpdateTask}
            />
          )}
        </main>
        <footer className="footer">
          <p>Задач: {tasks.length}</p>
          {error && (
            <div className="error-message">
              <span>{error}</span>
              <button
                onClick={() => setError("")}
                className="error-close"
                title="Закрыть"
              >
                ×
              </button>
            </div>
          )}
        </footer>
      </div>
    </>
  );
}

export default App;
