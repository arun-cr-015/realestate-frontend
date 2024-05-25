import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.css']
})
export class PropertyFormComponent implements OnInit {
  propertyForm: FormGroup;
  isEditMode: boolean;
  userId: string;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    public dialogRef: MatDialogRef<PropertyFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!data;
    this.propertyForm = this.fb.group({
      title: [data?.title || '', Validators.required],
      description: [data?.description || '', Validators.required],
      address: [data?.address || '', Validators.required],
      area: [data?.area || '', [Validators.required, Validators.min(0)]],
      bedrooms: [data?.bedrooms || '', [Validators.required, Validators.min(0)]],
      bathrooms: [data?.bathrooms || '', [Validators.required, Validators.min(0)]],
      nearbyHospitals: [data?.nearbyHospitals || '', Validators.required],
      nearbyColleges: [data?.nearbyColleges || '', Validators.required],
      price: [data?.price || '', [Validators.required, Validators.min(0)]],
      photos: [data?.photos || [], Validators.required],
      contactInformation: [data?.contactInformation || '', Validators.required]
    });
  }

  ngOnInit(): void {
    this.userId=JSON.parse(localStorage.getItem('user'))._id
  }

  onSubmit() {
    if (this.propertyForm.valid) {
      if (this.isEditMode) {
        this.apiService.editProperty(this.data._id, this.propertyForm.value).subscribe(
          (response) => {
            this.dialogRef.close(true);
          },
          (error) => {
            console.error('Error editing property:', error);
          }
        );
      } else {
        this.apiService.addProperty(this.propertyForm.value, this.userId).subscribe(
          (response) => {
            this.dialogRef.close(true);
          },
          (error) => {
            console.error('Error adding property:', error);
          }
        );
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
