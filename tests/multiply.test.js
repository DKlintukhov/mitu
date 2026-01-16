const multiply = (a, b) => a * b;

describe('Функция multiply', () => {
  test('возвращает корректное произведение', () => {
    // .toBe() для точного сравнения результатов умножения
    expect(multiply(2, 3)).toBe(6);
    expect(multiply(5, 5)).toBe(25);
    expect(multiply(-2, 3)).toBe(-6);
    expect(multiply(-4, -5)).toBe(20);
  });

  test('корректно работает с дробными числами', () => {
    expect(multiply(2.5, 2)).toBe(5);

    // .toBeCloseTo() - для сравнения чисел с плавающей точкой
    expect(multiply(0.5, 0.5)).toBeCloseTo(0.25);
    expect(multiply(-1.5, 2)).toBeCloseTo(-3);
  });
});
