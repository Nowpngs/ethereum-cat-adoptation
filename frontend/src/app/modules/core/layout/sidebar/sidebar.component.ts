import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import {
  PUBLIC_FEATURES,
  USER_FEATURES,
} from 'src/app/constants/side-bar.constants';
import { Features } from 'src/app/models/core.models';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Output() redirectUrl = new EventEmitter<void>();
  features: Features[] = [];
  isLogin: boolean = this.coreService.isLogin();

  constructor(private router: Router, private coreService: CoreService) {}

  ngOnInit(): void {
    this.features = this.isLogin ? USER_FEATURES : PUBLIC_FEATURES;
  }

  isSelected(featureUrl: string): boolean {
    if (featureUrl === '') {
      return this.router.url === '/';
    }
    return this.router.url.includes(featureUrl);
  }

  goToLink(featureUrl: string) {
    this.redirectUrl.emit();
    this.router.navigate([featureUrl]);
  }

  logout() {
    this.coreService.logout();
    window.location.reload();
  }
}
