import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserRole } from '../../enums/roles.enum';
import { RegisterRequestDTO } from '../../dto/register-request.dto';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class RegisterComponent {
  successMessage = '';
  errorMessage = '';
  UserRole = UserRole;
  showForm = true;

  name = '';
  username = '';
  password = '';
  phoneNumber: string | number = '';
  email = '';
  role: UserRole | null = null;

  constructor(
    private userService: UserService,
    private dialogRef: MatDialogRef<RegisterComponent>
  ) { }

  onSubmit(event: Event) {
    console.log('SUBMIT CLICKED');
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    if (!formData.get('role')) {
      this.errorMessage = 'Please select a role.';
      return;
    }

    const user: RegisterRequestDTO = {
      name: formData.get('name') as string,
      username: formData.get('username') as string,
      password: formData.get('password') as string,
      email: formData.get('email') as string,
      phoneNumber: Number(formData.get('phoneNumber')),
      role: Number(formData.get('role')) as UserRole
    };

    this.userService.register(user).subscribe({
      next: () => {
        console.log('REGISTER SUCCESS');
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.log('REGISTER ERROR', err);
      }
    });
  }

}
