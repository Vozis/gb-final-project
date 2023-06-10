import { Test, TestingModule } from '@nestjs/testing';
import { TypeTagService } from './type-tag.service';

describe('TypeTagService', () => {
  let service: TypeTagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeTagService],
    }).compile();

    service = module.get<TypeTagService>(TypeTagService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
