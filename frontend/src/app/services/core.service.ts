import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { BACKEND_API } from '../constants/api.constants';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  constructor(private apiService: ApiService) {}

  login(data: { address: string; secret: string }): Observable<any> {
    return this.apiService.post<any>(BACKEND_API.login, data);
  }
}
