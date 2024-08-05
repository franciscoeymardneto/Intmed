import { Component, Inject, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckbox} from '@angular/material/checkbox';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule ,
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

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordConfirm: ['']
    });
  }

  onCancel() {
    this.router.navigate(['/login'])
  }

  passwordsMatches(){
    if (this.registerForm.value['passwordConfirm'] !== this.registerForm.value['password']){
      this.registerForm.get('passwordConfirm')!.setErrors({ invalid: true })
      return false
    }
    return true
  }

  onRegister() {


    if (this.registerForm.valid && this.passwordsMatches()) {
      const { username, password} = this.registerForm.value;
       console.log({ username, password});
    } else {
      this.registerForm.markAllAsTouched()
    }
  }
}
