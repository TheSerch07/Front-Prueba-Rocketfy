import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { UserModel } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = "http://localhost:3000/user"

  constructor(private http: HttpClient, private router: Router) { }

  signUp(user: UserModel) {
    return this.http.post<any>(this.URL + '/signup', user)
  }

  signIn(user: UserModel) {
    return this.http.post<any>(this.URL + '/signin', user)
  }

  logOut() {
    localStorage.removeItem('token')
    this.router.navigate(['/signin'])
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('token')
  }

  getToken() {
    return localStorage.getItem('token')
  }
}
