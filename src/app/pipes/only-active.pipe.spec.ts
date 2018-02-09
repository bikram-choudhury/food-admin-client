import { OnlyActivePipe } from './only-active.pipe';

describe('OnlyActivePipe', () => {
  it('create an instance', () => {
    const pipe = new OnlyActivePipe();
    expect(pipe).toBeTruthy();
  });
});
