import { Injectable } from '@nestjs/common';
import { ICat } from './interface/cats.interface';

@Injectable()
export class CatsService {
  private readonly cats: ICat[] = [];

  create(cat: ICat): ICat {
    this.cats.push(cat);
    return cat;
  }

  findAll(): ICat[] {
    return this.cats;
  }
}
