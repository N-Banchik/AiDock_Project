import { Test, TestingModule } from '@nestjs/testing';
import { Photos } from './photos';

describe('Photos', () => {
  let provider: Photos;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Photos],
    }).compile();

    provider = module.get<Photos>(Photos);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
