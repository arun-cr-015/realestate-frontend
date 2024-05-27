import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://rentify-app-a37f.onrender.com/api';

  constructor(private http: HttpClient) {}

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }

  registerUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/register`, user)
      .pipe(catchError(this.handleError));
  }

  loginUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/login`, user)
      .pipe(catchError(this.handleError));
  }

  getProperties(page: number, size: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/properties?page=${page}&size=${size}`)
      .pipe(catchError(this.handleError));
  }

  addProperty(property: any,userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/properties`,{ ...property, postedBy: userId })
      .pipe(catchError(this.handleError));
  }

  getSellerProperties(sellerId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/properties/seller/${sellerId}`)
      .pipe(catchError(this.handleError));
  }

  editProperty(propertyId: string, property: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/properties/${propertyId}`, property)
      .pipe(catchError(this.handleError));
  }

  deleteProperty(propertyId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/properties/${propertyId}`)
      .pipe(catchError(this.handleError));
  }

  likeProperty(propertyId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/properties/${propertyId}/like`, {})
      .pipe(catchError(this.handleError));
  }

  showInterest(propertyId: string,userId:string): Observable<any> {
    return this.http.post(`${this.apiUrl}/properties/interest/${propertyId}`, userId)
      .pipe(catchError(this.handleError));
  }
}
