import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    registerForm: FormGroup;
    isLoading = false;
    errorMessage: string | null = null;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthService
    ) {
        this.registerForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    onSubmit(): void {
        if (this.registerForm.valid) {
            this.isLoading = true;
            this.errorMessage = null;

            const formValue = this.registerForm.value;
            const payload = {
                name: formValue.name,
                email: formValue.email,
                password: formValue.password,
                roles: 'ROLE_USER'
            }; // Backend expects UserInfo object

            this.authService.register(payload).subscribe({
                next: (response: any) => {
                    this.isLoading = false;
                    console.log('Registration success:', response);
                    this.router.navigate(['/login']);
                },
                error: (err: any) => {
                    this.isLoading = false;
                    this.errorMessage = 'Registration failed. Please try again.';
                    console.error('Registration error:', err);
                }
            });
        } else {
            this.registerForm.markAllAsTouched();
        }
    }
}
