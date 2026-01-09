export default function TaskItem({ task, onDelete }) {
  return (
    <li>
      <span>{task.text}</span>
      <button
        className="delete-btn"
        onClick={() => onDelete(task.id)}
      >
        Удалить
      </button>
    </li>
  );
}
