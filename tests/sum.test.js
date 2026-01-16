const sum = (a, b) => a + b;

describe('Функция sum', () => {
  test('возвращает корректную сумму двух чисел', () => {
    // .toBe() - строгое сравнение (===) для примитивов
    expect(sum(2, 3)).toBe(5);
    expect(sum(10, 5)).toBe(15);
    expect(sum(0, 0)).toBe(0);
  });

  test('корректно работает с дробными числами', () => {
    // .toBeCloseTo() - для сравнения чисел с плавающей точкой
    expect(sum(0.1, 0.2)).toBeCloseTo(0.3);
    expect(sum(-1.5, 2.5)).toBe(1);
  });
});
