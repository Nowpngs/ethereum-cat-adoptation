import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getHeaders(): HttpHeaders {
    const address = localStorage.getItem('address') || '';
    const header = new HttpHeaders().set('Address', address);
    header.append('Accept', 'application/json');
    header.append('Content-Type', 'application/json');
    return header;
  }

  post<T = unknown>(url: string, body: unknown): Observable<T> {
    return this.http.post<T>(url, body, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        this.checkRequest(error);
        return throwError(error);
      })
    );
  }

  get<T = unknown>(url: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(url, { headers: this.getHeaders(), params }).pipe(
      catchError((error) => {
        this.checkRequest(error);
        return throwError(error);
      })
    );
  }

  update<T = unknown>(url: string, data: unknown): Observable<T> {
    return this.http.patch<T>(url, data, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        this.checkRequest(error);
        return throwError(error);
      })
    );
  }

  checkRequest(error: HttpErrorResponse): void {
    try {
      this.showError(error).then();
    } catch (e) {
      console.error(e);
    }
  }

  async showError(error: HttpErrorResponse): Promise<void> {
    if (error.status === 500) {
      return;
    }
    if (error.error) {
      if (error.error instanceof Blob) {
        return;
      }

      if (Array.isArray(error.error)) {
        error.error.forEach((eachError) => {});
        return;
      }
      if (Object.keys(error.error)) {
        Object.keys(error.error).forEach((key) => {});
        return;
      }
    }

    if (typeof error === 'string') {
      return;
    }
  }
}
