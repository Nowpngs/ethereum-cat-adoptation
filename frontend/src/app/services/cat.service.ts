import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { BACKEND_API } from '../constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class CatService {
  constructor(private apiService: ApiService) {}

  getAvailableCats(): Observable<any> {
    return this.apiService.get<any>(BACKEND_API.cats);
  }
}
