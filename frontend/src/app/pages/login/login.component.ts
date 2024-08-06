import { Component, Inject, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckbox} from '@angular/material/checkbox';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule ,
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckbox,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup
  isLoading: boolean = false

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  private handleLoginSuccess() {
    this.isLoading = false;
    this.router.navigate(['/main']);
  }

  onLogin() {

    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.isLoading = true;
      this.authService.login(username,password).subscribe({
        next: this.handleLoginSuccess.bind(this),
        error: (error) => {
          this.isLoading = false;
          alert("Erro ao fazer login: " + Object.values(error.error).join())
        }
     });


    } else {
      this.loginForm.markAllAsTouched()
    }
  }

  onRegister() {
    this.router.navigate(['/register'])
  }
}
