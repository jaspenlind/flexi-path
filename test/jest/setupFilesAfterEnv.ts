expect.extend({
  toHaveMatchingMembersOf(received, argument) {
    const first = JSON.stringify(received);
    const second = JSON.stringify(argument);

    const pass = first === second;
    if (pass) {
      return {
        pass: true,
        message: () => `expected ${received} to equal ${argument}`
      };
    }
    return {
      pass: false,
      message: () => `expected ${received} to equal ${argument}`
    };
  }
});
