import { TypeUser } from '../../users/users.service';

export {};

declare global {
  namespace Express {
    export interface Request {
      user: TypeUser;
    }
  }
}
