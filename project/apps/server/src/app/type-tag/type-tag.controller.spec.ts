import { Test, TestingModule } from '@nestjs/testing';
import { TypeTagController } from './type-tag.controller';
import { TypeTagService } from './type-tag.service';

describe('TypeTagController', () => {
  let controller: TypeTagController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeTagController],
      providers: [TypeTagService],
    }).compile();

    controller = module.get<TypeTagController>(TypeTagController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
