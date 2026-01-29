import { useState } from "react";

export default function TaskItem({ task, onDelete, onUpdate, onComplete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [isActive, setIsActive] = useState(task.active || false);
  const [isCompleted, setIsCompleted] = useState(task.completed || false);

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(task.text);
  };

  const handleSave = () => {
    if (editText.trim() === "") {
      handleCancel();
      return;
    }

    onUpdate(task.id, editText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(task.text);
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  const handleToggleComplete = () => {
    const newCompletedState = !isCompleted;
    setIsCompleted(newCompletedState);

    if (newCompletedState) {
      setIsActive(false);
    }

    onComplete(task.id, newCompletedState);
    onUpdate(task.id, task.text, newCompletedState, false);
  };

  const handleActiveToggle = () => {
    const newActiveState = !isActive;
    setIsActive(newActiveState);

    if (newActiveState) {
      setIsCompleted(false);
    }

    onUpdate(task.id, task.text, false, newActiveState);
  };

  return (
    <li
      className={`task-item ${isCompleted ? "task-completed" : ""} ${isActive ? "task-active" : ""}`}
    >
      {isEditing ? (
        <div className="edit-mode">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyPress}
            className="edit-input"
            autoFocus
            placeholder="Введите текст задачи..."
          />

          <div className="edit-options">
            <label className="option-checkbox">
              <input
                type="checkbox"
                checked={isCompleted}
                onChange={handleToggleComplete}
                disabled={isActive}
              />
              <span>Выполнено</span>
            </label>

            <label className="option-checkbox">
              <input
                type="checkbox"
                checked={isActive}
                onChange={handleActiveToggle}
                disabled={isCompleted}
              />
              <span>Активно</span>
            </label>
          </div>

          <div className="edit-buttons">
            <button onClick={handleSave} className="save-btn">
              Сохранить
            </button>
            <button onClick={handleCancel} className="cancel-btn">
              Отмена
            </button>
          </div>
        </div>
      ) : (
        <div className="view-mode">
          <div className="task-checkbox">
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={handleToggleComplete}
              disabled={isActive}
              id={`task-${task.id}`}
              className="checkbox-input"
            />
            <label
              htmlFor={`task-${task.id}`}
              className="checkbox-label"
            ></label>
          </div>

          <span className={`task-text ${isCompleted ? "completed-text" : ""}`}>
            {task.text}
            {isCompleted && (
              <span className="completion-badge">
                <span className="badge-icon">✓</span>
                Выполнено
              </span>
            )}
          </span>

          <div className="task-indicators">
            {isActive && (
              <span className="active-indicator" title="Активная задача">
                🔥
              </span>
            )}
          </div>

          <div className="task-actions">
            <button
              onClick={handleEdit}
              className="edit-btn"
              disabled={isCompleted}
            >
              ✏️ Редактировать
            </button>
            <button onClick={() => onDelete(task.id)} className="delete-btn">
              🗑️ Удалить
            </button>
          </div>
        </div>
      )}
    </li>
  );
}
