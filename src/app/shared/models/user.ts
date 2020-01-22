import { UserRole } from './userRole';

export class User {
    
    constructor(user: object, token: string) {
      Object.keys(user).map((key) => {
        this[key] = user[key];
      });
  
      this.token = token;
    }
  
    userID: string;
    email: string;
    firstname: string;
    name: string;
    userRole: UserRole;

    token?: string;
  }
  