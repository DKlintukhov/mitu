const divide = (a, b) => {
   if (b === 0) throw new Error("Деление на ноль невозможно");
   return a / b;
};

describe('Функция divide', () => {
  test('возвращает корректный результат деления', () => {
    // .toBe() для точного сравнения результатов деления
    expect(divide(10, 2)).toBe(5);
    expect(divide(9, 3)).toBe(3);
  });

  test('выбрасывает ошибку при делении на 0', () => {
    // .toThrow() - проверяет, что функция выбрасывает ошибку
    expect(() => divide(10, 0)).toThrow();

    // .toThrow('текст') - проверяет текст ошибки
    expect(() => divide(10, 0)).toThrow('Деление на ноль невозможно');

    // .toThrow(Error) - проверяет тип ошибки
    expect(() => divide(10, 0)).toThrow(Error);
  });

  test('корректно работает с дробными числами', () => {
    // .toBeCloseTo() - для сравнения чисел с плавающей точкой
    expect(divide(1, 4)).toBeCloseTo(0.25);
    expect(divide(-3, 2)).toBeCloseTo(-1.5);
  });
});
