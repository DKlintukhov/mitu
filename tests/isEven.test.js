const isEven = (a) => a % 2 === 0 ? true : false;

describe('Функция isEven', () => {
  test('возвращает true для чётных чисел', () => {
    // .toBe(true) - проверяем, что функция возвращает true
    expect(isEven(2)).toBe(true);
    expect(isEven(-4)).toBe(true);
  });

  test('возвращает false для нечётных чисел', () => {
    // .toBe(false) - проверяем, что функция возвращает false
    expect(isEven(1)).toBe(false);
    expect(isEven(-101)).toBe(false);
  });
});
