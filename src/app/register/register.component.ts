import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      password: ['', [Validators.required,Validators.minLength(3)]],
      role: ['Buyer', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.apiService.registerUser(this.registerForm.value).subscribe(
        () => {
          alert('Registration successful');
          this.router.navigate(['/login']);
        },
        (error) => {
          alert(error.error.error);
        }
      );
    }
  }
}
