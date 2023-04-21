import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { BACKEND_API } from '../constants/api.constants';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  constructor(private apiService: ApiService, private router: Router) {}

  login(data: { address: string; secret: string }): Observable<string> {
    return this.apiService.post<string>(BACKEND_API.auth, data);
  }

  setAddress(address: string): void {
    localStorage.setItem('address', address);
  }

  isLogin(): boolean {
    return !!localStorage.getItem('address');
  }

  logout(): void {
    localStorage.removeItem('address');
    this.router.navigate(['']);
  }
}
