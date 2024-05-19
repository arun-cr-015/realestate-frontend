import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html'
})
export class PropertyListComponent implements OnInit {
  properties: any[] = [];
  currentPage = 1;
  totalPages = 1;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.loadProperties();
  }

  loadProperties() {
    this.apiService.getProperties(this.currentPage, 10).subscribe(
      (data: any) => {
        this.properties = data.properties;
        this.totalPages = data.totalPages;
      },
      (error) => {
        alert('Error fetching properties');
      }
    );
  }

  showInterest(propertyId: string) {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    this.apiService.showInterest(propertyId).subscribe(
      () => {
        alert('Interest shown and email sent to buyer');
      },
      (error) => {
        alert('Error showing interest');
      }
    );
  }

  likeProperty(propertyId: string) {
    this.apiService.likeProperty(propertyId).subscribe(
      () => {
        this.loadProperties(); // Reload properties to update like count
      },
      (error) => {
        alert('Error liking property');
      }
    );
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadProperties();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadProperties();
    }
  }
}
