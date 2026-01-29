export default function TaskInput({
  inputValue,
  setInputValue,
  onKeyPress,
  onAddTask,
}) {
  return (
    <div className="input-container">
      <input
        type="text"
        value={inputValue}
        onKeyDown={onKeyPress}
        placeholder="Введите задачу"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={onAddTask}>Добавить</button>
    </div>
  );
}
