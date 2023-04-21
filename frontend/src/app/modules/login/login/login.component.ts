import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  address: string = '';
  secret: string = '';

  constructor(private coreService: CoreService) {}

  ngOnInit(): void {}

  login(): void {
    if (!this.address || !this.secret) return;
    this.coreService
      .login({ address: this.address, secret: this.secret })
      .subscribe({
        next: (value) => {
          console.log(value);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
