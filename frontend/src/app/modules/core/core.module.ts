import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseLayoutComponent } from './layout/base-layout/base-layout.component';

@NgModule({
  declarations: [BaseLayoutComponent],
  imports: [CommonModule],
  exports: [BaseLayoutComponent],
})
export class CoreModule {}
