// Pequeno teste usando 
const sum = (a, b) => a + b;

describe('Exemplo de teste', () => {
  it('teste do jest', () => {
    expect(sum(1, 3)).toBe(4);
  })
});
