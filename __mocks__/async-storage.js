const values = new Map();

module.exports = {
  getAllKeys: jest.fn(() => Promise.resolve([...values.keys()])),
  getMany: jest.fn(keys =>
    Promise.resolve(Object.fromEntries(keys.map(key => [key, values.get(key) ?? null]))),
  ),
  getItem: jest.fn(key => Promise.resolve(values.get(key) ?? null)),
  removeItem: jest.fn(key => {
    values.delete(key);
    return Promise.resolve();
  }),
  setItem: jest.fn((key, value) => {
    values.set(key, value);
    return Promise.resolve();
  }),
};
