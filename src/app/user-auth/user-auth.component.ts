import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SignUp } from '../data-type';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css',
})
export class UserAuthComponent {
  constructor(private user: UserService) {}
  ngOnInit(){
    this.user.userAuthReload();
  }
  signUp(data: SignUp) {
    this.user.userSignUp(data);
  }
}
