import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    loginForm: FormGroup;
    isLoading = false;
    errorMessage: string | null = null;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthService
    ) {
        this.loginForm = this.fb.group({
            username: ['', [Validators.required, Validators.minLength(2)]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    onSubmit(): void {
        if (this.loginForm.valid) {
            this.isLoading = true;
            this.errorMessage = null;

            this.authService.login(this.loginForm.value).subscribe({
                next: (token: string) => {
                    this.isLoading = false;
                    this.authService.setToken(token);
                    this.router.navigate(['/products']);
                },
                error: (err: any) => {
                    this.isLoading = false;
                    this.errorMessage = 'Invalid username or password.';
                    console.error('Login error:', err);
                }
            });
        } else {
            this.loginForm.markAllAsTouched();
        }
    }
}
