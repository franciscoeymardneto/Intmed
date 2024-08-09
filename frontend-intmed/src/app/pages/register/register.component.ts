import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckbox } from '@angular/material/checkbox';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RegisterService } from '../../core/services/register.service';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckbox
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm!: FormGroup
  isLoading: boolean = false

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private registerService: RegisterService
  ) {
    this.registerForm = this.fb.group({
      first_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordConfirm: ['']
    });
  }

  onCancel() {
    this.router.navigate(['/login'])
  }

  passwordsMatches() {
    if (this.registerForm.value['passwordConfirm'] !== this.registerForm.value['password']) {
      this.registerForm.get('passwordConfirm')!.setErrors({ invalid: true })
      return false
    }
    return true
  }

  private handleRegisterSuccess() {
    this.isLoading = false;

    alert(`Conta criada com sucesso! Faça login para acessar o Medicar!`)

    this.router.navigate(['/login']);
  }

  onRegister() {

    if (this.registerForm.valid && this.passwordsMatches()) {
      const { first_name, email, password, passwordConfirm} = this.registerForm.value;

      this.isLoading = true;
      this.registerService.register({
        first_name,
        email,
        password,
        password2: passwordConfirm
      }).subscribe({
        next: this.handleRegisterSuccess.bind(this),
        error: (error) => {
          this.isLoading = false;
          alert("Erro ao criar conta: " + Object.values(error.error).join())
        }
      });
    } else {
      this.registerForm.markAllAsTouched()
    }
  }
}
