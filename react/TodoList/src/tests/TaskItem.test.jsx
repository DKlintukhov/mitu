import { render, screen, fireEvent } from "@testing-library/react";
import TaskItem from "../TaskItem";

describe("TaskItem component", () => {
  test("Рендерит текст задачи", () => {
    const task = { id: 1, text: "Изучить Jest" };
    render(
      <TaskItem task={task} onDelete={() => {}} />
    );

    expect(screen.getByText("Изучить Jest")).toBeInTheDocument();
  });

  test("Вызывается onDelete при клике на кнопку удаления", () => {
    const task = { id: 1, text: "Изучить Jest" };
    const onDelete = jest.fn();
    render(
      <TaskItem task={task} onDelete={onDelete} />
    );

    fireEvent.click(screen.getByText(/удалить/i));

    expect(onDelete).toHaveBeenCalledWith(task.id);
  });
});
