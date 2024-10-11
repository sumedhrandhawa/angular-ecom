import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SignUp } from '../data-type';

@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css',
})
export class UserAuthComponent {
  signUp(data: SignUp) {
    console.log(data);
  }
}
