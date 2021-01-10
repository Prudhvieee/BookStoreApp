import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/userService/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  hide = true;
  registerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      fullName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(12),
          Validators.pattern('[a-zA-Z ]*'),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [Validators.pattern('^[6-9]{1}[0-9]{9}$'), Validators.required],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
          ),
        ],
      ],
    });
  }
  register = (registerFormValue: {
    fullName: any;
    email: any;
    phone: any;
    password: any;
  }) => {
    try {
      let newUser = {
        fullName: registerFormValue.fullName,
        email: registerFormValue.email,
        phone: registerFormValue.phone,
        password: registerFormValue.password,
        // service: 'advance',
      };
      this.userService.registerUser(newUser).subscribe((response) => {
        console.log(' register successfulll', response);
        this.router.navigate(['']);
      });      
    } catch (error) {
      console.log(error);
    }
  };
  login() {
    this.router.navigate(['']);
  }
}
