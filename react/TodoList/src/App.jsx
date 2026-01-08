import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddTask = () => {
    if (inputValue.trim() === "") return;

    setTasks([...tasks, { id: Date.now(), text: inputValue }]);
    setInputValue("");
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <>
      <div className="App">
        <h1>Мой список дел</h1>
        <div className="input-container">
          <input
            type="text"
            value={inputValue}
            placeholder="Введите задачу"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button onClick={handleAddTask}>Добавить</button>
        </div>
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id}>
              <p>{task.text}</p>
              <button
                className="delete-btn"
                onClick={() => handleDeleteTask(task.id)}
              >
                Удалить
              </button>
            </li>
          ))}
        </ul>
        <p>Задач: {tasks.length}</p>
      </div>
    </>
  )
}

export default App;
