import { ValueFromEnumPipe } from './value-from-enum.pipe';

describe('IteratorPipe', () => {
  it('create an instance', () => {
    const pipe = new ValueFromEnumPipe();
    expect(pipe).toBeTruthy();
  });
});
