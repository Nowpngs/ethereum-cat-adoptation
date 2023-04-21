import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  address: string = '';
  secret: string = '';

  constructor(private router: Router, private coreService: CoreService) {}

  ngOnInit(): void {
    if (this.coreService.isLogin()) {
      this.router.navigate(['']);
    }
  }

  login(): void {
    if (!this.address || !this.secret) return;
    this.coreService
      .login({ address: this.address, secret: this.secret })
      .subscribe({
        next: (value) => {
          this.coreService.setAddress(this.address);
          this.router.navigate(['']);
          window.location.reload();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
