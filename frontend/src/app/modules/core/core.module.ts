import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseLayoutComponent } from './layout/base-layout/base-layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [BaseLayoutComponent, HeaderComponent, SidebarComponent],
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatSidenavModule],
  exports: [BaseLayoutComponent],
})
export class CoreModule {}
