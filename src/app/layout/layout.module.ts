import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild([]), MainLayoutComponent],
  exports: [MainLayoutComponent],
  declarations: [],
})
export class LayoutModule {}
