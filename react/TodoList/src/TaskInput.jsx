export default function TaskInput({inputValue, setInputValue, onAddTask}) {
  return (
    <div className="input-container">
      <input
        type="text"
        value={inputValue}
        placeholder="Введите задачу"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={onAddTask}>Добавить</button>
    </div>
  );
}
