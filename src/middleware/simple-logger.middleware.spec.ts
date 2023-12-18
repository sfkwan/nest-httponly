import { SimpleLoggerMiddleware } from './simple-logger.middleware';

describe('SimpleLoggerMiddleware', () => {
  it('should be defined', () => {
    expect(new SimpleLoggerMiddleware()).toBeDefined();
  });
});
