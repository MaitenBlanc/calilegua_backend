import { JwtAuthGuard } from './jwt-auth.guard';

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;

  beforeEach(() => {
    const reflectorMock = { get: jest.fn() };
    guard = new JwtAuthGuard(reflectorMock as any)
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
});
