import { Injectable } from '@nestjs/common';

export type TypeUser = {
  userId: number;
  username: string;
  password: string;
  roles: string[];
};

@Injectable()
export class UsersService {
  private readonly users: TypeUser[] = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
      roles: ['admin', 'user'],
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
      roles: ['user'],
    },
  ];

  async findOne(username: string): Promise<TypeUser | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
