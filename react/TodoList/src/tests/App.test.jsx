import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";

global.fetch = jest.fn();

const mockTasks = [
  { id: 1, text: "Тестовая задача 1", active: false, completed: false },
  { id: 2, text: "Тестовая задача 2", active: true, completed: false },
  { id: 3, text: "Выполненная задача", active: false, completed: true },
];

describe("App component", () => {
  beforeEach(() => {
    fetch.mockClear();

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockTasks,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("Добавляет новую задачу и отображает ее в списке", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        id: 4,
        text: "Проверить текст",
        active: false,
        completed: false,
      }),
    });

    render(<App />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    const input = screen.getByPlaceholderText(/введите задачу/i);
    const button = screen.getByText(/добавить/i);

    fireEvent.change(input, { target: { value: "Проверить текст" } });
    fireEvent.click(button);

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenLastCalledWith(
      expect.stringContaining("/api/tasks"),
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
          "x-api-key": "my-secret-key",
        }),
      }),
    );

    await waitFor(() => {
      expect(screen.getByText("Задач: 4")).toBeInTheDocument();
    });
  });

  test("Удаляет задачу при клике", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Тестовая задача 1")).toBeInTheDocument();
    });

    const deleteButtons = screen.getAllByRole("button", { name: /🗑️/i });
    fireEvent.click(deleteButtons[0]);

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenLastCalledWith(
      expect.stringContaining("/api/tasks/1"),
      expect.objectContaining({
        method: "DELETE",
        headers: expect.objectContaining({
          "x-api-key": "my-secret-key",
        }),
      }),
    );

    await waitFor(() => {
      expect(screen.queryByText("Тестовая задача 1")).not.toBeInTheDocument();
    });
  });

  test("Загружает и отображает список задач", async () => {
    render(<App />);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringMatching(/api\/tasks/),
      expect.objectContaining({
        headers: expect.objectContaining({
          "x-api-key": "my-secret-key",
        }),
      }),
    );

    await waitFor(() => {
      expect(screen.getByText("Тестовая задача 1")).toBeInTheDocument();
      expect(screen.getByText("Тестовая задача 2")).toBeInTheDocument();
      expect(screen.getByText("Выполненная задача")).toBeInTheDocument();
    });

    expect(screen.getByText("Задач: 3")).toBeInTheDocument();
  });

  test("Обновляет задачу при редактировании", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        id: 1,
        text: "Обновленная задача",
        active: false,
        completed: true,
      }),
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Тестовая задача 1")).toBeInTheDocument();
    });

    const editButtons = screen.getAllByRole("button", { name: /✏️/i });
    fireEvent.click(editButtons[0]);

    const editInput = screen.getByDisplayValue("Тестовая задача 1");
    fireEvent.change(editInput, { target: { value: "Обновленная задача" } });

    const saveButton = screen.getByText("Сохранить");
    fireEvent.click(saveButton);

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenLastCalledWith(
      expect.stringContaining("/api/tasks/1"),
      expect.objectContaining({
        method: "PUT",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
          "x-api-key": "my-secret-key",
        }),
      }),
    );

    await waitFor(() => {
      expect(screen.getByText("Обновленная задача")).toBeInTheDocument();
    });
  });

  test("Не добавляет пустую задачу", async () => {
    render(<App />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    const button = screen.getByText(/добавить/i);

    fireEvent.click(button);

    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
