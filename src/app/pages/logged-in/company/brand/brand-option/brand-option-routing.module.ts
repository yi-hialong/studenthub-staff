import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BrandOptionPage } from './brand-option.page';

const routes: Routes = [
  {
    path: '',
    component: BrandOptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BrandOptionPageRoutingModule {}
