require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const API_KEY = process.env.API_KEY || "my-secret-key";

const checkApiKey = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey || apiKey !== API_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
};

app.use("/api/tasks", checkApiKey);

let tasks = [];
let nextId = 1;

app.get("/api/tasks", async (req, res) => {
  console.log("GET /api/tasks");
  try {
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка при запросе к API" });
  }
});

app.post("/api/tasks", async (req, res) => {
  console.log("POST /api/tasks", req.body);
  try {
    const { task } = req.body;
    const newTask = {
      id: nextId++,
      ...task,
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка при создании задачи" });
  }
});

app.delete("/api/tasks/:id", async (req, res) => {
  console.log(`DELETE /api/tasks/${req.params.id}`);
  try {
    const id = parseInt(req.params.id);
    const initialLength = tasks.length;

    tasks = tasks.filter((task) => task.id !== id);

    if (tasks.length === initialLength) {
      return res.status(404).json({ error: "Задача не найдена" });
    }

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка при удалении задачи" });
  }
});

app.put("/api/tasks/:id", async (req, res) => {
  console.log(`PUT /api/tasks/${req.params.id}`, req.body);
  try {
    const id = parseInt(req.params.id);
    const { task } = req.body;

    const taskIdx = tasks.findIndex((task) => task.id === id);
    if (taskIdx === -1) {
      return res.status(404).json({ error: "Задача не найдена" });
    }

    tasks[taskIdx] = task;
    res.json(tasks[taskIdx]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка при обновлении задачи" });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
