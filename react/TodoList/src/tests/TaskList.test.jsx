import { render, screen, fireEvent } from "@testing-library/react";
import TaskList from "../TaskList";

describe("TaskList component", () => {
  test("Рендерит список задач", () => {
    const tasks = [
      { id: 1, text: 'first' },
      { id: 2, text: 'second' },
    ];
    render(
      <TaskList tasks={tasks} onDeleteTask={() => {}} />
    );


    tasks.forEach((task) => {
      expect(screen.getByText(task.text)).toBeInTheDocument();
    });
  });
});
