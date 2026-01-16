import { render, screen, fireEvent } from "@testing-library/react";
import TaskInput from "../TaskInput";

describe("TaskInput component", () => {
  test("Отображение инпут и кнопки", () => {
    render(
      <TaskInput inputValue='' setInputValue={() => {}} onAddTask={() => {}} />
    );

    expect(screen.getByPlaceholderText("Введите задачу")).toBeInTheDocument();
    expect(screen.getByText("Добавить")).toBeInTheDocument();
  });

  test("Изменяет значение при вводе текста", () => {
    const setInputValue = jest.fn();
    render(
      <TaskInput inputValue='' setInputValue={setInputValue} onAddTask={() => {}} />
    );

    fireEvent.change(screen.getByPlaceholderText("Введите задачу"), {
      target: { value: "Купить хлеб" },
    });

    expect(setInputValue).toHaveBeenCalledWith("Купить хлеб");
  });

  test("Вызывается onAddTask при клике на кнопку", () => {
    const onAddTask = jest.fn();
    render(
      <TaskInput inputValue='' setInputValue={() => {}} onAddTask={onAddTask} />
    );

    fireEvent.click(screen.getByText("Добавить"));

    expect(onAddTask).toHaveBeenCalledTimes(1);
  });
});
