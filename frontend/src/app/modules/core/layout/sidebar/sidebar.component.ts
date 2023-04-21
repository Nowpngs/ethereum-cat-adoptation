import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { USER_FEATURES } from 'src/app/constants/side-bar.constants';
import { Features } from 'src/app/models/core.models';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  features: Features[] = USER_FEATURES;

  constructor(private router: Router) {}

  isSelected(featureUrl: string): boolean {
    if (featureUrl === '') {
      return this.router.url === '/';
    }
    return this.router.url.includes(featureUrl);
  }

  goToLink(featureUrl: string) {
    this.router.navigate([featureUrl]);
  }
}
