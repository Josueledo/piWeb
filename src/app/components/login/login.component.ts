import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../services/user-service.service';
import { User } from '../../interfaces/user';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  faUser = faUser;
  faLock = faLock;
  allUsers: User[] = [];
  fb = inject(FormBuilder);
  route = inject(Router);

  constructor(private userService: UserService) {}

  userForm = this.fb.group({
    name: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required]),
  });

  ngOnInit() {
    console.log('FUNfou');
    this.userService.getAll().subscribe((data) => {
      console.log(data);
      this.allUsers = data.data;
    });
  }

  onSubmit(): void {
    for (let i = 0; this.allUsers.length > i; i++) {
      if (
        this.allUsers[i].name === this.userForm.value.name &&
        this.allUsers[i].password === this.userForm.value.password
      ) {
        localStorage.setItem('angularToken', '');
        this.route.navigateByUrl('/home');
        this.userForm.reset();
        return;
      }
    }
    this.userForm.reset();
    console.log('err');
  }
}
