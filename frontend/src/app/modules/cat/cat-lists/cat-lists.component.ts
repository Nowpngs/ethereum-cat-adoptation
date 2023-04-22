import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-cat-lists',
  templateUrl: './cat-lists.component.html',
  styleUrls: ['./cat-lists.component.scss'],
})
export class CatListsComponent implements OnInit {
  constructor(private router: Router, private coreService: CoreService) {}

  ngOnInit(): void {}

  openCreateOffer(): void {
    if (!this.coreService.isLogin()) {
      this.router.navigate(['login']);
    }
  }
}
