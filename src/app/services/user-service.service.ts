import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any>('http://localhost:3000/users');
  }
  createUser(user: User) {
    return this.http.post(`http://localhost:3000/users`, user);
  }
}
