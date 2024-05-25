import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { PropertyFormComponent } from '../property-form/property-form.component';
import { MatDialog } from '@angular/material/dialog';
export interface Property {
  _id?: string;
  title: string;
  description: string;
  address: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  nearbyHospitals: string;
  nearbyColleges: string;
  price: number;
  photos: string[];
  contactInformation: string;
  postedBy: string;
  likes: number;
}
@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['title', 'description', 'price', 'actions'];
  properties: any[] = [
    {
      "title": "Luxurious Penthouse",
      "description": "Modern penthouse with panoramic city views.",
      "address": "456 High Street, Metropolis",
      "area": 2000,
      "bedrooms": 3,
      "bathrooms": 2,
      "nearbyHospitals": "Metropolis General Hospital, City Medical Center",
      "nearbyColleges": "Metropolis University, Downtown Community College",
      "price": 800000,
      "photos": ["penthouse1.jpg", "penthouse2.jpg", "penthouse3.jpg"],
      "contactInformation": "Jane Smith - janesmith@example.com, +9876543210",
      "postedBy": "60aeb06e7a059c001db8a24d",
      "likes": 20
    },
    {
      "title": "Cozy Cottage in the Woods",
      "description": "Charming cottage nestled in the forest, perfect for nature lovers.",
      "address": "789 Forest Road, Tranquil Town",
      "area": 1500,
      "bedrooms": 2,
      "bathrooms": 1,
      "nearbyHospitals": "Tranquil Medical Center",
      "nearbyColleges": "Tranquil Community College",
      "price": 300000,
      "photos": ["cottage1.jpg", "cottage2.jpg", "cottage3.jpg"],
      "contactInformation": "Mike Johnson - mikejohnson@example.com, +1234567890",
      "postedBy": "60aeb06e7a059c001db8a24d",
      "likes": 10
    },
    {
      "title": "Seaside Retreat",
      "description": "Relaxing beachfront property with private access to the ocean.",
      "address": "321 Beach Boulevard, Serenity Cove",
      "area": 2500,
      "bedrooms": 4,
      "bathrooms": 3,
      "nearbyHospitals": "Serenity Medical Center",
      "nearbyColleges": "Serenity University",
      "price": 600000,
      "photos": ["seaside1.jpg", "seaside2.jpg", "seaside3.jpg"],
      "contactInformation": "Emily Brown - emilybrown@example.com, +9876543210",
      "postedBy": "60aeb06e7a059c001db8a24d",
      "likes": 15
    },
    {
      "title": "Downtown Loft",
      "description": "Spacious loft in the heart of the city, close to all amenities.",
      "address": "123 Loft Avenue, Downtown",
      "area": 1800,
      "bedrooms": 2,
      "bathrooms": 2,
      "nearbyHospitals": "City Hospital",
      "nearbyColleges": "Downtown College",
      "price": 500000,
      "photos": ["loft1.jpg", "loft2.jpg", "loft3.jpg"],
      "contactInformation": "Alex Wilson - alexwilson@example.com, +1234567890",
      "postedBy": "60aeb06e7a059c001db8a24d",
      "likes": 12
    },
    {
      "title": "Rustic Farmhouse",
      "description": "Quaint farmhouse with acres of land, ideal for a country lifestyle.",
      "address": "456 Farm Road, Rural Village",
      "area": 3500,
      "bedrooms": 5,
      "bathrooms": 3,
      "nearbyHospitals": "Rural Health Clinic",
      "nearbyColleges": "Rural Community College",
      "price": 400000,
      "photos": ["farmhouse1.jpg", "farmhouse2.jpg", "farmhouse3.jpg"],
      "contactInformation": "Sophie Johnson - sophiejohnson@example.com, +9876543210",
      "postedBy": "60aeb06e7a059c001db8a24d",
      "likes": 18
    },
    {
      "title": "Mountain Chalet",
      "description": "Cozy chalet nestled in the mountains, perfect for winter getaways.",
      "address": "789 Mountain Road, Snowy Peaks",
      "area": 2200,
      "bedrooms": 3,
      "bathrooms": 2,
      "nearbyHospitals": "Snowy Peaks Medical Center",
      "nearbyColleges": "Mountain College",
      "price": 550000,
      "photos": ["chalet1.jpg", "chalet2.jpg", "chalet3.jpg"],
      "contactInformation": "Chris Evans - chrisevans@example.com, +1234567890",
      "postedBy": "60aeb06e7a059c001db8a24d",
      "likes": 25
    },
    {
      "title": "Urban Townhouse",
      "description": "Sleek townhouse located in a vibrant urban neighborhood.",
      "address": "123 Urban Street, City Center",
      "area": 1600,
      "bedrooms": 2,
      "bathrooms": 2,
      "nearbyHospitals": "City Medical Center",
      "nearbyColleges": "Urban College",
      "price": 450000,
      "photos": ["townhouse1.jpg", "townhouse2.jpg", "townhouse3.jpg"],
      "contactInformation": "Olivia Smith - oliviasmith@example.com, +9876543210",
      "postedBy": "60aeb06e7a059c001db8a24d",
      "likes": 17
    },
    {
      "title": "Lakefront Cabin",
      "description": "Charming cabin with stunning views of the lake, perfect for weekend retreats.",
      "address": "456 Lakeview Drive, Lakeside Retreat",
      "area": 1800,
      "bedrooms": 2,
      "bathrooms": 1,
      "nearbyHospitals": "Lakeside Medical Center",
      "nearbyColleges": "Lakeside Community College",
      "price": 350000,
      "photos": ["https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "cabin2.jpg", "cabin3.jpg"],
      "contactInformation": "Michael Brown - michaelbrown@example.com, +1234567890",
      "postedBy": "60aeb06e7a059c001db8a24d",
      "likes": 14
    }];
  
  constructor(private apiService: ApiService, private router: Router,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadProperties();
  }

  loadProperties() {
    
    let sellerId=JSON.parse(localStorage.getItem('user'))._id
    this.apiService.getSellerProperties(sellerId).subscribe(
      (properties: any[]) => {
        this.dataSource = new MatTableDataSource(properties);
      },
      (error) => {
        console.error('Error fetching properties:', error);
      }
    );
    
  }

  addProperty() {
    const dialogRef = this.dialog.open(PropertyFormComponent, {
      width: '800px',
      height:'90vh',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProperties()
      }
    });
  }

  editProperty(property: Property) {
    const dialogRef = this.dialog.open(PropertyFormComponent, {
      width: '800px',
      height:'90vh',
      data: property
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProperties()
      }
    });
  }

  deleteProperty(property: Property) {
    this.dataSource.data = this.dataSource.data.filter(item => item !== property);
  }
}
