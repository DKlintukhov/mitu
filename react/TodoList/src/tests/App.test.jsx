import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

describe("App component", () => {
  test("Добавляет новую задачу и отображает ее в списке", () => {
    render(<App />);

    const input = screen.getByPlaceholderText(/введите задачу/i);
    const button = screen.getByText(/добавить/i);

    fireEvent.change(input, { target: { value: "Проверить текст" }});
    fireEvent.click(button);

    expect(screen.getByText("Проверить текст")).toBeInTheDocument();
    expect(screen.getByText(/задач: 1/i)).toBeInTheDocument();
  });

  test("Удаляет задачу при клике", () => {
    render(<App />);

    const input = screen.getByPlaceholderText(/введите задачу/i);
    const button = screen.getByText(/добавить/i);

    fireEvent.change(input, { target: { value: "Удалить задачу" }});
    fireEvent.click(button);

    const deleteButton = screen.getByRole("button", { name: /удалить/i });
    fireEvent.click(deleteButton);

    expect(screen.queryByText("Удалить задачу")).not.toBeInTheDocument();
  });
});
