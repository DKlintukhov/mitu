import { render, screen, fireEvent } from "@testing-library/react";
import Filter from "../Filter.jsx";
import "@testing-library/jest-dom";

describe("Filter Component", () => {
  const mockOnFilterChange = jest.fn();

  beforeEach(() => {
    mockOnFilterChange.mockClear();
  });

  test("рендерит все кнопки фильтров", () => {
    render(<Filter currentFilter="all" onFilterChange={mockOnFilterChange} />);

    expect(screen.getByTestId("filter-all")).toBeInTheDocument();
    expect(screen.getByTestId("filter-active")).toBeInTheDocument();
    expect(screen.getByTestId("filter-completed")).toBeInTheDocument();
  });

  test("показывает активный фильтр", () => {
    render(
      <Filter currentFilter="active" onFilterChange={mockOnFilterChange} />,
    );

    const activeButton = screen.getByTestId("filter-active");
    expect(activeButton).toHaveClass("active");

    const allButton = screen.getByTestId("filter-all");
    expect(allButton).not.toHaveClass("active");
  });

  test("вызывает onFilterChange при клике на кнопку фильтра", () => {
    render(<Filter currentFilter="all" onFilterChange={mockOnFilterChange} />);

    const activeButton = screen.getByTestId("filter-active");
    fireEvent.click(activeButton);

    expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
    expect(mockOnFilterChange).toHaveBeenCalledWith("active");
  });

  test("меняет активную кнопку при изменении пропса currentFilter", () => {
    const { rerender } = render(
      <Filter currentFilter="all" onFilterChange={mockOnFilterChange} />,
    );

    expect(screen.getByTestId("filter-all")).toHaveClass("active");

    rerender(
      <Filter currentFilter="completed" onFilterChange={mockOnFilterChange} />,
    );

    expect(screen.getByTestId("filter-completed")).toHaveClass("active");
    expect(screen.getByTestId("filter-all")).not.toHaveClass("active");
  });

  test("имеет правильные тексты на кнопках", () => {
    render(<Filter currentFilter="all" onFilterChange={mockOnFilterChange} />);

    expect(screen.getByTestId("filter-all")).toHaveTextContent("Все");
    expect(screen.getByTestId("filter-active")).toHaveTextContent("Активные");
    expect(screen.getByTestId("filter-completed")).toHaveTextContent(
      "Завершенные",
    );
  });
});
