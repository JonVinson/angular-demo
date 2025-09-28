import { AccountingPipe } from './accounting.pipe';

describe('AccountingPipe', () => {
  it('create an instance', () => {
    const pipe = new AccountingPipe();
    expect(pipe).toBeTruthy();
  });
});
