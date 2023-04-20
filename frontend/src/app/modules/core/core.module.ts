import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseLayoutComponent } from './layout/base-layout/base-layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FooterComponent } from './layout/footer/footer.component';

@NgModule({
  declarations: [
    BaseLayoutComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
  ],
  imports: [CommonModule],
  exports: [BaseLayoutComponent],
})
export class CoreModule {}
