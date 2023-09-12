import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Login } from '../../model/login.model';
import { BreakpointObserver, Breakpoints, LayoutModule } from '@angular/cdk/layout'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private readonly userService: UserService,
    private responsive: BreakpointObserver,
    private router: Router,
  ) { }

  private fb = inject(FormBuilder);
  loginForm = this.fb.group({
    username: null,
    email: null,
    password: null,
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    address: [null, Validators.required],
    city: [null, Validators.required],
    state: [null, Validators.required],
    postalCode: [null, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    ]
  });

  onInit() {
    this.responsive.observe(Breakpoints.HandsetLandscape)
      .subscribe(result => {
        if (result.matches) {
          console.log("screens matches HandsetLandscape");
        }
      })
  }

  onSubmit(): void {
    const user: Login = new Login(this.loginForm.value);
    
    alert('Thanks!');
    this.router.navigate(['welcome']);
  }
}
