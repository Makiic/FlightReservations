import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginRequestDTO } from '../../dto/login-request.dto';
import { LoginResponseDTO } from '../../dto/login-response.dto';
import { HttpErrorResponse } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    const request: LoginRequestDTO = { username: this.username, password: this.password };

    this.authService.login(request).subscribe({
      next: (res: LoginResponseDTO) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('userRole', res.role);

        switch (res.role) {
          case 'Agent':
            this.router.navigate(['/agent']);
            break;
          case 'Administrator':
            this.router.navigate(['/admin']);
            break;
          case 'Visitor':
            this.router.navigate(['/visitor']);
            break;
          default:
            this.router.navigate(['/login']);
        }
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.error;
      }
    });
  }
}
