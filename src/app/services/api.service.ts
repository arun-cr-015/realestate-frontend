import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  // User Registration
  registerUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/register`, user);
  }

  // User Login
  loginUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/login`, user);
  }

  // Get Properties with pagination
  getProperties(page: number, size: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/properties?page=${page}&size=${size}`);
  }

  // Add Property
  addProperty(property: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/properties`, property);
  }

  // Get Seller Properties
  getSellerProperties(sellerId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/properties/seller/${sellerId}`);
  }

  // Update Property
  updateProperty(propertyId: string, property: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/properties/${propertyId}`, property);
  }

  // Delete Property
  deleteProperty(propertyId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/properties/${propertyId}`);
  }

  // Like Property
  likeProperty(propertyId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/properties/${propertyId}/like`, {});
  }

  // Show interest in a property
  showInterest(propertyId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/properties/${propertyId}/interest`, {});
  }
}
