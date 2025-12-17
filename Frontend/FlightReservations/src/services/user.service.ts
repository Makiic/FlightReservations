import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterRequestDTO } from '../dto/register-request.dto';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = `https://localhost:7061/api/User`;

  constructor(private http: HttpClient) { }

 register(user: RegisterRequestDTO) {
  return this.http.post(
    'https://localhost:7061/api/User/register',
    user,
    { responseType: 'text' } 
  );
}
}