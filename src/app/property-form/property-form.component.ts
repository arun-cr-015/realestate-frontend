import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html'
})
export class PropertyFormComponent implements OnInit {
  propertyForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    this.propertyForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      address: ['', Validators.required],
      area: ['', [Validators.required, Validators.min(1)]],
      bedrooms: ['', [Validators.required, Validators.min(1)]],
      bathrooms: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(1)]],
      amenities: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.propertyForm.valid) {
      const propertyData = {
        ...this.propertyForm.value,
        location: {
          city: this.propertyForm.value.city,
          state: this.propertyForm.value.state,
          address: this.propertyForm.value.address
        },
        amenities: this.propertyForm.value.amenities.split(',').map((amenity: string) => amenity.trim())
      };

      this.apiService.addProperty(propertyData).subscribe(
        () => {
          alert('Property submitted successfully');
          this.router.navigate(['/properties']);
        },
        (error) => {
          alert(error.error.error);
        }
      );
    }
  }
}

