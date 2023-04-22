import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { BACKEND_API } from '../constants/api.constants';
import { Cat } from '../models/cat.models';

@Injectable({
  providedIn: 'root',
})
export class CatService {
  constructor(private apiService: ApiService) {}

  getAvailableCats(): Observable<Cat[]> {
    return this.apiService.get<Cat[]>(BACKEND_API.cats);
  }

  getMyCats(): Observable<Cat[]> {
    return this.apiService.get<Cat[]>(BACKEND_API.my_cats);
  }
}
