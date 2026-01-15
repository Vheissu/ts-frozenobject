const { execSync } = require('child_process');

describe('FrozenObject type constraints', () => {
  it('passes compile-time assertions', () => {
    execSync('npx tsc -p tsconfig.type-tests.json --noEmit', {
      stdio: 'pipe',
    });
  });
});
