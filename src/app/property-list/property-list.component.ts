import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { SellerInfoComponent } from '../seller-info/seller-info.component';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls:['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  properties: any[] ;
  
  currentPage = 1;
  totalPages = 1;

  constructor(private apiService: ApiService, private router: Router,public dialog: MatDialog) {}

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
    const userId=JSON.parse(localStorage.getItem('user'))._id
    this.apiService.showInterest(propertyId,userId).subscribe(
      (data) => {
        const dialogRef = this.dialog.open(SellerInfoComponent, {
          width: '400px', 
          data: { seller: data } 
        });
      },
      (error) => {
        alert('Error showing interest');
      }
    );
  }

  likeProperty(propertyId: string) {
    this.apiService.likeProperty(propertyId).subscribe(
      () => {
        this.loadProperties(); 
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
