import { UserRole } from './userRole';

export class User {
    
    constructor(user: object, token: string) {
      Object.keys(user).map((key) => {
        this[key] = user[key];
      });
  
      this.token = token;
    }
  
    userID: number;
    email: string;
    firstname: string;
    name: string;
    userRole: UserRole;
    passwordChanged: boolean;
    userSettings: User;
    creationDate?: Date;
    token?: string;
    password?: string;
  }
  